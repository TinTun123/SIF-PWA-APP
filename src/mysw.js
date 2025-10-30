/* eslint-disable no-undef */
import {
  db,
  saveStatements,
  getAllStatements,
  getAllPolicies,
  savePolicies,
} from "./utils/dexieDB";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { axiosClient } from "./axios";
import backgroundDeltaSync from "./utils/SWsync.js";

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
  }
});
