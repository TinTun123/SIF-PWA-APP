<template>
  <!-- <AppbarComponent /> -->
  <div
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll scrollbar-hide">
    <div class="absolute inset-0 bg-block z-0"></div>

    <div class="relative z-10">

      <div class="lg:mx-24">
        <LogoComponent class="hidden md:flex mt-8" />


        <NavBar class="flex mt-8" title="Art Movements" />



        <!-- Session tags -->
        <div class="mx-4 lg:mx-0 mt-8 flex justify-start">

          <div class="border border-[#F94B65] overflow-hidden rounded-lg flex gap-0">

            <!-- Interviews -->
            <div @click.stop="render('Poems')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Poems' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide">Poems</span>
            </div>

            <!-- Story -->
            <div @click.stop="render('Comics')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Comics' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide ">Comics</span>
            </div>

            <!-- Podcasts -->
            <div @click.stop="render('Musics')" class="px-4 md:px-8 py-2 rounded-lg transition cursor-pointer"
              :class="session === 'Musics' ? 'bg-[#F94B65]' : 'bg-transparent hover:bg-[#F94B65]/20'">
              <span class="text-white text-base font-semibold tracking-wide ">Musics</span>
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
import { useStrategicStore } from '@/stores/strategicStore'
import PoemsList from '@/components/PoemsList.vue'
import ComicList from '@/components/ComicList.vue'
import MusicLists from '@/components/MusicLists.vue'

const session = ref('Poems')

const render = (type) => {
  session.value = type
}

// Compute which component to render dynamically
const sessionComponent = computed(() => {
  switch (session.value) {
    case 'Poems':
      return PoemsList;
    case 'Comics':
      return ComicList;
    default:
      return MusicLists;
  }
}
)

const strategicStore = useStrategicStore();

onMounted(async () => {

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
