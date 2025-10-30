<template>
  <AppbarComponent />
  <div
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll scrollbar-hide">
    <div class="absolute inset-0 bg-block z-0"></div>

    <div class="relative z-10">

      <div class="lg:mx-[96px]">
        <LogoComponent class="hidden md:flex mt-8" />
        <div
          class="w-[142px] rounded-l-[8px] border border-white flex items-center justify-between gap-2 px-4 py-2 mt-6 ml-auto md:rounded-r-[8px] md:mr-[32px]">
          <span class="text-white">Search</span>
          <img src="/images/search-icon.svg" class="w-8 h-8" alt="" />
        </div>

        <NavBar class="flex mt-8" title="Strategies" />

        <!-- Filter -->
        <div class="flex justify-end pr-4 my-6">
          <div class="flex items-center gap-2 py-2 px-4 border-r-2 border-white">
            <span class="text-white text-[14px] md:text-base">Filter</span>
            <div>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.2673 0.434359C9.93211 -0.0503852 5.55642 -0.0503852 1.22127 0.434359C0.976329 0.461594 0.743237 0.554255 0.546451 0.702616C0.349665 0.850977 0.196439 1.04957 0.102852 1.27756C0.00926425 1.50554 -0.0212341 1.75451 0.0145567 1.99835C0.0503475 2.24218 0.151108 2.47189 0.306265 2.66336L4.07527 7.32236C5.15493 8.65702 5.74405 10.3217 5.74427 12.0384V15.1804C5.74418 15.2981 5.77184 15.4143 5.825 15.5194C5.87816 15.6245 5.95534 15.7156 6.05027 15.7854L8.82127 17.8174C8.90772 17.8808 9.01005 17.919 9.1169 17.9277C9.22375 17.9365 9.33094 17.9154 9.42656 17.867C9.52218 17.8185 9.60249 17.7444 9.65857 17.6531C9.71466 17.5617 9.74432 17.4566 9.74427 17.3494V12.0384C9.74453 10.3212 10.334 8.65615 11.4143 7.32136L15.1823 2.66136C15.3372 2.46988 15.4377 2.24026 15.4733 1.99657C15.509 1.75288 15.4784 1.50409 15.3849 1.27627C15.2913 1.04845 15.1382 0.849994 14.9415 0.701693C14.7449 0.553392 14.512 0.46171 14.2673 0.434359Z"
                  fill="white" />
              </svg>

            </div>
          </div>
        </div>

        <!-- Session tags -->
        <div class="mx-4 flex justify-start">

          <div class="border border-[#F94B65] overflow-hidden rounded-lg flex gap-0">

            <!-- Interviews -->
            <div @click.stop="render('Learnings')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Learnings' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide">Learnings</span>
            </div>

            <!-- Story -->
            <div @click.stop="render('Storys')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Storys' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide ">Story</span>
            </div>

            <!-- Podcasts -->
            <div @click.stop="render('Movements')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Movements' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide ">Movements</span>
            </div>

          </div>
        </div>

        <!-- Session Title -->
        <div class="mx-4 flex justify-start mt-8 mb-4">
          <h1 class="font-bold text-base text-[#F94B65] pb-2 border-b-2 border-[#F94B65] uppercase">{{ session }}
          </h1>
        </div>

        <!-- Fade transition between sessions -->
        <motion.div :transition="{ duration: 0.6, delay: 0.2 }" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
          :key="session" class="mx-4 pb-8 md:mx-6">
          <component :is="sessionComponent"></component>
        </motion.div>

      </div>
    </div>
  </div>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import NavBar from '@/components/navBar.vue'
import { computed, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import Learnings from '@/components/Learnings.vue'
import StrategicMovements from '@/components/StrategicMovements.vue'
import { useStrategicStore } from '@/stores/strategicStore'
import StoryLists from '@/components/StoryLists.vue'

const session = ref('Learnings')

const render = (type) => {
  session.value = type
}

// Compute which component to render dynamically
const sessionComponent = computed(() => {
  switch (session.value) {
    case 'Learnings':
      return Learnings;
    case 'Storys':
      return StoryLists;
    default:
      return StrategicMovements;
  }
}
)

const strategicStore = useStrategicStore();

onMounted(async () => {
  if (strategicStore.courses.length === 0) {
    await strategicStore.fetchCourses();
  }
})


</script>

<style>
/* hide scrollbar (Firefox + Webkit) */
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE & Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
