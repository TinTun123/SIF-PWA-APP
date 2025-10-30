<template>
    <div class="mx-4 md:mx-[93px] h-full flex flex-col gap-4 relative overflow-hidden">
        <div class="lg:flex lg:gap-4 lg:justify-center lg:items-stratch h-full">
            <div @click="prevImage" class="p-2 group cursor-pointer lg:my-auto hidden lg:block">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2L2 10L10 18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="h-[90%] lg:w-100 lg:mx-auto relative flex items-center justify-center">
                <Motion :key="currentImage" :initial="{ opacity: 0, x: direction > 0 ? 100 : -100 }"
                    :animate="{ opacity: 1, x: 0 }" :exit="{ opacity: 0, x: direction > 0 ? -100 : 100 }"
                    :transition="{ duration: 0.5 }" class="absolute w-full h-full">
                    <img :src="images[currentImage]" class="w-full h-full rounded-lg object-cover" alt="Poster" />
                </Motion>
            </div>
            <div @click="nextImage" class="p-2 group cursor-pointer lg:my-auto hidden lg:block">
                <svg width="12" height="20" class="group-hover:stroke-gray-400 stroke-white transition"
                    viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18L10 10L2 2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>


        <div class="flex items-center justify-center gap-6 lg:hidden">
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

        <div class="flex items-center justify-between">
            <!-- date -->
            <div class="text-white text-[14px] md:text-base font-bold">
                <h3>February, 01/2025</h3>
            </div>


            <!-- save button -->
            <div
                class="flex items-center gap-2 border-2 border-white hover:border-gray-400 rounded-full px-2 py-1 cursor-pointer transition group">
                <span
                    class="text-white text-[14px] ms:text-base font-semibold group-hover:text-gray-400 transition">Save</span>
                <div class="w-[14px] h-[14px] md:w-4 md:h-4">
                    <svg class="w-full h-full group-hover:fill-gray-400 fill-white transition" viewBox="0 0 16 16"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.88877 7.24444V0.888889C8.88877 0.653141 8.79512 0.427048 8.62843 0.260349C8.46173 0.0936505 8.23563 0 7.99989 0C7.76414 0 7.53805 0.0936505 7.37135 0.260349C7.20465 0.427048 7.111 0.653141 7.111 0.888889V7.24444L5.13766 4.77689C5.06615 4.68169 4.97624 4.60183 4.87326 4.54205C4.77029 4.48227 4.65636 4.44379 4.53823 4.42889C4.4201 4.41398 4.30018 4.42297 4.18559 4.4553C4.07099 4.48763 3.96407 4.54266 3.87115 4.61711C3.77823 4.69157 3.70122 4.78393 3.64468 4.88872C3.58815 4.9935 3.55324 5.10858 3.54203 5.22712C3.53083 5.34566 3.54355 5.46524 3.57944 5.57877C3.61534 5.69229 3.67368 5.79745 3.751 5.888L7.30655 10.3324C7.38984 10.4363 7.49538 10.52 7.61539 10.5776C7.73539 10.6352 7.86679 10.6651 7.99989 10.6651C8.13298 10.6651 8.26438 10.6352 8.38439 10.5776C8.50439 10.52 8.60993 10.4363 8.69322 10.3324L12.2488 5.888C12.3261 5.79745 12.3844 5.69229 12.4203 5.57877C12.4562 5.46524 12.4689 5.34566 12.4577 5.22712C12.4465 5.10858 12.4116 4.9935 12.3551 4.88872C12.2986 4.78393 12.2215 4.69157 12.1286 4.61711C12.0357 4.54266 11.9288 4.48763 11.8142 4.4553C11.6996 4.42297 11.5797 4.41398 11.4615 4.42889C11.3434 4.44379 11.2295 4.48227 11.1265 4.54205C11.0235 4.60183 10.9336 4.68169 10.8621 4.77689L8.88877 7.24444Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.91733 11.4436L3.87378 8.88892H1.77778C1.30628 8.88892 0.854097 9.07622 0.520699 9.40962C0.187301 9.74301 0 10.1952 0 10.6667V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V10.6667C16 10.1952 15.8127 9.74301 15.4793 9.40962C15.1459 9.07622 14.6937 8.88892 14.2222 8.88892H12.1262L10.0818 11.4436C9.83195 11.7558 9.51509 12.0079 9.15466 12.1811C8.79423 12.3543 8.39945 12.4443 7.99956 12.4443C7.59966 12.4443 7.20489 12.3543 6.84445 12.1811C6.48402 12.0079 6.16716 11.7558 5.91733 11.4436ZM12.4444 11.5556C12.2087 11.5556 11.9826 11.6492 11.8159 11.8159C11.6492 11.9826 11.5556 12.2087 11.5556 12.4445C11.5556 12.6802 11.6492 12.9063 11.8159 13.073C11.9826 13.2397 12.2087 13.3334 12.4444 13.3334H12.4533C12.6891 13.3334 12.9152 13.2397 13.0819 13.073C13.2486 12.9063 13.3422 12.6802 13.3422 12.4445C13.3422 12.2087 13.2486 11.9826 13.0819 11.8159C12.9152 11.6492 12.6891 11.5556 12.4533 11.5556H12.4444Z" />
                    </svg>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'


const props = defineProps({
    images: Array,
    date: String
})

const currentImage = ref(0)
const direction = ref(1)

function nextImage() {
    direction.value = 1
    currentImage.value = (currentImage.value + 1) % props.images.length
}

function prevImage() {
    direction.value = -1
    currentImage.value =
        (currentImage.value - 1 + imgs.value.length) % props.images.length
}
</script>
