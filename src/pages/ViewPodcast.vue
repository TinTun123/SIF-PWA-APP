<template>
    <AppbarComponent />
    <div v-if="podcast" class="relative">
        <div
            class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll scrollbar-hide">
            <div class="absolute inset-0 bg-block z-0"></div>

            <div class="relative z-10">

                <div class="lg:mx-[96px]">
                    <LogoComponent class="hidden md:flex mt-8" />

                    <div class="lg:grid lg:grid-cols-12 lg:gap-2 lg:mt-8">
                        <div class="mx-4 md:mx-6 mt-8 lg:mx-0 lg:mt-0 lg:col-span-6">
                            <!-- Program Cover image -->
                            <div class="rounded-lg aspect-video overflow-hidden md:w-70 md:mx-auto lg:hidden">
                                <img :src="podcast.cover_url" class="w-full h-full" alt="">
                            </div>

                            <!-- Podcast Program Title -->
                            <div class="mt-4">
                                <h3 class="pl-4 py-3 text-[24px] text-[#F94B65] border-l-2 border-[#F94B65]">
                                    {{ podcast.title }}
                                </h3>
                            </div>

                            <!-- Description -->
                            <div class="relative mt-4">
                                <p ref="paraRef" :class="[
                                    'text-gray-800 transition-all duration-500 overflow-hidden text-sm',
                                    expanded ? 'line-clamp-none' : 'line-clamp-3'
                                ]" class="text-white text-base leading-[32px] text-justify">
                                    {{ podcast.description }}
                                </p>

                                <!-- Read more / less button -->
                                <button v-if="isTruncated" @click="expanded = !expanded"
                                    class="mt-2 text-[#F94B65] font-semibold hover:underline focus:outline-none text-sm">
                                    {{ expanded ? 'Read less' : 'Read more...' }}
                                </button>
                            </div>

                            <!-- Episode sub header -->
                            <div class="flex justify-end mt-4">
                                <h4 class="text-sm text-white tracking-wider border-b border-white border-dashed pb-2">
                                    Episodes
                                </h4>
                            </div>

                            <!-- Episode list -->
                            <div class="mt-6">
                                <div @click.stop="play(pod)" v-for="(pod, index) in podcast.episodes"
                                    class="flex items-center justify-between gap-4 px-2 py-4 border-b-2 border-[#808080]">
                                    <!-- Epi no / circle / Title block -->

                                    <div class="flex items-center gap-4 flex-2">
                                        <h4 class="text-white text-base">{{ pod.number }}</h4>
                                        <div class="w-2 h-2 bg-[#D9D9D9] rounded-full"></div>

                                        <div class="flex flex-col gap-1 flex-2">
                                            <h3 class="text-white font-semibold">{{ pod.title }}</h3>
                                            <div class="flex justify-start gap-4">
                                                <span class="text-white text-sm">{{ pod.duration }}</span>
                                                <div>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M14.8 9C14.9 8.7 15 8.4 15 8C15 5.8 13.2 4 11 4C9.5 4 8.1 4.9 7.5 6.2C7.2 6.1 6.8 6 6.5 6C5.1 6 4 7.1 4 8.5C4 8.7 4 8.9 4.1 9C2.3 9.3 1 10.7 1 12.5C1 14.4 2.6 16 4.5 16H14.5C16.4 16 18 14.4 18 12.5C18 10.7 16.6 9.2 14.8 9ZM8.5 14.9L5.3 11.7L6.7 10.3L8.5 12.1L12.3 8.3L13.7 9.7L8.5 14.9Z"
                                                            fill="#45E673" />
                                                    </svg>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Play icon -->
                                    <div class="flex-none">
                                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.0001 3.16699C13.363 3.16699 10.7851 3.94898 8.59248 5.41406C6.39983 6.87915 4.69086 8.96153 3.68169 11.3979C2.67253 13.8342 2.40848 16.5151 2.92295 19.1015C3.43742 21.6879 4.7073 24.0637 6.572 25.9284C8.4367 27.7931 10.8125 29.063 13.3989 29.5775C15.9853 30.0919 18.6662 29.8279 21.1025 28.8187C23.5389 27.8096 25.6213 26.1006 27.0863 23.9079C28.5514 21.7153 29.3334 19.1374 29.3334 16.5003C29.3334 14.7494 28.9885 13.0156 28.3185 11.3979C27.6484 9.7802 26.6663 8.31035 25.4282 7.07223C24.1901 5.83412 22.7202 4.85199 21.1025 4.18193C19.4849 3.51187 17.751 3.16699 16.0001 3.16699ZM13.3334 22.5003V10.5003L21.3334 16.5003L13.3334 22.5003Z"
                                                fill="white" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden lg:flex lg:justify-center lg:items-center lg:col-span-6 ">

                            <motion.div v-if="strategicStore.currentPlayingEpi.title"
                                :transition="{ duration: 0.6, delay: 0.2 }" :initial="{ opacity: 0 }"
                                :animate="{ opacity: 1 }" :key="strategicStore.currentPlayingEpi.id">
                                <player></player>
                            </motion.div>


                            <h3 v-else class="text-[16px] italic text-white">Select an episode to listen</h3>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <!-- Sticky session -->
        <div v-if="strategicStore.currentPlayingEpi.number && !showPlayer" @click.stop="showPlayer = true"
            class="fixed top-20 right-0 bg-gray-900 rounded-l-full z-50 flex gap-1 px-4 py-2">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.837 10.5462C10.837 10.1442 10.525 9.81816 10.14 9.81816H8.57996C8.90496 8.15816 10.312 6.91016 12 6.91016C13.688 6.91016 15.095 8.16016 15.419 9.82016H12.93C12.545 9.82016 12.233 10.1452 12.233 10.5462C12.233 10.9482 12.545 11.2742 12.93 11.2742H15.488V12.7282H12.93C12.545 12.7282 12.233 13.0542 12.233 13.4552C12.233 13.8572 12.545 14.1832 12.93 14.1832H15.419C15.141 15.6082 14.065 16.7302 12.698 17.0192V19.2742C12.698 19.6752 12.385 20.0012 12 20.0012C11.615 20.0012 11.302 19.6752 11.302 19.2742V17.0192C9.93496 16.7292 8.85896 15.6082 8.58196 14.1832H10.139C10.525 14.1832 10.837 13.8572 10.837 13.4552C10.837 13.0532 10.525 12.7282 10.14 12.7282H8.51196V11.2742H10.139C10.525 11.2742 10.837 10.9482 10.837 10.5472"
                        fill="#F94B65" />
                    <path
                        d="M12 4C8.67 4 5.946 6.701 5.734 10.116C5.37302 9.92005 4.96873 9.8176 4.558 9.818C3.145 9.818 2 11.012 2 12.485V14.425C2 15.897 3.145 17.091 4.558 17.091C4.606 17.091 4.65367 17.0897 4.701 17.087V17.091C6.035 17.091 7.116 15.964 7.116 14.573V10.545C7.116 7.734 9.303 5.455 12 5.455C14.697 5.455 16.884 7.734 16.884 10.545V14.573C16.884 15.963 17.964 17.091 19.299 17.091V17.087C19.3457 17.0897 19.3933 17.091 19.442 17.091C20.855 17.091 22 15.897 22 14.424V12.484C22 11.012 20.855 9.818 19.442 9.818C19.018 9.818 18.618 9.926 18.266 10.116C18.054 6.701 15.329 4 12 4Z"
                        fill="#F94B65" />
                </svg>
            </div>
            <h3 class="text-white font-semibold tracking-wider">Episode {{ strategicStore.currentPlayingEpi.number }}
            </h3>
        </div>
    </div>
    <!-- Loading icon -->
    <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
    </div>

    <div v-if="showPlayer" @click="showPlayer = false" class="fixed inset-0 bg-black/40 z-30 lg:hidden"></div>
    <!-- Player sheet -->
    <div class="overflow-hidden fixed bottom-0 left-0 w-full h-[85vh] player-gradient rounded-t-lg z-999 transition-transform duration-300 lg:hidden"
        :class="showPlayer ? 'translate-y-0' : 'translate-y-full'">
        <player></player>
    </div>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Player from '@/components/player.vue'
import { useStrategicStore } from '../stores/strategicStore'
import { motion } from 'motion-v'

const expanded = ref(false);
const isTruncated = ref(false);
const paraRef = ref(null);
const showPlayer = ref(false);
const strategicStore = useStrategicStore();
const route = useRoute();

const podcast = computed(() => {
    return strategicStore.podcasts.find(pod => {
        return parseInt(route.params.id) === pod.id;
    })
})

function play(epi) {
    console.log(epi);

    showPlayer.value = true;
    strategicStore.currentPlayingEpi = epi;
}

onMounted(async () => {

    if (!strategicStore.podcasts.length) {
        await strategicStore.fetchPodcastsAll();
    }
    // Check if content exceeds 4 lines (approximate)
    const el = paraRef.value
    if (el.scrollHeight > el.clientHeight + 10) {
        isTruncated.value = true
    }
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* show 4 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-none {
    -webkit-line-clamp: unset;
}

.player-gradient {
    background: #333333;
    background: linear-gradient(180deg, rgba(51, 51, 51, 1) 0%, rgba(64, 64, 64, 1) 23%, rgba(0, 0, 0, 1) 100%);
}
</style>
