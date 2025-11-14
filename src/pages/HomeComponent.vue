<template>
  <div style="scrollbar-width: none"
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative overflow-y-scroll hide-scrollbar">
    <!-- bg gradient block -->
    <div class="absolute top-0 bottom-0 left-0 right-0 bg-block z-0"></div>

    <!-- body session -->
    <div class="z-100 relative mt-8 md:mt-16 md:mx-6 md:h-full lg:mx-24">

      <!-- Logo session  -->
      <LogoComponent></LogoComponent>

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

          <div class="relative z-10 h-full flex items-center justify-center">
            <p class="text-[24px] text-[#F94B65] md:text-3xl md:leading-normal font-bold tracking-widest text-center">
              <em>
                ဖက်စစ် ရွေးကောက်ပွဲ သပိတ်မှောက် <br />
                ဖဒရယ် လမ်း ကိုရဲရဲ လျှောက်
              </em>
            </p>
          </div>

          <svg class="absolute -bottom-14 -end-4 size-16 text-gray-100 dark:text-neutral-700" width="48" height="35"
            viewBox="0 0 48 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8823 0C13.9706 0 16.6098 1.2039 18.8011 3.6095C19.8424 4.724 20.6683 6.07972 21.2789 7.67663C21.8894 9.27462 22.1953 10.8823 22.1953 12.4986C22.1953 15.911 21.0818 19.3665 18.855 22.8683C16.6281 26.3701 13.6475 29.3421 9.91206 31.7832C6.75162 33.8669 4.27387 34.9081 2.47775 34.9081C1.75951 34.9081 1.16619 34.6928 0.69993 34.261C0.232593 33.8302 0 33.2541 0 32.537C0 31.4591 0.681623 30.561 2.04702 29.8428C5.31407 28.1544 7.70244 26.4842 9.21106 24.8335C10.6464 23.2893 11.3658 22.1587 11.3658 21.4404C11.3658 20.7577 10.8274 20.3442 9.75054 20.201L9.05061 20.0933L8.243 20.0395C5.90739 19.6798 4.01436 18.5933 2.55958 16.7811C1.10481 14.9688 0.377959 12.7667 0.377959 10.1813C0.377959 7.52479 1.27494 5.22577 3.07107 3.28643C5.11916 1.0962 7.72182 0 10.8823 0Z"
              fill="#F94B65" />
            <path
              d="M36.686 0C39.7743 0 42.4136 1.2039 44.6049 3.6095C45.6462 4.724 46.4721 6.07972 47.0837 7.67663C47.6943 9.27462 48.0001 10.8823 48.0001 12.4986C48.0001 15.911 46.8867 19.3665 44.6598 22.8683C42.433 26.3701 39.4523 29.3421 35.7169 31.7832C32.5554 33.8669 30.0787 34.9081 28.2826 34.9081C27.5643 34.9081 26.9721 34.6928 26.5058 34.261C26.0385 33.8302 25.8059 33.2541 25.8059 32.537C25.8059 31.4591 26.4875 30.561 27.8529 29.8428C31.12 28.1544 33.5094 26.4842 35.017 24.8335C36.4534 23.2893 37.1717 22.1587 37.1717 21.4404C37.1717 20.7577 36.6333 20.3442 35.5554 20.201L34.8554 20.0933L34.0478 20.0395C31.7133 19.6798 29.8181 18.5933 28.3655 16.7811C26.9096 14.9677 26.1839 12.7667 26.1839 10.1813C26.1839 7.52479 27.0808 5.22577 28.877 3.28643C30.9229 1.0962 33.5256 0 36.686 0Z"
              fill="#F94B65" />
          </svg>

        </motion.blockquote>
      </div>
      <div class="hidden md:block lg:hidden md:h-[280px] md:w-[120px]"></div>
      <div class="h-12 lg:hidden mt-auto bg-black text-sm text-white flex items-center justify-center z-999 relative">
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
