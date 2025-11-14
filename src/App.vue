<script setup>
import PWABadge from './components/PWABadge.vue'
import { useStrategicStore } from "@/stores/strategicStore";
import { usePoliciesStore } from './stores/policiesStore';

const strategicStore = useStrategicStore();
const policiesStore = usePoliciesStore();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    const { type } = event.data || {};
    if (type === "STATEMENTS_UPDATED") {
      console.log("[App] SW signaled updated statements, refreshing...");
      strategicStore.fetchStatementAll();
    } else if (type === "POLICIES_UPDATED") {
      console.log("[App] SW signaled updated Policies, refreshing...");
      policiesStore.fetchPolicies();
    } else if (type === "INTERVIEWS_UPDATED") {
      console.log("[App] SW signaled updated INTERVIEWS, refreshing...");
      strategicStore.fetchInterviewAll();
    } else if (type === 'COURSE_UPDATED') {
      console.log("[App] SW signaled updated Course / Session / Subsession, refreshing...");
      strategicStore.fetchCourses();
    } else if (type === 'MUSICS_UPDATED') {
      console.log("[App] SW signaled updated Musics, refreshing...");
      strategicStore.fetchMusicAll();
    }
  });
}

</script>

<template>
  <RouterView></RouterView>
  <PWABadge />
</template>

<style scoped></style>
