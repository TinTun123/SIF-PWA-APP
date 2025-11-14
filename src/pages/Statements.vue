<template>
  <!-- <AppbarComponent /> -->
  <div style="scrollbar-width: none"
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll">
    <!-- bg gradient block -->
    <div class="absolute top-0 bottom-0 left-0 right-0 bg-block z-0"></div>
    <div class="relative z-100">
      <div class="lg:mx-[96px]">
        <!-- Logo Block -->
        <LogoComponent class="hidden md:flex mt-8"></LogoComponent>


        <!-- Nav bar -->
        <NavBar class="flex mt-8" title="Statements"></NavBar>



        <div v-if="strategicStore.statements.length > 0"
          class="flex flex-col gap-4 my-8 md:grid md:grid-cols-12 md:gap-4 md:mx-6 lg:mx-0">
          <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :viewport="{ once: true }"
            :transition="{ duration: 0.6, delay: index * 0.2 }" class="mx-4 md:mx-0 md:col-span-12 lg:col-span-5"
            :class="[index % 2 === 0 ? 'lg:col-start-2' : '']" v-for="(statement, index) in strategicStore.statements">
            <StatementCard @click.stop="ViewImages(JSON.parse(statement.images))" :title="statement.title"
              :cover_url="JSON.parse(statement.images)[0]" :orgs="JSON.parse(statement.tags)" :date="statement.date"
              :images="JSON.parse(statement.images)" :savedAt="statement.savedAt ?? null" :id="statement.id">
            </StatementCard>
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

  <TeleportModal my-class="bg-none" :show="open" @close="open = false">
    <ViewStatements :images="currentStatement"></ViewStatements>
  </TeleportModal>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import NavBar from '@/components/navBar.vue'
import { motion } from 'motion-v'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStrategicStore } from '@/stores/strategicStore'
import StatementCard from '@/components/StatementCard.vue'
import TeleportModal from '@/components/TeleportModal.vue'
import ViewStatements from '@/components/ViewStatements.vue'
import { useOnlineStatus } from '../composible/useOnlineStatus'


const strategicStore = useStrategicStore();
const router = useRouter();
const currentStatement = ref(null);
const open = ref(false);
const { isOnline } = useOnlineStatus();

onMounted(async () => {
  if (!strategicStore.statements.length) {
    await strategicStore.fetchStatementAll();
  }
})

function ViewImages(images) {
  currentStatement.value = images;
  open.value = true;
}




</script>

<style></style>
