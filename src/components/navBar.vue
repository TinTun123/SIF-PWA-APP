<template>
  <div class="">
    <div class="flex home_chevron bg-[#F94B65]">
      <div class="pl-4 pr-2 py-2 text-white flex items-center">

        <RouterLink to="/">
          <div class="md:w-8 md:h-8 lg:w-4 lg:h-4 w-4 h-4 cursor-pointer group">
            <svg class="w-full h-full group-hover:fill-gray-400 fill-white" viewBox="0 0 27 30" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M25.4667 7.40058L25.5067 7.43258C26.2227 7.98324 26.6667 8.83658 26.6667 9.77524V24.7832C26.6688 25.3799 26.5531 25.9711 26.3262 26.523C26.0993 27.0748 25.7658 27.5765 25.3446 27.9991C24.9234 28.4218 24.423 28.7572 23.8719 28.986C23.3208 29.2148 22.73 29.3326 22.1334 29.3326H4.53336C3.93669 29.3326 3.34588 29.2148 2.79483 28.986C2.24377 28.7572 1.74331 28.4218 1.32214 27.9991C0.900972 27.5765 0.567383 27.0748 0.340505 26.523C0.113626 25.9711 -0.00207767 25.3799 2.82379e-05 24.7832V9.77524C2.82379e-05 8.83658 0.444028 7.98324 1.16003 7.43258L1.19869 7.40191L11.5854 0.559245C12.0855 0.195773 12.6878 0 13.306 0C13.9243 0 14.5266 0.195773 15.0267 0.559245L25.4667 7.40058ZM10.6667 15.9992V26.6659H8.00003V15.7326C8.00003 14.4099 9.07736 13.3326 10.4 13.3326H16.2667C17.5894 13.3326 18.6667 14.4099 18.6667 15.7326V26.6659H16V15.9992H10.6667Z" />
            </svg>
          </div>
        </RouterLink>

      </div>
      <div class="flex items-center px-2">
        <svg class="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.38909 0.1922C6.18752 0.1922 5.98125 0.271887 5.82656 0.426575C5.51719 0.73595 5.51719 1.2422 5.82656 1.55157L16.4156 12.1406L5.98125 22.575C5.67187 22.8844 5.67187 23.3906 5.98125 23.7C6.29062 24.0094 6.79687 24.0094 7.10625 23.7L18.1078 12.7031C18.4172 12.3938 18.4172 11.8875 18.1078 11.5781L6.95625 0.426575C6.79688 0.2672 6.59534 0.1922 6.38909 0.1922Z"
            fill="white" />
        </svg>
        <!-- <span class="text-white text-[24px] text-bold">-></span> -->
      </div>
      <div class="">
        <div
          class="bg-[#F94B65] pr-8 pl-2 py-2 md:py-4 lg:py-2 text-white md:text-[24px] lg:text-base font-bold tracking-wider">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String
})

</script>

<style>
.right_chevron {
  clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 9% 49%, 0% 0%);
}

.home_chevron {
  clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 0 50%, 0 0);
}
</style>
