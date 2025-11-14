/* eslint-disable no-undef */
import {
  db,
  saveStatements,
  getAllStatements,
  getAllPolicies,
  getAllInterviews,
  getAllCourse,
  saveCourse,
  saveSessions,
  saveInterviews,
  savePolicies,
  saveSubsession,
  getAllSessionsByCourseId,
  getSessionById,
  getSubsessionsBySessionId,
  getSubsessionById,
  getAllMusics,
  saveMusics,
} from "./utils/dexieDB";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { axiosClient } from "./axios";
import {
  downloadFile,
  backgroundDeltaSync,
  extractAssetsFromContent,
} from "./utils/SWsync.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Optional: still keep default caching for static files
precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute([{ url: "/offline.svg", revision: null }]);
// Immediately take control once installed
self.addEventListener("install", (event) => {
  console.log("SW installing → skip waiting");
  self.skipWaiting();
});

// Take control of uncontrolled clients immediately
self.addEventListener("activate", (event) => {
  console.log("SW activated → claim clients");
  event.waitUntil(self.clients.claim());
});

const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler, {
  // Ignore API requests or asset requests
  denylist: [/^\/api\//, /^\/storage\//, /\.(?:png|jpg|svg|js|css)$/],
});
registerRoute(navigationRoute);

