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

        <NavBar class="flex mt-8 md:ml-[32px]" title="Posters" />

        <!-- Poster render mobile & tablet -->
        <!-- Outer wrapper controls vertical overflow (visible) -->
        <div class="lg:hidden relative overflow-x-auto mt-16 px-4 md:px-8 py-16 scrollbar-hide">
          <!-- Inner wrapper controls horizontal scroll -->
          <!-- <div class="flex flex-nowrap overflow-y-visible gap-4">
     
            <div class="flex flex-col gap-2 flex-none">
              <div @click="open = true" v-for="n in [1, 10, 9, 8]" :key="n"
                class="w-[40vw] aspect-2/3 rounded-[8px] overflow-hidden border border-white">
                <img :src="`/images/posters/poster0${n}.jpg`" class="w-full h-full rounded-[8px] object-cover" alt="" />
              </div>
            </div>

        
            <div class="flex flex-col gap-2 flex-none relative bottom-[32px]">
              <div v-for="n in [2, 7, 5, 6]" :key="n"
                class="w-[40vw] aspect-2/3 rounded-[8px] overflow-hidden border border-white">
                <img :src="`/images/posters/poster0${n}.jpg`" class="w-full h-full rounded-[8px] object-cover" alt="" />
              </div>
            </div>

       
            <div class="flex flex-col gap-2 flex-none">
              <div v-for="n in [3, 1, 8, 5]" :key="n"
                class="w-[40vw] aspect-2/3 rounded-[8px] overflow-hidden border border-white">
                <img :src="`/images/posters/poster0${n}.jpg`" class="w-full h-full rounded-[8px] object-cover" alt="" />
              </div>
            </div>

      
            <div class="flex flex-col gap-2 flex-none relative bottom-[32px]">
              <div v-for="n in [4, 1, 10, 7]" :key="n"
                class="w-[40vw] aspect-2/3 rounded-[8px] overflow-hidden border border-white">
                <img :src="`/images/posters/poster0${n}.jpg`" class="w-full h-full rounded-[8px] object-cover" alt="" />
              </div>
            </div>

            <div class="w-4 md:w-6 h-12 flex-none">

            </div>
          </div> -->

          <div class="flex flex-nowrap overflow-y-visible gap-4">
            <!-- Loop through each column -->
            <div v-for="(column, colIndex) in columns" :key="colIndex" class="flex flex-col gap-2 flex-none"
              :class="{ 'relative bottom-[32px]': colIndex % 2 !== 0 }">
              <!-- Posters in this column -->
              <div v-for="poster in column" :key="poster.id"
                class="w-[40vw] aspect-2/3 rounded-[8px] overflow-hidden border border-white"
                @click="selectPoster(poster)">
                <img :src="JSON.parse(poster.images)[0]" class="w-full h-full rounded-[8px] object-cover"
                  alt="SIF Posters" />
              </div>
            </div>

            <!-- Spacer -->
            <div class="w-4 md:w-6 h-12 flex-none"></div>
          </div>
        </div>


        <!-- Poster render Desktop -->
        <div v-if="strategicStore.posters.length" class="hidden lg:grid grid-cols-12 gap-4 lg:mx-8 lg:mt-16">
          <div v-for="(poster, index) in strategicStore.posters" :key="index" @click="selectPoster(poster)"
            :class="[index % 2 === 0 ? 'relative bottom-[24px]' : '']"
            class="col-span-2 aspect-2/3 rounded-[8px] overflow-hidden border border-white transition hover:brightness-70 cursor-pointer">
            <img :src="JSON.parse(poster.images)[0]" class="w-full h-full rounded-[8px] object-cover" alt="">
          </div>
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

  <TeleportModal myClass="m-0 p-0 bg-none h-[90%]" :show="open" @close="open = false">
    <ViewPosters :images="selectedPosterImages" :date="selectedPosterDate"></ViewPosters>
  </TeleportModal>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import NavBar from '@/components/navBar.vue'
import TeleportModal from '@/components/TeleportModal.vue'
import { computed, onMounted, ref } from 'vue'
import ViewPosters from '@/pages/ViewPosters.vue'
import { useStrategicStore } from '../stores/strategicStore'

const strategicStore = useStrategicStore();
const selectedPosterImages = ref([]);
const selectedPosterDate = ref("");

function selectPoster(poster) {
  selectedPosterImages.value = JSON.parse(poster.images);
  selectedPosterDate.value = poster.date;

  open.value = true;
}

onMounted(async () => {
  if (!strategicStore.posters.length) {
    await strategicStore.fetchPosterAll();
  }
})

const open = ref(false);

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

const columns = computed(() => chunkArray(strategicStore.posters, 4))
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
