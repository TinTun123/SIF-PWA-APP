<template>
    <div class="w-full rounded-t-lg">
        <!-- Video element -->
        <div class="mb-6">
            <div class="lg:mx-auto aspect-video relative">
                <video ref="videoRef" :src="strategicStore.currentPlayingEpi.fileURL" class="w-full rounded-lg"
                    @timeupdate="updateProgress" @loadedmetadata="setDuration"></video>

                <div class="hidden lg:block absolute -bottom-0 w-full">
                    <!-- Progress bar and timestamps -->
                    <div class="mx-4 md:mx-8">
                        <div class="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative" @click="seek">
                            <div class="h-full bg-white transition-all duration-100 ease-linear"
                                :style="{ width: progressPercent + '%' }"></div>
                        </div>
                        <div class="flex justify-between mt-1">
                            <span class="text-white text-[12px]">{{ formatTime(currentTime) }}</span>
                            <span class="text-white text-[12px]">{{ formatTime(duration) }}</span>
                        </div>
                    </div>

                    <!-- Controls -->
                    <div class="flex justify-center items-center gap-8">
                        <!-- Prev -->
                        <button @click="prevEpisode">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.01761 0.500092C1.28747 0.500092 1.54628 0.605448 1.7371 0.792982C1.92792 0.980518 2.03513 1.23487 2.03513 1.50009L2.03513 23.5C2.03513 23.7652 1.92792 24.0196 1.7371 24.2071C1.54628 24.3946 1.28747 24.5 1.01761 24.5C0.747746 24.5 0.488935 24.3946 0.298113 24.2071C0.107292 24.0196 8.96454e-05 23.7652 8.96454e-05 23.5L8.96454e-05 1.50009C-0.00173569 1.36827 0.0233364 1.23743 0.0738258 1.11529C0.124315 0.993158 0.199194 0.882206 0.294046 0.788988C0.388897 0.69577 0.501797 0.622177 0.626072 0.572557C0.750347 0.522938 0.883482 0.498299 1.01761 0.500092ZM5.63036 13.2854C5.61817 12.8207 5.71599 12.3597 5.91612 11.9386C6.11624 11.5174 6.41319 11.1478 6.78355 10.8587L19.143 1.40542C19.5853 1.07609 20.1103 0.872091 20.6625 0.818758H20.9745C21.4443 0.807203 21.9098 0.90786 22.3312 1.11209C22.833 1.35276 23.2561 1.72693 23.5523 2.19208C23.8472 2.65571 24.0024 3.19197 24 3.73875L24 21.272C23.9985 21.7978 23.8532 22.3136 23.5794 22.7653C23.2972 23.2144 22.8994 23.5823 22.4262 23.832C21.9549 24.0824 21.4232 24.2022 20.8879 24.1788C20.3527 24.1553 19.834 23.9893 19.3872 23.6987L7.01419 15.592C6.62075 15.3374 6.29514 14.9947 6.0645 14.592C5.82105 14.1944 5.67261 13.7476 5.63036 13.2854Z"
                                    fill="white" />
                            </svg>
                        </button>

                        <!-- Play / Pause -->
                        <button @click="togglePlay">
                            <!-- Pause -->
                            <svg v-if="isPlaying" width="48" height="50" viewBox="0 0 48 50" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="50" rx="24" fill="url(#grad)" />
                                <path
                                    d="M30.5455 38C29.9607 38 29.4509 37.7841 29.016 37.3522C28.5811 36.9203 28.3636 36.414 28.3636 35.8333V14.1667C28.3636 13.586 28.5811 13.0797 29.016 12.6478C29.4509 12.2159 29.9607 12 30.5455 12H33.8182C34.4029 12 34.9127 12.2159 35.3476 12.6478C35.7825 13.0797 36 13.586 36 14.1667V35.8333C36 36.414 35.7825 36.9203 35.3476 37.3522C34.9127 37.7841 34.4029 38 33.8182 38H30.5455ZM14.1818 38C13.5971 38 13.0873 37.7841 12.6524 37.3522C12.2175 36.9203 12 36.414 12 35.8333V14.1667C12 13.586 12.2175 13.0797 12.6524 12.6478C13.0873 12.2159 13.5971 12 14.1818 12H17.4545C18.0393 12 18.5491 12.2159 18.984 12.6478C19.4189 13.0797 19.6364 13.586 19.6364 14.1667V35.8333C19.6364 36.414 19.4189 36.9203 18.984 37.3522C18.5491 37.7841 18.0393 38 17.4545 38H14.1818Z"
                                    fill="white" />
                                <defs>
                                    <radialGradient id="grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(24 25) rotate(90) scale(25 24)">
                                        <stop stop-opacity="0.1" />
                                        <stop offset="1" stop-color="white" stop-opacity="0.2" />
                                    </radialGradient>
                                </defs>
                            </svg>

                            <!-- Play -->
                            <svg v-else width="48" height="49" viewBox="0 0 48 49" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="49" rx="24" fill="url(#grad2)" />
                                <path
                                    d="M33.991 21.1914C34.5977 21.5106 35.1052 21.9872 35.4591 22.5701C35.813 23.1529 36 23.8201 36 24.5C36 25.18 35.813 25.8471 35.4591 26.43C35.1052 27.0128 34.5977 27.4894 33.991 27.8087L17.8069 36.5172C15.2009 37.9209 12 36.0959 12 33.2098V15.7915C12 12.9041 15.2009 11.0804 17.8069 12.4816L33.991 21.1914Z"
                                    fill="white" />
                                <defs>
                                    <radialGradient id="grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(24 24.5) rotate(90) scale(24.5 24)">
                                        <stop stop-opacity="0.1" />
                                        <stop offset="1" stop-color="white" stop-opacity="0.2" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </button>

                        <!-- Next -->
                        <button @click="nextEpisode">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.9824 24.4999C22.7125 24.4999 22.4537 24.3946 22.2629 24.207C22.0721 24.0195 21.9649 23.7651 21.9649 23.4999V1.5C21.9649 1.23478 22.0721 0.980428 22.2629 0.792892C22.4537 0.605356 22.7125 0.5 22.9824 0.5C23.2523 0.5 23.5111 0.605356 23.7019 0.792892C23.8927 0.980428 23.9999 1.23478 23.9999 1.5V23.4999C24.0017 23.6317 23.9767 23.7626 23.9262 23.8847C23.8757 24.0068 23.8008 24.1178 23.706 24.211C23.6111 24.3042 23.4982 24.3778 23.3739 24.4274C23.2497 24.4771 23.1165 24.5017 22.9824 24.4999ZM18.3696 11.7146C18.3818 12.1793 18.284 12.6403 18.0839 13.0614C17.8838 13.4826 17.5868 13.8522 17.2164 14.1413L4.85699 23.5946C4.4147 23.9239 3.88966 24.1279 3.33749 24.1812H3.02545C2.55573 24.1928 2.09018 24.0921 1.66876 23.8879C1.16698 23.6472 0.743945 23.2731 0.447737 22.8079C0.152795 22.3443 -0.00243703 21.808 2.89292e-05 21.2613V3.72799C0.00149409 3.20216 0.146754 2.68639 0.420603 2.23466C0.702829 1.7856 1.10061 1.41766 1.57379 1.168C2.04513 0.917613 2.57681 0.797761 3.11207 0.821245C3.64732 0.844728 4.16602 1.01067 4.61278 1.30133L16.9858 9.40797C17.3793 9.66263 17.7049 10.0053 17.9355 10.408C18.1789 10.8056 18.3274 11.2524 18.3696 11.7146Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div class="lg:hidden">
            <!-- Progress bar and timestamps -->
            <div class="mx-4 md:mx-8">
                <div class="h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer relative" @click="seek">
                    <div class="h-full bg-white transition-all duration-100 ease-linear"
                        :style="{ width: progressPercent + '%' }"></div>
                </div>
                <div class="flex justify-between mt-1">
                    <span class="text-white text-[12px]">{{ formatTime(currentTime) }}</span>
                    <span class="text-white text-[12px]">{{ formatTime(duration) }}</span>
                </div>
            </div>

            <!-- Controls -->
            <div class="mt-4 flex justify-center items-center gap-4 md:mx-8">
                <!-- Prev -->
                <button @click="prevEpisode">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.01761 0.500092C1.28747 0.500092 1.54628 0.605448 1.7371 0.792982C1.92792 0.980518 2.03513 1.23487 2.03513 1.50009L2.03513 23.5C2.03513 23.7652 1.92792 24.0196 1.7371 24.2071C1.54628 24.3946 1.28747 24.5 1.01761 24.5C0.747746 24.5 0.488935 24.3946 0.298113 24.2071C0.107292 24.0196 8.96454e-05 23.7652 8.96454e-05 23.5L8.96454e-05 1.50009C-0.00173569 1.36827 0.0233364 1.23743 0.0738258 1.11529C0.124315 0.993158 0.199194 0.882206 0.294046 0.788988C0.388897 0.69577 0.501797 0.622177 0.626072 0.572557C0.750347 0.522938 0.883482 0.498299 1.01761 0.500092ZM5.63036 13.2854C5.61817 12.8207 5.71599 12.3597 5.91612 11.9386C6.11624 11.5174 6.41319 11.1478 6.78355 10.8587L19.143 1.40542C19.5853 1.07609 20.1103 0.872091 20.6625 0.818758H20.9745C21.4443 0.807203 21.9098 0.90786 22.3312 1.11209C22.833 1.35276 23.2561 1.72693 23.5523 2.19208C23.8472 2.65571 24.0024 3.19197 24 3.73875L24 21.272C23.9985 21.7978 23.8532 22.3136 23.5794 22.7653C23.2972 23.2144 22.8994 23.5823 22.4262 23.832C21.9549 24.0824 21.4232 24.2022 20.8879 24.1788C20.3527 24.1553 19.834 23.9893 19.3872 23.6987L7.01419 15.592C6.62075 15.3374 6.29514 14.9947 6.0645 14.592C5.82105 14.1944 5.67261 13.7476 5.63036 13.2854Z"
                            fill="white" />
                    </svg>
                </button>

                <!-- Play / Pause -->
                <button @click="togglePlay">
                    <!-- Pause -->
                    <svg v-if="isPlaying" width="48" height="50" viewBox="0 0 48 50" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="50" rx="24" fill="url(#grad)" />
                        <path
                            d="M30.5455 38C29.9607 38 29.4509 37.7841 29.016 37.3522C28.5811 36.9203 28.3636 36.414 28.3636 35.8333V14.1667C28.3636 13.586 28.5811 13.0797 29.016 12.6478C29.4509 12.2159 29.9607 12 30.5455 12H33.8182C34.4029 12 34.9127 12.2159 35.3476 12.6478C35.7825 13.0797 36 13.586 36 14.1667V35.8333C36 36.414 35.7825 36.9203 35.3476 37.3522C34.9127 37.7841 34.4029 38 33.8182 38H30.5455ZM14.1818 38C13.5971 38 13.0873 37.7841 12.6524 37.3522C12.2175 36.9203 12 36.414 12 35.8333V14.1667C12 13.586 12.2175 13.0797 12.6524 12.6478C13.0873 12.2159 13.5971 12 14.1818 12H17.4545C18.0393 12 18.5491 12.2159 18.984 12.6478C19.4189 13.0797 19.6364 13.586 19.6364 14.1667V35.8333C19.6364 36.414 19.4189 36.9203 18.984 37.3522C18.5491 37.7841 18.0393 38 17.4545 38H14.1818Z"
                            fill="white" />
                        <defs>
                            <radialGradient id="grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(24 25) rotate(90) scale(25 24)">
                                <stop stop-opacity="0.1" />
                                <stop offset="1" stop-color="white" stop-opacity="0.2" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <!-- Play -->
                    <svg v-else width="48" height="49" viewBox="0 0 48 49" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="49" rx="24" fill="url(#grad2)" />
                        <path
                            d="M33.991 21.1914C34.5977 21.5106 35.1052 21.9872 35.4591 22.5701C35.813 23.1529 36 23.8201 36 24.5C36 25.18 35.813 25.8471 35.4591 26.43C35.1052 27.0128 34.5977 27.4894 33.991 27.8087L17.8069 36.5172C15.2009 37.9209 12 36.0959 12 33.2098V15.7915C12 12.9041 15.2009 11.0804 17.8069 12.4816L33.991 21.1914Z"
                            fill="white" />
                        <defs>
                            <radialGradient id="grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(24 24.5) rotate(90) scale(24.5 24)">
                                <stop stop-opacity="0.1" />
                                <stop offset="1" stop-color="white" stop-opacity="0.2" />
                            </radialGradient>
                        </defs>
                    </svg>
                </button>

                <!-- Next -->
                <button @click="nextEpisode">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.9824 24.4999C22.7125 24.4999 22.4537 24.3946 22.2629 24.207C22.0721 24.0195 21.9649 23.7651 21.9649 23.4999V1.5C21.9649 1.23478 22.0721 0.980428 22.2629 0.792892C22.4537 0.605356 22.7125 0.5 22.9824 0.5C23.2523 0.5 23.5111 0.605356 23.7019 0.792892C23.8927 0.980428 23.9999 1.23478 23.9999 1.5V23.4999C24.0017 23.6317 23.9767 23.7626 23.9262 23.8847C23.8757 24.0068 23.8008 24.1178 23.706 24.211C23.6111 24.3042 23.4982 24.3778 23.3739 24.4274C23.2497 24.4771 23.1165 24.5017 22.9824 24.4999ZM18.3696 11.7146C18.3818 12.1793 18.284 12.6403 18.0839 13.0614C17.8838 13.4826 17.5868 13.8522 17.2164 14.1413L4.85699 23.5946C4.4147 23.9239 3.88966 24.1279 3.33749 24.1812H3.02545C2.55573 24.1928 2.09018 24.0921 1.66876 23.8879C1.16698 23.6472 0.743945 23.2731 0.447737 22.8079C0.152795 22.3443 -0.00243703 21.808 2.89292e-05 21.2613V3.72799C0.00149409 3.20216 0.146754 2.68639 0.420603 2.23466C0.702829 1.7856 1.10061 1.41766 1.57379 1.168C2.04513 0.917613 2.57681 0.797761 3.11207 0.821245C3.64732 0.844728 4.16602 1.01067 4.61278 1.30133L16.9858 9.40797C17.3793 9.66263 17.7049 10.0053 17.9355 10.408C18.1789 10.8056 18.3274 11.2524 18.3696 11.7146Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </div>


        <div class="flex justify-between mt-4 mx-4 mb-6 md:mx-8">
            <h4 class="text-sm text-white tracking-wider border-b border-white border-dashed pb-2">
                Description
            </h4>

            <div class="flex items-center text-sm text-white gap-1">
                <h3>Episode</h3>
                <div class="w-4 h-4">
                    <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.837 10.5462C10.837 10.1442 10.525 9.81816 10.14 9.81816H8.57996C8.90496 8.15816 10.312 6.91016 12 6.91016C13.688 6.91016 15.095 8.16016 15.419 9.82016H12.93C12.545 9.82016 12.233 10.1452 12.233 10.5462C12.233 10.9482 12.545 11.2742 12.93 11.2742H15.488V12.7282H12.93C12.545 12.7282 12.233 13.0542 12.233 13.4552C12.233 13.8572 12.545 14.1832 12.93 14.1832H15.419C15.141 15.6082 14.065 16.7302 12.698 17.0192V19.2742C12.698 19.6752 12.385 20.0012 12 20.0012C11.615 20.0012 11.302 19.6752 11.302 19.2742V17.0192C9.93496 16.7292 8.85896 15.6082 8.58196 14.1832H10.139C10.525 14.1832 10.837 13.8572 10.837 13.4552C10.837 13.0532 10.525 12.7282 10.14 12.7282H8.51196V11.2742H10.139C10.525 11.2742 10.837 10.9482 10.837 10.5472"
                            fill="#F94B65" />
                        <path
                            d="M12 4C8.67 4 5.946 6.701 5.734 10.116C5.37302 9.92005 4.96873 9.8176 4.558 9.818C3.145 9.818 2 11.012 2 12.485V14.425C2 15.897 3.145 17.091 4.558 17.091C4.606 17.091 4.65367 17.0897 4.701 17.087V17.091C6.035 17.091 7.116 15.964 7.116 14.573V10.545C7.116 7.734 9.303 5.455 12 5.455C14.697 5.455 16.884 7.734 16.884 10.545V14.573C16.884 15.963 17.964 17.091 19.299 17.091V17.087C19.3457 17.0897 19.3933 17.091 19.442 17.091C20.855 17.091 22 15.897 22 14.424V12.484C22 11.012 20.855 9.818 19.442 9.818C19.018 9.818 18.618 9.926 18.266 10.116C18.054 6.701 15.329 4 12 4Z"
                            fill="#F94B65" />
                    </svg>
                </div>
                <h3>{{ strategicStore.currentPlayingEpi.number }}</h3>
            </div>
        </div>

        <div
            class="text-base text-white leading-[28px] mx-4 overflow-y-auto max-h-[300px] lg:h-auto lg:max-h-none hide-scrollbar md:mx-8">
            <p class="pb-[150px]">{{ strategicStore.currentPlayingEpi.description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useStrategicStore } from "../stores/strategicStore";

const strategicStore = useStrategicStore();
const videoRef = ref(null);

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progressPercent = ref(0);

const togglePlay = () => {
    const video = videoRef.value;
    if (!video) return;
    if (isPlaying.value) {
        video.pause();
    } else {
        video.play();
    }
    isPlaying.value = !isPlaying.value;
};

const updateProgress = () => {
    const video = videoRef.value;
    currentTime.value = video.currentTime;
    progressPercent.value = (video.currentTime / video.duration) * 100;
};

const setDuration = () => {
    const video = videoRef.value;
    duration.value = video.duration;
};

const seek = (e) => {
    const bar = e.currentTarget;
    const clickX = e.offsetX;
    const width = bar.offsetWidth;
    const newTime = (clickX / width) * duration.value;
    videoRef.value.currentTime = newTime;
};

const formatTime = (sec) => {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
};

watch(
    () => strategicStore.currentPlayingEpi,
    async (newEpi, oldEpi) => {
        if (!newEpi || !videoRef.value) return;

        // Wait for DOM and video element to update
        await nextTick();

        const video = videoRef.value;

        // Stop and reset everything
        isPlaying.value = false;
        currentTime.value = 0;
        duration.value = 0;
        progressPercent.value = 0;

        // Force reload video source
        video.pause();
        video.currentTime = 0;
        video.load();

        // Autoplay new episode

        // video.play();
        // isPlaying.value = true;
    },
    { deep: true } // because currentPlayingEpi may be an object
);

// optional: placeholder functions
const prevEpisode = () => console.log("prev");
const nextEpisode = () => console.log("next");
</script>

<style scoped>
video {
    background: #000;
}
</style>
