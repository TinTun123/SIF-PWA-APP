import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { axiosClient } from "@/axios";

export const usePoliciesStore = defineStore("policies", {
  state: () => ({
    policies: [],
  }),
  actions: {
    async fetchPolicies() {
      const res = await axiosClient.get("/policies");
      if (res.status === 200) {
        console.log(res);
        this.policies = res.data;
        return this.policies;
      }
    },
  },
});
