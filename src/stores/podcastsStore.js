import { defineStore } from "pinia";

export const usePodcastStore = defineStore("podcasts", {
  state: () => ({
    podcasts: [],
    currentPlayingEpi: {},
  }),
  actions: {},
});
