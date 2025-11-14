<template>
  <!-- <AppbarComponent /> -->
  <div style="scrollbar-width: none"
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll">
    <!-- bg gradient block -->
    <div class="absolute top-0 bottom-0 left-0 right-0 bg-block z-0"></div>
    <div class="relative z-100">
      <div class="lg:mx-24">
        <!-- Logo Block -->
        <LogoComponent class="hidden md:flex mt-8"></LogoComponent>


        <!-- Nav bar -->
        <NavBar class="flex mt-8" title="Policies"></NavBar>



        <div v-if="policiesStore.policies.length > 0"
          class="flex flex-col gap-4 my-8 md:grid md:grid-cols-12 md:gap-4 md:mx-6 lg:mx-0">
          <motion.div v-for="(item, index) in policiesStore.policies" @click="goTo(item.id)" :key="index"
            :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :viewport="{ once: true }"
            :transition="{ duration: 0.6, delay: index * 0.2 }" class="mx-4 md:mx-0 md:col-span-6 lg:col-span-5"
            :class="[index % 2 === 0 ? 'lg:col-start-2' : '']">
            <policiesCard :key="index" :title_eng="item.title_eng" :title_bur="item.title_bur"
              :orgs="item.organizations" :logos="item.logos" :date="item.date" :savedAt="item.savedAt"></policiesCard>

          </motion.div>
        </div>
        <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
          <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import NavBar from '@/components/navBar.vue'
import policiesCard from '@/components/policiesCard.vue'
import { usePoliciesStore } from '@/stores/policiesStore'
import { motion } from 'motion-v'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const policiesStore = usePoliciesStore()
const router = useRouter()

onMounted(async () => {
  if (policiesStore.policies.length === 0) {
    await policiesStore.fetchPolicies();
  }
})

function goTo(policyId) {
  router.push({ name: 'ViewPolicy', params: { id: policyId } })
}

</script>

<style>
.card_shadow {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
}
</style>
