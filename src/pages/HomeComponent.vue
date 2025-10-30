<template>
  <div style="scrollbar-width: none"
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative overflow-y-scroll hide-scrollbar">
    <!-- bg gradient block -->
    <div class="absolute top-0 bottom-0 left-0 right-0 bg-block z-0"></div>

    <!-- body session -->
    <div class="z-100 relative mt-8 md:mt-16 md:mx-6 md:h-full lg:mx-[96px]">
      <!-- Logo session  -->
      <LogoComponent></LogoComponent>
      <!-- My library & search block -->
      <div class="flex gap-4 justify-between mx-4 mt-8 md:mt-12 md:mb-16">
        <div
          class="self-center bg-white rounded-lg shadow px-4 py-2 font-bold cursor-pointer hover:shadow-none hover:border hover:border-red-500">
          <h3 class="text-sm md:text-base">My library</h3>
        </div>

        <div
          class="flex items-center gap-2 rounded-full md:rounded-8 border border-white self-center px-4 md:px-8 md:py-2 md:justify-between">
          <h1 class="text-white text-sm md:text-base">Search</h1>
          <img src="/images/search-icon.svg" class="w-8 h-8" alt="" />
        </div>
      </div>

      <div class="lg:grid lg:grid-cols-12 gap-4 pb-8">
        <!-- nav buttons -->
        <div class="grid grid-cols-12 gap-4 md:gap-8 justify-center mt-8 relative mx-4 lg:col-span-6">
          <!-- nav buttoms -->
          <NavButtons></NavButtons>
        </div>

        <!-- block quote  -->
        <motion.blockquote class="relative mx-4 mt-16 my-8 lg:col-span-6" :initial="{ opacity: 0, x: 100 }"
          :whileInView="{ opacity: 1, x: 0 }" :transition="{ duration: 0.8, ease: 'easeOut' }"
          viewport="{ once: true, amount: 0.3 }">
          <svg class="absolute -top-12 -start-4 size-16 text-gray-100 dark:text-neutral-700" width="16" height="16"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
              fill="#F94B65"></path>
          </svg>

          <div class="relative z-10">
            <p class="text-[24px] text-[#F94B65] md:text-3xl md:leading-normal font-bold tracking-widest text-center">
              <em>
                ဖက်စစ် ရွေးကောက်ပွဲ သပိတ်မှောက် <br />
                ဖဒရယ် လမ်း ကိုရဲရဲ လျှောက်
              </em>
            </p>
          </div>
        </motion.blockquote>
      </div>
      <div class="hidden md:block lg:hidden md:h-[280px] md:w-[120px]"></div>
      <div
        class="h-[48px] lg:hidden mt-auto bg-black text-sm text-white flex items-center justify-center z-999 relative">
        <span> All rights reserved Strategic initiative Forum @ 2025</span>
      </div>
    </div>
  </div>
  <InstallGuide></InstallGuide>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import NavButtons from '@/components/navButtons.vue'
import { motion } from 'motion-v'
import InstallGuide from '../components/InstallGuide.vue'

</script>

<style>
.bg-block {
  background: #000000;
  background: linear-gradient(0deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.8) 30%,
      rgba(0, 0, 0, 0.8) 80%,
      rgba(0, 0, 0, 0.6) 100%);
}
</style>