// ✅ Custom handler for /api/statements
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && url.pathname.includes("/api/statements"),
  async ({ event, request }) => {
    // 1️⃣ Try IndexedDB first
    const cached = await getAllStatements();

    if (cached && cached.length) {
      console.log("[SW] Serving statements from IndexedDB.");

      // 🟢 Trigger background delta sync
      event.waitUntil(backgroundDeltaSync("statements"));

      return new Response(JSON.stringify({ statements: cached }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2️⃣ Fallback: fetch from network
    console.log("[SW] No cached statements → fetching from network.");

    try {
      const response = await fetch(request);

      // Check if 304 (Not Modified)
      if (response.status === 304) {
        console.log("[SW] No changes detected (304).");
        return new Response(JSON.stringify({ statements: cached || [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const cloned = response.clone();
      const data = await cloned.json();
      await saveStatements(data.statements);

      return response;
    } catch (err) {
      console.warn("[SW] Network failed, serving fallback cache.");
      return new Response(JSON.stringify({ statements: cached || [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
);

// ✅ Custom handler for /api/policies
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && url.pathname.includes("/api/policies"),
  async ({ event, request }) => {
    // 1️⃣ Try IndexedDB first
    const cached = await getAllPolicies();

    if (cached && cached.length) {
      console.log("[SW] Serving Policies from IndexedDB.");

      // 🟢 Trigger background delta sync
      event.waitUntil(backgroundDeltaSync("policies"));

      return new Response(JSON.stringify(cached), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2️⃣ Fallback: fetch from network
    console.log("[SW] No cached Policies → fetching from network.");

    try {
      const response = await fetch(request);

      // Check if 304 (Not Modified)
      if (response.status === 304) {
        console.log("[SW] No changes detected (304).");
        return new Response(JSON.stringify(cached || []), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const cloned = response.clone();
      const data = await cloned.json();
      console.log("Data from network : ", data);
      // Add savedAt to each policy object
      const policiesWithSavedAt = data.map((policy) => ({
        ...policy,
        savedAt: Date.now(),
      }));

      console.log(policiesWithSavedAt);

      await savePolicies(policiesWithSavedAt);
      const modifiedResponse = new Response(
        JSON.stringify(policiesWithSavedAt),
        {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        }
      );
      return modifiedResponse;
    } catch (err) {
      console.warn("[SW] Network failed, serving fallback cache.");
      return new Response(JSON.stringify(cached || []), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
);

// ✅ Custom handler for /api/interviews
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && url.pathname.includes("/api/interviews"),
  async ({ event, request }) => {
    // 1️⃣ Try IndexedDB first
    const cached = await getAllInterviews();

    if (cached && cached.length) {
      console.log("[SW] Serving INTERVIEWS from IndexedDB.");

      // 🟢 Trigger background delta sync
      event.waitUntil(backgroundDeltaSync("interviews"));

      return new Response(JSON.stringify({ interviews: cached }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2️⃣ Fallback: fetch from network
    console.log("[SW] No cached interviews → fetching from network.");

    try {
      const response = await fetch(request);

      // Check if 304 (Not Modified)
      // if (response.status === 304) {
      //   console.log("[SW] No changes detected (304).");
      //   return new Response(JSON.stringify({ statements: cached || [] }), {
      //     status: 200,
      //     headers: { "Content-Type": "application/json" },
      //   });
      // }

      const cloned = response.clone();
      const data = await cloned.json();
      await saveInterviews(data.interviews);

      return response;
    } catch (err) {
      console.warn("[SW] Network failed, serving fallback cache.");
      return new Response(JSON.stringify({ interviews: cached || [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
);

// ✅ Custom handler for /api/musics
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && url.pathname.includes("/api/musics"),
  async ({ event, request }) => {
    // 1️⃣ Try IndexedDB first
    const cached = await getAllMusics();

    if (cached && cached.length) {
      console.log("[SW] Serving MUSICS from IndexedDB.");

      // 🟢 Trigger background delta sync
      event.waitUntil(backgroundDeltaSync("musics"));

      return new Response(JSON.stringify({ musics: cached }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2️⃣ Fallback: fetch from network
    console.log("[SW] No cached MUSICS → fetching from network.");

    try {
      const response = await fetch(request);

      // Check if 304 (Not Modified)
      // if (response.status === 304) {
      //   console.log("[SW] No changes detected (304).");
      //   return new Response(JSON.stringify({ statements: cached || [] }), {
      //     status: 200,
      //     headers: { "Content-Type": "application/json" },
      //   });
      // }

      const cloned = response.clone();
      const data = await cloned.json();
      await saveMusics(data.musics);

      return response;
    } catch (err) {
      console.warn("[SW] Network failed, serving fallback cache.");
      return new Response(JSON.stringify({ musics: cached || [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
);

registerRoute(
  ({ url }) => url.pathname.includes("/storage/statement"),
  async ({ event, request }) => {
    console.log("Storage/statement intercept : ", request);

    try {
      // Try network first
      const networkResponse = await fetch(request, { cache: "no-store" });
      console.log("networkResponse : ", networkResponse);

      return networkResponse;
    } catch {
      // Fallback: search IndexedDB
      console.log("Fallback search indexDB : ", request.url);

      const record = await db.images.get({ url: request.url });
      console.log("Record : ", record);

      if (record?.blob) {
        return new Response(record.blob, {
          headers: { "Content-Type": "image/*" },
        });
      }
      return new Response(null, { status: 404 });
    }
  }
);

// Match only the courses list
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && /^\/api\/courses\/?$/.test(url.pathname),
  handleCourses
);

// Match session metadata
registerRoute(
  ({ url, request }) =>
    request.method === "GET" &&
    /^\/api\/courses\/sessions\/[^/]+$/.test(url.pathname),
  handleSessionsData
);

// Match Single Session
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && /^\/api\/sessions\/[^\/]+$/.test(url.pathname),
  handleSessions
);

// Match Sub session Meta data fetch
registerRoute(
  ({ url, request }) =>
    request.method === "GET" &&
    /^\/api\/sessions\/subSession\/[^\/]+$/.test(url.pathname),
  handleSubSessionsData
);

// Match Single Subsession fetch
registerRoute(
  ({ url, request }) =>
    request.method === "GET" &&
    /^\/api\/subsessions\/[^\/]+$/.test(url.pathname),
  handleSubSession
);

// Course
async function handleCourses({ event, request }) {
  // 1️⃣ Try IndexedDB first
  const cached = await getAllCourse();

  if (cached && cached.length) {
    console.log("[SW] Serving Course from IndexedDB.");

    // 🟢 Trigger background delta sync
    event.waitUntil(backgroundDeltaSync("courses"));

    return new Response(JSON.stringify(cached || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log("[SW] No cached course → fetching from network.");

  try {
    const response = await fetch(request);
    const cloned = response.clone();
    const data = await cloned.json();

    await saveCourse(data);

    return response;
  } catch (err) {
    console.warn("[SW] Network failed, serving fallback cache.");
    return new Response(JSON.stringify(cached || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleCourseSessions({ event, request }) {
  // 1️⃣ Try IndexedDB first
  const cached = await getAllSession();

  if (cached && cached.length) {
    console.log("[SW] Serving Sessions from IndexedDB.");
    return new Response(JSON.stringify(cached || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log("[SW] No cached Sessions → fetching from network.");

  try {
    const response = await fetch(request);
    const cloned = response.clone();
    const data = await cloned.json();

    await saveSessions(data);

    return response;
  } catch (err) {
    console.warn("[SW] Network failed, serving fallback cache.");
    return new Response(JSON.stringify(cached || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleSessionsData({ url, event, request }) {
  const courseId = url.pathname.split("/")[4];
  console.log(`[SW] fetching sessions metas for course, ${courseId}`);

  // 1️⃣ Try IndexedDB first
  const cached = await getAllSessionsByCourseId(courseId);
  console.log("[SW] Session Meta : ", cached);

  if (cached && cached.length) {
    console.log("[SW] Serving Sessions Meta from IndexedDB.");

    return new Response(JSON.stringify({ sessions: cached || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log("[SW] No cached course → fetching from network.");

  try {
    const response = await fetch(request);
    return response;
  } catch (err) {
    console.warn("[SW] Network failed for fetching sessions meta.");
    return new Response(JSON.stringify({ sessions: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleSessions({ url, event, request }) {
  const sessionId = url.pathname.split("/")[3];
  console.log(`[SW] fetching session id, ${sessionId}`);

  // 1️⃣ Try IndexedDB first
  const cached = await getSessionById(sessionId);

  if (cached) {
    console.log("[SW] Serving from IndexedDB Session ID : ", sessionId);

    return new Response(JSON.stringify({ session: cached || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log(
    `[SW] No cached for session ID ${sessionId} → fetching from network.`
  );

  try {
    const response = await fetch(request);
    return response;
  } catch (err) {
    console.warn("[SW] Network failed for fetching session ID : ", sessionId);
    return new Response(JSON.stringify({ session: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleSubSessionsData({ url, event, request }) {
  const sessionId = url.pathname.split("/")[4];
  console.log(`[SW] fetching Sub sessions metas for session id, ${sessionId}`);

  // 1️⃣ Try IndexedDB first
  const cached = await getSubsessionsBySessionId(sessionId);

  if (cached && cached.length) {
    console.log(
      "[SW] Serving Sub sec Meta from IndexedDB. Session ID : ",
      sessionId
    );

    return new Response(JSON.stringify({ subsessions: cached || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log(
    `[SW] No cached Subsession for sessionID ${sessionId} → fetching from network.`
  );

  try {
    const response = await fetch(request);
    return response;
  } catch (err) {
    console.warn("[SW] Network failed for fetching sub sessions meta.");
    return new Response(JSON.stringify({ subsessions: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleSubSession({ url, event, request }) {
  const subSessionId = url.pathname.split("/")[3];
  console.log(`[SW] fetching Sub session id, ${subSessionId}`);

  // 1️⃣ Try IndexedDB first
  const cached = await getSubsessionById(subSessionId);

  if (cached) {
    console.log(
      "[SW] Serving Sub sec from IndexedDB. Subsession ID : ",
      subSessionId
    );

    return new Response(JSON.stringify({ subsession: cached || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2️⃣ Fallback: fetch from network
  console.log(
    `[SW] No cached Subsession ID ${subSessionId} → fetching from network.`
  );

  try {
    const response = await fetch(request);
    return response;
  } catch (err) {
    console.warn("[SW] Network failed for fetching sessions meta.");
    return new Response(JSON.stringify({ subsession: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// SW: Handler for serving video from IndexedDB
async function handleVideoRequest({ url, event }) {
  try {
    // Extract filename from URL
    console.log("url href : ", url.href);

    // Look up in Dexie coursesAssets table
    const record = await db.coursesAssets
      .where("fileURL")
      .equals(url.href)
      .first();

    console.log("record : ", record);

    if (!record || !record.blob) {
      console.log("[SW] Video not found in IndexedDB:", url);
      return fetch(event.request); // fallback to network
    }

    // ✅ Serve the blob as response
    return new Response(record.blob, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
      },
    });
  } catch (err) {
    console.error("[SW] Error fetching video from Dexie:", err);
    return fetch(event.request);
  }
}

async function handleMusicVidRequest({ url, event }) {
  try {
    // Extract filename from URL

    const cleanUrl = url.origin + url.pathname;
    console.log("Clean URL : ", cleanUrl);
    // Look up in Dexie coursesAssets table
    const record = await db.musicFile.where("url").equals(cleanUrl).first();

    console.log("record : ", record);

    if (!record || !record.blob) {
      console.log("[SW] Music Video not found in IndexedDB:", url);
      return fetch(event.request); // fallback to network
    }

    // ✅ Serve the blob as response
    return new Response(record.blob, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
      },
    });
  } catch (err) {
    console.error("[SW] Error fetching video from Dexie:", err);
    return fetch(event.request);
  }
}

// ✅ Register route in SW
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && /^\/storage\/videos\/.+$/.test(url.pathname),
  handleVideoRequest
);

// ✅ Register route in SW
registerRoute(
  ({ url, request }) =>
    request.method === "GET" && /^\/storage\/music\/.+$/.test(url.pathname),
  handleMusicVidRequest
);

registerRoute(
  ({ request }) => request.destination === "image",
  async ({ event, request }) => {
    const strategy = new NetworkFirst({
      cacheName: "images-cache",
      networkTimeoutSeconds: 3,
    });

    // Pass both event and request to handle
    return await strategy.handle({ event, request });
  }
);

self.addEventListener("message", async (event) => {
  const msg = event.data;
  if (!msg) return;

  if (msg.type === "SAVE_STATEMENT") {
    const statement = msg.payload;
    const images = statement.images || [];
    const total = images.length;

    let completed = 0;

    for (const url of images) {
      try {
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            Accept: "image/*",
          },
        });

        const blob = await response.blob();

        await db.images.put({
          statementId: statement.id,
          url,
          blob,
        });

        completed++;

        // 📡 Notify progress
        const pct = Math.round((completed / total) * 100);
        event.source?.postMessage({
          type: "SAVE_PROGRESS",
          statementId: statement.id,
          progress: pct,
        });
      } catch (err) {
        console.warn("[SW] Failed to fetch", url, err);
      }
    }

    await db.statements.update(statement.id, { savedAt: Date.now() });

    event.source?.postMessage({
      type: "SAVE_DONE",
      statementId: statement.id,
    });
  } else if (msg.type === "SAVE_INTERVIEW") {
    const interview = msg.payload;
    const url = interview.videoFile;

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "video/*",
        },
      });

      // Get total file size
      const contentLength = Number(response.headers.get("Content-Length")) || 0;

      const reader = response.body.getReader();
      let received = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        received += value.length;

        if (contentLength > 0) {
          const pct = Math.round((received / contentLength) * 100);

          // ✅ Send progress to App
          event.source?.postMessage({
            type: "SAVE_PROGRESS",
            interviewId: interview.id,
            progress: pct,
          });
        }
      }

      // Combine chunks into 1 Blob
      const blob = new Blob(chunks, { type: "video/mp4" });

      // ✅ Save into IndexedDB
      await db.interviewFile.put({
        interviewId: interview.id,
        url,
        blob,
      });

      // ✅ Mark interview saved
      await db.interviews.update(interview.id, { savedAt: Date.now() });

      // ✅ notify done
      event.source?.postMessage({
        type: "SAVE_DONE",
        interviewId: interview.id,
      });
    } catch (error) {
      console.error("[SW] Failed to save interview video:", err);
    }
  } else if (msg.type === "SAVE_COURSE") {
    const course = msg.payload;

    try {
      // 1. Fetch all sessions
      const courseRes = await fetch(`${BASE_URL}/sessions/all/${course.id}`);
      const sessions = (await courseRes.clone().json()).sessions;

      await saveSessions(sessions);

      // 2. Fetch subsessions of all sessions
      let allSubsessions = [];

      for (const s of sessions) {
        const res = await fetch(`${BASE_URL}/subsessions/all/${s.id}`);
        const subs = (await res.clone().json()).subsessions;
        console.log("Sub session : ", subs);

        allSubsessions.push(...subs);
      }

      await saveSubsession(allSubsessions);

      // -----------------------------------------
      // ✅ 3. Collect ALL asset URLs
      // -----------------------------------------
      let allAssets = [];

      for (const s of sessions) {
        try {
          const json = JSON.parse(s.content_bur);
          console.log("Session JSON : ", json);

          const assets = extractAssetsFromContent(json).map((a) => ({
            ...a,
            ownerId: s.id,
            type: "session",
          }));
          allAssets.push(...assets);
        } catch (e) {
          console.error("Failed to parse session content:", e);
        }
      }

      for (const s of allSubsessions) {
        try {
          const json = JSON.parse(s.content_bur);
          console.log("Subession JSON : ", json);
          const assets = extractAssetsFromContent(json).map((a) => ({
            ...a,
            ownerId: s.id,
            type: "subSession",
          }));
          allAssets.push(...assets);
        } catch (e) {
          console.error("Failed to parse session content:", e);
        }
      }

      const totalAssets = allAssets.length;
      console.log("All session assets : ", allAssets);

      let savedAssets = 0;

      // -----------------------------------------
      // ✅ 4. Download foreach asset & push progress update
      // -----------------------------------------
      for (const asset of allAssets) {
        const existing = await db.coursesAssets
          .where("fileURL")
          .equals(asset.url)
          .first();

        if (existing) {
          // Already saved → skip
          console.log("[SW] Asset already exists, skipping:", asset.url);
          savedAssets++;

          event.source?.postMessage({
            type: "SAVE_PROGRESS",
            courseId: course.id,
            progress: Math.round((savedAssets / totalAssets) * 100),
          });

          continue;
        }

        const blob = await downloadFile(asset.url);
        await db.coursesAssets.put({
          ownerId: asset.ownerId,
          fileURL: asset.url,
          type: asset.type,
          course_id: course.id,
          blob,
        });

        savedAssets++;

        event.source?.postMessage({
          type: "SAVE_PROGRESS",
          courseId: course.id,
          progress: Math.round((savedAssets / totalAssets) * 100),
        });
      }

      await db.courses.update(course.id, { savedAt: Date.now() });

      // ✅ Finally done
      event.source?.postMessage({
        type: "SAVE_DONE",
        courseId: course.id,
      });
    } catch (err) {
      console.error("[SW] SAVE_COURSE failed:", err);
    }
  } else if (msg.type === "SAVE_MUSIC") {
    const music = msg.payload;
    const url = music.file_url;

    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "video/*",
        },
      });

      // Get total file size
      const contentLength = Number(response.headers.get("Content-Length")) || 0;

      const reader = response.body.getReader();
      let received = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        received += value.length;

        if (contentLength > 0) {
          const pct = Math.round((received / contentLength) * 100);

          // ✅ Send progress to App
          event.source?.postMessage({
            type: "SAVE_PROGRESS",
            musicId: music.id,
            progress: pct,
          });
        }
      }

      // Combine chunks into 1 Blob
      const blob = new Blob(chunks, { type: "video/mp4" });

      // ✅ Save into IndexedDB
      await db.musicFile.put({
        musicId: music.id,
        url,
        blob,
      });

      // ✅ Mark interview saved
      await db.musics.update(music.id, { savedAt: Date.now() });

      // ✅ notify done
      event.source?.postMessage({
        type: "SAVE_DONE",
        musicId: music.id,
      });
    } catch (error) {
      console.error("[SW] Failed to save MUSIC video:", err);
    }
  }
});
