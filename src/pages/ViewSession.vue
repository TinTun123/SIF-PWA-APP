<template>

    <motion.div v-if="content" :key="title + content" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }" class="">
        <!-- Session title -->
        <div class="pl-3 border-l-3 border-[#F94B65] md:mt-12 lg:mt-16 my-8 md:mb-8 lg:mb-12">
            <h3 class="text-[20px] text-gray-700 font-semibold">
                {{ title }}
            </h3>
        </div>
        <div v-html="content"></div>

        <slot></slot>
    </motion.div>
    <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h3 class="text-gray-600 text-base md:text-[20px]">Loading ...</h3>
    </div>




</template>

<script setup>
import { motion } from 'motion-v';


const props = defineProps({
    title: String,
    content: String
})



</script>

<style scoped>
p,
span,
h1,
h2,
h3 {
    text-align: justify;
}

p {
    line-height: 32px !important;
}

span {
    line-height: 32px;

}
</style>