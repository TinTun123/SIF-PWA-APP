<script setup>
import PWABadge from './components/PWABadge.vue'
import { useStrategicStore } from "@/stores/strategicStore";

const strategicStore = useStrategicStore();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    const { type } = event.data || {};
    if (type === "STATEMENTS_UPDATED") {
      console.log("[App] SW signaled updated statements, refreshing...");
      strategicStore.fetchStatementAll();
    }
  });
}
</script>

<template>
  <RouterView></RouterView>
  <PWABadge />
</template>

<style scoped></style>
