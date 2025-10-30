<template>
    <div class="mx-4 md:mx-[93px] flex flex-col justify-center gap-4 relative overflow-hidden">
        <div class="lg:flex lg:gap-4 lg:justify-center lg:items-stratch">
            <div v-if="images.length > 1" @click="prevImage"
                class="p-2 group cursor-pointer lg:my-auto hidden lg:block">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L2 10L10 18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div v-if="images"
                class="h-[90%] aspect-[0.74] lg:w-100 mx-auto lg:mx-auto relative flex items-center justify-center">
                <motion.div :key="currentImage" :initial="{ opacity: 0, x: direction > 0 ? 100 : -100 }"
                    :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: direction > 0 ? -100 : 100 }"
                    :transition="{ duration: 0.5 }" class="absolute w-full h-full">
                    <img v-if="!error" @error="onImageError" :src="images[currentImage]"
                        class="w-full h-full rounded-lg object-fit" alt="Poster" />
                    <div v-else class="flex flex-col items-center justify-center h-full gap-12">
                        <div class="w-16 h-16">
                            <svg class="w-full h-full" viewBox="0 0 22 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.75 3.75C2.80039 4.66901 2.04541 5.7697 1.53001 6.98655C1.01462 8.20339 0.749349 9.51151 0.750001 10.833C0.750001 16.31 5.227 20.75 10.75 20.75C13.3642 20.7563 15.8769 19.7386 17.75 17.915"
                                    stroke="#DDDDDD" stroke-width="1.5" />
                                <path
                                    d="M14.25 14.75C13.633 18.282 12.39 20.75 10.75 20.75C8.54 20.75 6.75 16.273 6.75 10.75C6.75 9.519 6.839 8.34 7.002 7.25"
                                    stroke="#DDDDDD" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M0.75 10.75H10.75" stroke="#DDDDDD" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M5.91199 1.14801C5.73581 1.23846 5.60256 1.39491 5.5413 1.58323C5.48004 1.77155 5.49575 1.97645 5.585 2.15323C5.67425 2.33002 5.8298 2.46432 6.0177 2.52685C6.2056 2.58939 6.41061 2.57506 6.58799 2.48701L5.91199 1.14801ZM19.012 14.912C18.9223 15.0897 18.907 15.2957 18.9692 15.4848C19.0315 15.6738 19.1663 15.8304 19.344 15.92C19.5217 16.0097 19.7277 16.025 19.9167 15.9628C20.1058 15.9005 20.2623 15.7657 20.352 15.588L19.012 14.912ZM14.75 10.75H14C14 11.164 14.336 11.5 14.75 11.5V10.75ZM7.05299 3.47601C6.98487 3.66016 6.99168 3.86368 7.07196 4.04286C7.15224 4.22204 7.29959 4.3626 7.48235 4.43434C7.66512 4.50609 7.86873 4.5033 8.04947 4.42658C8.2302 4.34986 8.37364 4.20532 8.44899 4.02401L7.05299 3.47601ZM10.75 1.50001C13.2032 1.50001 15.556 2.47456 17.2907 4.20927C19.0254 5.94399 20 8.29676 20 10.75H21.5C21.5 4.81301 16.687 1.23011e-05 10.75 1.23011e-05V1.50001ZM6.58799 2.48701C7.87851 1.83559 9.30438 1.49745 10.75 1.50001V1.23011e-05C9.06955 -0.00253557 7.41213 0.390749 5.91199 1.14801L6.58799 2.48701ZM20 10.75C20.0025 12.1956 19.6644 13.6215 19.013 14.912L20.352 15.588C21.1092 14.0879 21.5025 12.4305 21.5 10.75H20ZM10.75 1.50001C11.03 1.50001 11.372 1.63901 11.762 2.05101C12.154 2.46501 12.542 3.10501 12.882 3.95701C13.562 5.65801 14 8.06001 14 10.75H15.5C15.5 7.91801 15.042 5.31901 14.275 3.40001C13.892 2.44301 13.417 1.61801 12.852 1.02001C12.285 0.421012 11.575 1.23011e-05 10.75 1.23011e-05V1.50001ZM8.44899 4.02401C8.78399 3.16901 9.20499 2.51401 9.63299 2.08601C10.066 1.65401 10.455 1.50001 10.75 1.50001V1.23011e-05C9.92599 1.23011e-05 9.17799 0.420012 8.57299 1.02501C7.96299 1.63501 7.44299 2.48001 7.05299 3.47601L8.44899 4.02401ZM14.75 11.5H20.75V10H14.75V11.5Z"
                                    fill="#DDDDDD" />
                                <path d="M0.75 0.75L20.75 20.75" stroke="#DDDDDD" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <div class="text-sm text-white font-semibold italic">
                            <h3>No internet or the statement can not be loaded!</h3>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div v-if="images.length > 1" @click="nextImage"
                class="p-2 group cursor-pointer lg:my-auto hidden lg:block">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18L10 10L2 2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>


        <div v-if="images.length > 1" class="flex items-center justify-center gap-6 lg:hidden">
            <button @click="prevImage" class="p-2 group cursor-pointer">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L2 10L10 18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <div class="flex gap-2">
                <div v-for="(img, idx) in images" :key="idx" :class="[
                    'w-3 h-3 rounded-full',
                    idx === currentImage ? 'bg-white' : 'border border-white'
                ]"></div>
            </div>

            <button @click="nextImage" class="p-2 group cursor-pointer">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18L10 10L2 2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'
const props = defineProps({
    images: Array
})
const currentImage = ref(0)
const direction = ref(1)
const error = ref(false);

const fallbackImage = "/offline.svg"; // local fallback asset

function onImageError(e) {
    // e.target.src = fallbackImage;
    error.value = true;
}

function nextImage() {
    direction.value = 1
    currentImage.value = (currentImage.value + 1) % props.images.length

}

function prevImage() {
    direction.value = -1
    currentImage.value =
        (currentImage.value - 1 + props.images.length) % props.images.length
}
</script>
