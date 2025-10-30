import { db, saveStatements, getAllStatements } from "./dexieDB";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function backgroundDeltaSync(datatype) {
  if (datatype === "statements") {
    const localRecords = await db.statements.toArray();

    const payload = localRecords.map((s) => ({
      id: s.id,
      etag: s.etag, // saved previously in IndexedDB
    }));

    try {
      console.log("Doing bg SYNC : ", localRecords);

      const response = await fetch(`${BASE_URL}/statements/delta-sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Delta sync failed");

      let { added, updated, deleted } = await response.json();

      // 🆕 Add newly added statements
      for (const stmt of added) {
        await db.statements.put(stmt);
        // Do NOT touch images table for added ones
      }

      // ✅ Update changed/new statements
      for (const stmt of updated) {
        // Check if images changed
        const existingImages = await db.images
          .where("statementId")
          .equals(stmt.id)
          .toArray();

        const existingUrls = existingImages.map((img) => img.url);
        const newUrls = JSON.parse(stmt.images) || [];

        // Find images to remove
        const removed = existingUrls.filter((url) => !newUrls.includes(url));
        const added = newUrls.filter((url) => !existingUrls.includes(url));

        // Remove old image blobs
        for (const url of removed) {
          await db.images.where("url").equals(url).delete();
        }

        // Fetch new blobs only if previously saved
        const existingStmt = await db.statements.get(stmt.id);
        if (existingStmt?.savedAt) {
          for (const url of added) {
            try {
              console.log("Saved images updating : ", url);
              const res = await fetch(url, { cache: "no-store" });
              const blob = await res.blob();
              await db.images.put({ statementId: stmt.id, url, blob });
            } catch (e) {
              console.warn("Failed to update image:", url, e);
            }
          }
        }

        // same logic as backend
        await db.statements.put({
          ...stmt, // all backend-provided fields
          savedAt: existingStmt?.savedAt || null, // preserve previous savedAt if exists
        });
      }

      // ❌ Remove deleted statements
      for (const id of deleted) {
        await db.statements.delete(id);
        await db.images.where("statementId").equals(id).delete();
      }

      if (added.length || updated.length || deleted.length) {
        const clientsList = await self.clients.matchAll({ type: "window" });
        for (const client of clientsList) {
          client.postMessage({
            type: "STATEMENTS_UPDATED",
            payload: {
              updatedCount: updated.length,
              deletedCount: deleted.length,
              addedCount: added.length,
            },
          });
        }
      }

      console.log(
        `[SW] Delta sync complete: +${added.length}, +${updated.length}, -${deleted.length}`
      );
    } catch (err) {
      console.warn("[SW] Delta sync error:", err);
    }
  } else if (datatype === "policies") {
    const localRecords = await db.policies.toArray();

    const payload = localRecords.map((s) => ({
      id: s.id,
      etag: s.etag, // saved previously in IndexedDB
    }));

    try {
      console.log("Doing bg SYNC for policies: ", localRecords);

      const response = await fetch(`${BASE_URL}/policies/delta-sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Delta sync failed");

      const { addedPol, updatedPol, deletedPol } = await response.json();

      // 🆕 Add newly added policies
      for (const policy of addedPol) {
        for (let url in policy.logos) {
          const res = await fetch(url, { cache: "no-store" });
          const blob = await res.blob();
          console.log("Storing Policy Logo : ", url);
          await db.policiesLogo.put({ policyId: policy.id, url, blob });
        }

        await db.policies.put({ ...policy, savedAt: Date.now() });
        // Do NOT touch images table for added ones
      }

      // ✅ Update changed/new policies
      for (const policy of updatedPol) {
        // Check if images changed
        const existingImages = await db.policiesLogo
          .where("policyId")
          .equals(policy.id)
          .toArray();

        const existingUrls = existingImages.map((img) => img.url);
        const newUrls = policy.logos || [];

        console.log(newUrls);

        // Find images to remove
        const removed = existingUrls.filter((url) => !newUrls.includes(url));
        const addedPol = newUrls.filter((url) => !existingUrls.includes(url));

        // Remove old image blobs
        for (const url of removed) {
          await db.policiesLogo.where("url").equals(url).delete();
        }

        // Fetch new blobs only if previously saved
        const existingPolicy = await db.policies.get(policy.id);
        if (existingPolicy?.savedAt) {
          for (const url of addedPol) {
            try {
              console.log("Saved Logo updating : ", url);
              const res = await fetch(url, { cache: "no-store" });
              const blob = await res.blob();
              await db.policiesLogo.put({ policyId: policy.id, url, blob });
            } catch (e) {
              console.warn("Failed to update image:", url, e);
            }
          }
        }

        // same logic as backend
        await db.policies.put({
          ...policy, // all backend-provided fields
          savedAt: existingPolicy?.savedAt || null, // preserve previous savedAt if exists
        });
      }

      // ❌ Remove deleted policies
      for (const id of deletedPol) {
        await db.policies.delete(id);
        await db.policiesLogo.where("policyId").equals(id).delete();
      }

      if (addedPol.length || updatedPol.length || deletedPol.length) {
        const clientsList = await self.clients.matchAll({ type: "window" });
        for (const client of clientsList) {
          client.postMessage({
            type: "POLICIES_UPDATED",
            payload: {
              updatedCount: updatedPol.length,
              deletedCount: deletedPol.length,
              addedCount: addedPol.length,
            },
          });
        }
      }

      console.log(
        `[SW] Delta sync policy complete: +${addedPol.length}, +${updatedPol.length}, -${deletedPol.length}`
      );
    } catch (err) {
      console.warn("[SW] Delta sync policy error:", err);
    }
  }
}
