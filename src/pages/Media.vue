<template>
  <!-- <AppbarComponent /> -->
  <div
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll scrollbar-hide">
    <div class="absolute inset-0 bg-block z-0"></div>

    <div class="relative z-10">

      <div class="lg:mx-24">
        <LogoComponent class="hidden md:flex mt-8" />


        <NavBar class="flex mt-8" title="Media Session" />

        <!-- Session tags -->
        <div class="mx-4 lg:mx-0 mt-8 flex justify-start">

          <div class="border border-[#F94B65] overflow-hidden rounded-lg flex gap-0">

            <!-- Interviews -->
            <div @click.stop="render('interviews')" class="px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'interviews' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide">Interviews</span>
            </div>

            <!-- Podcasts -->
            <div @click.stop="render('podcasts')" class="px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'podcasts' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide ">Podcasts</span>
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
          :key="session" class="mx-4 pb-8 md:mx-4">
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
import { computed, ref } from 'vue'
import Interviews from '@/components/interviews.vue'
import Podcasts from '@/components/podcasts.vue'
import { motion } from 'motion-v'
const session = ref('interviews')

const render = (type) => {
  session.value = type
}

// Compute which component to render dynamically
const sessionComponent = computed(() =>
  session.value === 'interviews' ? Interviews : Podcasts
)

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
