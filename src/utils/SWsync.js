import { db, saveStatements, getAllStatements } from "./dexieDB";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchDeltaSync(datatype, localRecords) {
  const payload = localRecords.map((r) => ({ id: r.id, etag: r.etag }));
  const response = await fetch(`${BASE_URL}/${datatype}/delta-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`Delta sync failed for ${datatype}`);
  return response.json();
}

async function handleAdded(table, addedRecords, blobHandler) {
  for (const record of addedRecords) {
    if (blobHandler) await blobHandler(record);
    await table.put(record);
  }
}

async function handleUpdated(
  table,
  updatedRecords,
  blobHandler,
  blobField = null
) {
  for (const record of updatedRecords) {
    const existing = await table.get(record.id);
    if (blobHandler && existing?.savedAt) {
      await blobHandler(record, existing);
    }
    await table.put({ ...record, savedAt: existing?.savedAt || null });
  }
}

async function handleDeleted(
  table,
  deletedIds,
  blobTable = null,
  blobField = null
) {
  for (const id of deletedIds) {
    await table.delete(id);
    if (blobTable) await blobTable.where(blobField).equals(id).delete();
  }
}

async function notifyClients(type, addedCount, updatedCount, deletedCount) {
  console.log("Notify : ", type);

  console.log(
    `added : ${addedCount}, updated : ${updatedCount}, deleted : ${deletedCount}`
  );

  const clientsList = await self.clients.matchAll({ type: "window" });
  for (const client of clientsList) {
    client.postMessage({
      type,
      payload: { addedCount, updatedCount, deletedCount },
    });
  }
}

async function handleStatementImages(record, existing) {
  const existingImages = await db.images
    .where("statementId")
    .equals(record.id)
    .toArray();
  const existingUrls = existingImages.map((i) => i.url);
  const newUrls = JSON.parse(record.images) || [];

  const removed = existingUrls.filter((url) => !newUrls.includes(url));
  const added = newUrls.filter((url) => !existingUrls.includes(url));

  // Remove old images
  for (const url of removed) await db.images.where("url").equals(url).delete();

  // Fetch new images
  for (const url of added) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const blob = await res.blob();
      await db.images.put({ statementId: record.id, url, blob });
    } catch (e) {
      console.warn("Failed to fetch statement image:", url, e);
    }
  }
}

async function handlePolicyLogos(record, existing) {
  const existingImages = await db.policiesLogo
    .where("policyId")
    .equals(record.id)
    .toArray();
  const existingUrls = existingImages.map((i) => i.url);
  const newUrls = record.logos || [];

  const removed = existingUrls.filter((url) => !newUrls.includes(url));
  const added = newUrls.filter((url) => !existingUrls.includes(url));

  for (const url of removed)
    await db.policiesLogo.where("url").equals(url).delete();

  if (existing?.savedAt) {
    for (const url of added) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        const blob = await res.blob();
        await db.policiesLogo.put({ policyId: record.id, url, blob });
      } catch (e) {
        console.warn("Failed to fetch policy logo:", url, e);
      }
    }
  }
}

async function handleInterviewVideo(record, existing) {
  const oldFile = await db.interviewFile
    .where("interviewId")
    .equals(record.id)
    .first();
  const newVideoUrl = record.videoFile;
  const oldVideoUrl = oldFile?.url;

  if (newVideoUrl !== oldVideoUrl) {
    if (oldFile)
      await db.interviewFile.where("interviewId").equals(record.id).delete();

    try {
      const res = await fetch(newVideoUrl, { cache: "no-store" });
      const blob = await res.blob();
      await db.interviewFile.put({
        interviewId: record.id,
        url: newVideoUrl,
        blob,
      });
    } catch (e) {
      console.warn("Failed to fetch interview video:", newVideoUrl, e);
    }
  }
}

async function handleMusicVideo(record, existing) {
  const oldFile = await db.musicFile.where("musicId").equals(record.id).first();
  const newVideoUrl = record.videoFile;
  const oldVideoUrl = oldFile?.url;

  if (newVideoUrl !== oldVideoUrl) {
    if (oldFile) await db.musics.where("musicId").equals(record.id).delete();

    try {
      const res = await fetch(newVideoUrl, { cache: "no-store" });
      const blob = await res.blob();
      await db.musics.put({
        musicId: record.id,
        url: newVideoUrl,
        blob,
      });
    } catch (e) {
      console.warn("Failed to fetch MUSIC video:", newVideoUrl, e);
    }
  }
}

async function handleCourseAdded(addedCourses) {
  for (const course of addedCourses) {
    await db.courses.put({ ...course, savedAt: Date.now() });

    // ✅ Fetch Sessions
    const sRes = await fetch(`${BASE_URL}/sessions/all/${course.id}`);
    const sessions = (await sRes.json()).sessions;
    await db.sessions.bulkPut(sessions);

    for (const session of sessions) {
      // ✅ Fetch Subsessions
      const subRes = await fetch(`${BASE_URL}/subsessions/all/${session.id}`);
      const subs = (await subRes.json()).subsessions;
      await db.subsessions.bulkPut(subs);

      // ✅ Fetch Assets for each subsession/session/belonging entity
      await fetchAndStoreCourseAssets(course.id);
    }
  }
}

async function handleCourseUpdated(updatedCourses) {
  for (const course of updatedCourses) {
    await db.courses.put(course);

    // ✅ Re-sync children (sessions, subsessions, assets)
    await syncCourseChildren(course.id);
  }
}

async function handleCourseDeleted(deletedCourses) {
  for (const course of deletedCourses) {
    const courseId = course.id;

    await db.courses.delete(courseId);

    // ✅ delete children
    const sessions = await db.sessions
      .where("course_id")
      .equals(courseId)
      .toArray();
    await db.sessions.where("course_id").equals(courseId).delete();

    for (const session of sessions) {
      await db.subsessions.where("session_id").equals(session.id).delete();
    }

    await db.coursesAssets.where("course_id").equals(courseId).delete();
  }
}

async function syncCourseChildren(courseId) {
  const localSessions = await db.sessions
    .where("course_id")
    .equals(courseId)
    .toArray();

  const sessionEtags = localSessions.map((s) => ({ id: s.id, etag: s.etag }));

  const sessionDeltaRes = await fetch(`${BASE_URL}/sessions/delta-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionEtags),
  });

  const { addedSec, updatedSec, deletedSec } = await sessionDeltaRes.json();
  console.log(
    `Added Sec : ${addedSec.length}, Updated Sec : ${updatedSec.length}, deleted Sec : ${deletedSec.length}`
  );
  // [ Handle database manipulating for Sessions here ]
  // end

  await handleSessionAdded(addedSec);
  await handleDeleteSession(deletedSec);
  await handleUpdatedSession(updatedSec);

  // Syncing subsession
  let subsessionsDelta = [];
  for (const s of localSessions) {
    let subsessions = await db.subsessions
      .where("session_id")
      .equals(s.id)
      .toArray();

    subsessionsDelta.push(...subsessions);
  }

  const subsessionEtags = subsessionsDelta.map((s) => ({
    id: s.id,
    etag: s.etag,
  }));

  const subSessionDeltaRes = await fetch(`${BASE_URL}/subsessions/delta-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subsessionEtags),
  });

  const { addedSubSec, updatedSubSec, deletedSubSec } =
    await subSessionDeltaRes.json();

  console.log(
    `Added Sub : ${addedSubSec.length}, Updated Sub : ${updatedSubSec.length}, deleted Sub : ${deletedSubSec.length}`
  );

  // Handle Subsession db manipulation here
  await handleSubSessionAdded(addedSubSec, courseId);
  await handleSubSessionDeleted(deletedSubSec);
  await handleSubSessionUpdated(updatedSubSec, courseId);

  if (
    addedSec.length ||
    updatedSec.length ||
    deletedSec.length ||
    addedSubSec.length ||
    updatedSubSec.length ||
    deletedSubSec.length
  ) {
    await notifyClients(
      "COURSE_UPDATED",
      addedSec.length + addedSubSec.length,
      updatedSec.length + updatedSubSec.length,
      deletedSec.length + deletedSubSec.length
    );
  }
}

async function handleSessionAdded(addedSessions) {
  // ✅ Add Sessions to DB
  await db.sessions.bulkPut(addedSessions);

  let sessionAssets = [];
  for (const session of addedSessions) {
    const json = JSON.parse(session.content_bur);
    const assets = extractAssetsFromContent(json).map((a) => ({
      ...a,
      ownerId: session.id,
      type: "session",
      course_id: session.course_id,
    }));

    sessionAssets.push(...assets);
  }

  for (const asset of sessionAssets) {
    const existing = await db.coursesAssets
      .where("fileURL")
      .equals(asset.url)
      .first();

    if (existing) {
      // Already saved → skip
      console.log("[SW] Asset already exists, skipping:", asset.url);

      continue;
    }

    const blob = await downloadFile(asset.url);
    await db.coursesAssets.put({
      ownerId: asset.ownerId,
      fileURL: asset.url,
      type: asset.type,
      course_id: asset.course_id,
      blob,
    });
  }
}

async function handleDeleteSession(deletedSessions) {
  for (const session of deletedSessions) {
    const sessionId = session.id;

    await db.sessions.delete(sessionId);

    // ✅ delete children subsessions
    const subsessions = await db.subsessions
      .where("session_id")
      .equals(sessionId)
      .toArray();

    await db.subsessions.where("session_id").equals(sessionId).delete();

    await db.coursesAssets
      .where("type")
      .equals("session")
      .and((asset) => asset.ownerId === sessionId)
      .delete();
  }
}

async function handleUpdatedSession(updatedSession) {
  let sessionAssets = [];

  for (const session of updatedSession) {
    await db.sessions.put(session);

    const json = JSON.parse(session.content_bur);
    const assets = extractAssetsFromContent(json).map((a) => ({
      ...a,
      ownerId: session.id,
      type: "session",
      course_id: session.course_id,
    }));

    sessionAssets.push(...assets);
  }

  for (const asset of sessionAssets) {
    const existing = await db.coursesAssets
      .where("fileURL")
      .equals(asset.url)
      .first();

    if (existing) {
      // Already saved → skip
      console.log("[SW] Asset already exists, skipping:", asset.url);

      continue;
    }

    const blob = await downloadFile(asset.url);
    await db.coursesAssets.put({
      ownerId: asset.ownerId,
      fileURL: asset.url,
      type: asset.type,
      course_id: asset.course_id,
      blob,
    });
  }
}

async function handleSubSessionAdded(addedSubSec, courseId) {
  await db.subsessions.bulkPut(addedSubSec);

  let subSessionAssets = [];
  for (const subSession of addedSubSec) {
    const json = JSON.parse(subSession.content_bur);
    const assets = extractAssetsFromContent(json).map((a) => ({
      ...a,
      ownerId: subSession.id,
      type: "subSession",
      course_id: courseId,
    }));

    subSessionAssets.push(...assets);
  }

  for (const asset of subSessionAssets) {
    const existing = await db.coursesAssets
      .where("fileURL")
      .equals(asset.url)
      .first();

    if (existing) {
      // Already saved → skip
      console.log("[SW] Asset already exists, skipping:", asset.url);

      continue;
    }

    const blob = await downloadFile(asset.url);
    await db.coursesAssets.put({
      ownerId: asset.ownerId,
      fileURL: asset.url,
      type: asset.type,
      course_id: asset.course_id,
      blob,
    });
  }
}

async function handleSubSessionDeleted(deletedSubSec) {
  for (const subSession of deletedSubSec) {
    const SubSessionId = subSession.id;

    await db.subsessions.delete(SubSessionId);

    await db.coursesAssets
      .where("type")
      .equals("subSession")
      .and((asset) => asset.ownerId === subSession.id)
      .delete();
  }
}

async function handleSubSessionUpdated(updatedSubSec, courseId) {
  let SubSessionAssets = [];

  for (const subSession of updatedSubSec) {
    await db.subsessions.put(subSession);

    const json = JSON.parse(subSession.content_bur);
    const assets = extractAssetsFromContent(json).map((a) => ({
      ...a,
      ownerId: subSession.id,
      type: "subSession",
      course_id: courseId,
    }));

    SubSessionAssets.push(...assets);
  }

  for (const asset of SubSessionAssets) {
    const existing = await db.coursesAssets
      .where("fileURL")
      .equals(asset.url)
      .first();

    if (existing) {
      // Already saved → skip
      console.log("[SW] Asset already exists, skipping:", asset.url);

      continue;
    }

    const blob = await downloadFile(asset.url);
    await db.coursesAssets.put({
      ownerId: asset.ownerId,
      fileURL: asset.url,
      type: asset.type,
      course_id: asset.course_id,
      blob,
    });
  }
}

export async function backgroundDeltaSync(datatype) {
  let localRecords,
    added = [],
    updated = [],
    deleted = [];

  try {
    if (datatype === "statements") {
      localRecords = await db.statements.toArray();
      ({ added, updated, deleted } = await fetchDeltaSync(
        datatype,
        localRecords
      ));

      await handleAdded(db.statements, added);
      await handleUpdated(db.statements, updated, handleStatementImages);
      await handleDeleted(db.statements, deleted, db.images, "statementId");

      if (added.length || updated.length || deleted.length)
        await notifyClients(
          "STATEMENTS_UPDATED",
          added.length,
          updated.length,
          deleted.length
        );
    } else if (datatype === "policies") {
      localRecords = await db.policies.toArray();
      const { addedPol, updatedPol, deletedPol } = await fetchDeltaSync(
        datatype,
        localRecords
      );

      await handleAdded(db.policies, addedPol, async (p) => {
        for (const url in p.logos) {
          const res = await fetch(url, { cache: "no-store" });
          const blob = await res.blob();
          await db.policiesLogo.put({ policyId: p.id, url, blob });
        }
      });

      await handleUpdated(db.policies, updatedPol, handlePolicyLogos);
      await handleDeleted(db.policies, deletedPol, db.policiesLogo, "policyId");

      if (addedPol.length || updatedPol.length || deletedPol.length)
        await notifyClients(
          "POLICIES_UPDATED",
          addedPol.length,
          updatedPol.length,
          deletedPol.length
        );
    } else if (datatype === "interviews") {
      localRecords = await db.interviews.toArray();
      ({ added, updated, deleted } = await fetchDeltaSync(
        datatype,
        localRecords
      ));

      await handleAdded(db.interviews, added);
      await handleUpdated(db.interviews, updated, handleInterviewVideo);
      await handleDeleted(
        db.interviews,
        deleted,
        db.interviewFile,
        "interviewId"
      );

      if (added.length || updated.length || deleted.length)
        await notifyClients(
          "INTERVIEWS_UPDATED",
          added.length,
          updated.length,
          deleted.length
        );
    } else if (datatype === "courses") {
      const localCourses = await db.courses.toArray();
      const { added, updated, deleted } = await fetchDeltaSync(
        "courses",
        localCourses
      );

      await handleCourseAdded(added);
      await handleCourseUpdated(updated);
      await handleCourseDeleted(deleted);

      if (added.length || updated.length || deleted.length) {
        await notifyClients(
          "COURSES_UPDATED",
          added.length,
          updated.length,
          deleted.length
        );
      }
    } else if (datatype === "musics") {
      localRecords = await db.musics.toArray();
      ({ added, updated, deleted } = await fetchDeltaSync(
        datatype,
        localRecords
      ));

      await handleAdded(db.musics, added);
      await handleUpdated(db.musics, updated, handleMusicVideo);
      await handleDeleted(db.musics, deleted, db.musicFile, "musicId");

      if (added.length || updated.length || deleted.length)
        await notifyClients(
          "MUSICS_UPDATED",
          added.length,
          updated.length,
          deleted.length
        );
    }

    console.log(`[SW] Delta sync complete for ${datatype}`);
  } catch (err) {
    console.warn(`[SW] Delta sync error for ${datatype}:`, err);
  }
}

export async function downloadFile(url) {
  const res = await fetch(url, { cache: "no-store" });
  const reader = res.body.getReader();
  const chunks = [];
  let done, value;

  while (true) {
    ({ done, value } = await reader.read());
    if (done) break;
    chunks.push(value);
  }

  return new Blob(chunks);
}

export function extractAssetsFromContent(contentJson) {
  let assets = [];

  function scan(node) {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(scan);
      return;
    }

    if (node.type === "image" && node.attrs?.src) {
      assets.push({ type: "image", url: node.attrs.src });
    }

    if (node.type === "customVideo" && node.attrs?.src) {
      assets.push({ type: "video", url: node.attrs.src });
    }

    if (node.content) {
      scan(node.content); // recursive call supports both array or single node
    }
  }

  scan(contentJson);
  return assets;
}
