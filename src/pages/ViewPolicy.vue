<template>
  <!-- top nav bar -->
  <div class="mt-8 md:my-12 mx-4 md:mx-[96px] lg:hidden">
    <div class="flex gap-4">
      <div>
        <RouterLink to="/policies">
          <!-- back icon -->
          <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_84_3885)">
              <rect x="1" y="1" width="29" height="29" rx="14.5" fill="white" shape-rendering="crispEdges" />
              <rect x="1.5" y="1.5" width="28" height="28" rx="14" stroke="#CCCCCC" shape-rendering="crispEdges" />
              <path
                d="M15.5 12.4267V9.96241C15.4997 9.7721 15.4409 9.58613 15.331 9.42796C15.2211 9.26978 15.065 9.14646 14.8825 9.07355C14.7 9.00064 14.4991 8.98139 14.3052 9.01824C14.1113 9.05508 13.9331 9.14637 13.793 9.2806L7.5 15.2589L13.793 21.2363C13.8857 21.3261 13.9958 21.3973 14.1171 21.4459C14.2385 21.4945 14.3686 21.5195 14.5 21.5195C14.6314 21.5195 14.7615 21.4945 14.8829 21.4459C15.0042 21.3973 15.1143 21.3261 15.207 21.2363C15.3945 21.0558 15.4999 20.8109 15.5 20.5555V18.1586C18.25 18.224 21.255 18.7036 23.5 22V21.037C23.5 16.5754 20 12.9063 15.5 12.4267Z"
                fill="#343434" />
            </g>
            <defs>
              <filter id="filter0_d_84_3885" x="0" y="0" width="33" height="33" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_84_3885" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_84_3885" result="shape" />
              </filter>
            </defs>
          </svg>
        </RouterLink>

      </div>

      <div class="flex gap-[8px] items-center">
        <!-- nav bar home + policies -->
        <div class="w-4 h-4">
          <!-- home icon -->
          <svg class="w-full h-full" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M25.4667 7.40058L25.5067 7.43258C26.2227 7.98324 26.6667 8.83658 26.6667 9.77524V24.7832C26.6688 25.3799 26.5531 25.9711 26.3262 26.523C26.0993 27.0748 25.7658 27.5765 25.3446 27.9991C24.9234 28.4218 24.423 28.7572 23.8719 28.986C23.3208 29.2148 22.73 29.3326 22.1334 29.3326H4.53336C3.93669 29.3326 3.34588 29.2148 2.79483 28.986C2.24377 28.7572 1.74331 28.4218 1.32214 27.9991C0.900972 27.5765 0.567383 27.0748 0.340505 26.523C0.113626 25.9711 -0.00207767 25.3799 2.82379e-05 24.7832V9.77524C2.82379e-05 8.83658 0.444028 7.98324 1.16003 7.43258L1.19869 7.40191L11.5854 0.559245C12.0855 0.195773 12.6878 0 13.306 0C13.9243 0 14.5266 0.195773 15.0267 0.559245L25.4667 7.40058ZM10.6667 15.9992V26.6659H8.00003V15.7326C8.00003 14.4099 9.07736 13.3326 10.4 13.3326H16.2667C17.5894 13.3326 18.6667 14.4099 18.6667 15.7326V26.6659H16V15.9992H10.6667Z"
              fill="#343434" />
          </svg>
        </div>
        <div class="w-4 h-4">
          <!-- right arrow -->
          <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.38909 0.1922C6.18752 0.1922 5.98125 0.271887 5.82656 0.426575C5.51719 0.73595 5.51719 1.2422 5.82656 1.55157L16.4156 12.1406L5.98125 22.575C5.67187 22.8844 5.67187 23.3906 5.98125 23.7C6.29062 24.0094 6.79687 24.0094 7.10625 23.7L18.1078 12.7031C18.4172 12.3938 18.4172 11.8875 18.1078 11.5781L6.95625 0.426575C6.79688 0.2672 6.59534 0.1922 6.38909 0.1922Z"
              fill="#343434" />
          </svg>
        </div>

        <div>
          <h3 class="text-[#343434] text-[14px]">Policies</h3>
        </div>
      </div>
    </div>

  </div>

  <!-- sticky session -->
  <div @click="showSession = true" class="sticky top-16 mb-4 ml-auto w-fit lg:hidden">
    <div class="flex gap-2 items-center justify-start px-2 py-1 bg-[#F94B65] rounded-l-lg">
      <div>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 3.5C0 2.94687 0.446875 2.5 1 2.5H13C13.5531 2.5 14 2.94687 14 3.5C14 4.05313 13.5531 4.5 13 4.5H1C0.446875 4.5 0 4.05313 0 3.5ZM2 8.5C2 7.94688 2.44688 7.5 3 7.5H15C15.5531 7.5 16 7.94688 16 8.5C16 9.05312 15.5531 9.5 15 9.5H3C2.44688 9.5 2 9.05312 2 8.5ZM14 13.5C14 14.0531 13.5531 14.5 13 14.5H1C0.446875 14.5 0 14.0531 0 13.5C0 12.9469 0.446875 12.5 1 12.5H13C13.5531 12.5 14 12.9469 14 13.5Z"
            fill="white" />
        </svg>
      </div>

      <span class="text-[12px] text-white">Sessions</span>
    </div>
  </div>

  <div class="lg:grid lg:grid-cols-12 lg:gap-0 lg:h-screen">
    <!-- Side session navigation tag for desktop screen -->
    <div class="hidden lg:block col-span-3 overflow-y-auto h-full hide-scrollbar bg-[#F2F0F0]">
      <div class="ml-6 mt-16 mb-8 text-[24px] font-bold text-[#343434]">
        <h3>{{ policy.title_eng }}</h3>
      </div>

      <h4 class="text-[14px] font-semibold text-[#343434] ml-4 mb-4">Session</h4>
      <ul class="pb-4 mb-4 mx-6">
        <li v-for="(nav, index) in navigationList" :key="index" :class="[
          'py-4 flex flex-col transition-all duration-300 ease-in-out',
          nav.isOpen ? 'border-none' : 'border-b border-gray'
        ]">
          <!-- parent link -->
          <a :href="'#' + nav.id" @click="nav.sub_title.length ? toggleDropdown(index) : void (0)"
            class="text-sm text-[#343434] flex justify-between items-center">
            {{ nav.title }}
            <span v-if="nav.sub_title.length">
              <svg v-if="nav.isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </a>

          <!-- inner sub list -->
          <!-- animated dropdown -->
          <transition name="dropdown" enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0">
            <ul v-show="nav.isOpen" class="mt-2 overflow-hidden">
              <li v-for="(subnav, subIndex) in nav.sub_title" :key="subIndex"
                class="border-b py-2 ml-4 border-gray flex flex-col">
                <a @click="showSession = false" :href="'#' + subnav.id" class="text-[14px] text-[#343434]">
                  {{ subnav.text }}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>

    </div>

    <!-- body part -->
    <div class="lg:col-span-9 lg:mx-0 lg:w-full overflow-y-auto h-full hide-scrollbar scroll-smooth">
      <div class="mx-4 md:mx-[96px]">
        <div class="hidden lg:flex justify-start my-12">
          <!-- desktop render -->
          <RouterLink to="/policies">
            <div class="w-8 h-8">
              <!-- go back icon -->
              <svg class="w-full h-full" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_17_3470)">
                  <rect x="1" y="1" width="40" height="36" rx="18" fill="white" shape-rendering="crispEdges" />
                  <rect x="1.5" y="1.5" width="39" height="35" rx="17.5" stroke="#CCCCCC"
                    shape-rendering="crispEdges" />
                  <path
                    d="M21 14.2719V10.4806C20.9995 10.1878 20.9113 9.90174 20.7465 9.65839C20.5816 9.41504 20.3476 9.22533 20.0738 9.11316C19.7999 9.00098 19.4986 8.97137 19.2078 9.02806C18.917 9.08475 18.6496 9.22519 18.4395 9.43169L9 18.6292L18.4395 27.8251C18.5785 27.9632 18.7437 28.0728 18.9257 28.1475C19.1077 28.2223 19.3029 28.2608 19.5 28.2608C19.6971 28.2608 19.8923 28.2223 20.0743 28.1475C20.2563 28.0728 20.4215 27.9632 20.5605 27.8251C20.8418 27.5474 20.9999 27.1706 21 26.7777V23.0901C25.125 23.1908 29.6325 23.9287 33 29V27.5184C33 20.6544 27.75 15.0097 21 14.2719Z"
                    fill="#343434" />
                </g>
                <defs>
                  <filter id="filter0_d_17_3470" x="0" y="0" width="44" height="40" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha" />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_3470" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_3470" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </RouterLink>

          <div class="justify-between items-center hidden lg:flex">
            <div class="flex">
              <!-- home > policy -->
              <div class="pl-4 pr-2 text-white flex items-center">
                <div class="md:w-8 md:h-8 lg:w-4 lg:h-4 w-4 h-4">
                  <svg class="w-full h-full" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M25.4667 7.40058L25.5067 7.43258C26.2227 7.98324 26.6667 8.83658 26.6667 9.77524V24.7832C26.6688 25.3799 26.5531 25.9711 26.3262 26.523C26.0993 27.0748 25.7658 27.5765 25.3446 27.9991C24.9234 28.4218 24.423 28.7572 23.8719 28.986C23.3208 29.2148 22.73 29.3326 22.1334 29.3326H4.53336C3.93669 29.3326 3.34588 29.2148 2.79483 28.986C2.24377 28.7572 1.74331 28.4218 1.32214 27.9991C0.900972 27.5765 0.567383 27.0748 0.340505 26.523C0.113626 25.9711 -0.00207767 25.3799 2.82379e-05 24.7832V9.77524C2.82379e-05 8.83658 0.444028 7.98324 1.16003 7.43258L1.19869 7.40191L11.5854 0.559245C12.0855 0.195773 12.6878 0 13.306 0C13.9243 0 14.5266 0.195773 15.0267 0.559245L25.4667 7.40058ZM10.6667 15.9992V26.6659H8.00003V15.7326C8.00003 14.4099 9.07736 13.3326 10.4 13.3326H16.2667C17.5894 13.3326 18.6667 14.4099 18.6667 15.7326V26.6659H16V15.9992H10.6667Z"
                      fill="#343434" />
                  </svg>
                </div>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.38909 0.1922C6.18752 0.1922 5.98125 0.271887 5.82656 0.426575C5.51719 0.73595 5.51719 1.2422 5.82656 1.55157L16.4156 12.1406L5.98125 22.575C5.67187 22.8844 5.67187 23.3906 5.98125 23.7C6.29062 24.0094 6.79687 24.0094 7.10625 23.7L18.1078 12.7031C18.4172 12.3938 18.4172 11.8875 18.1078 11.5781L6.95625 0.426575C6.79688 0.2672 6.59534 0.1922 6.38909 0.1922Z"
                    fill="#343434" />
                </svg>
                <!-- <span class="text-white text-[24px] text-bold">-></span> -->
              </div>
              <div class="">
                <div class="text-[#343434] pr-8 pl-2 md:text-[24px] lg:text-base font-bold tracking-wider">
                  Policies
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="" style="scroll-behavior: smooth" v-html="htmlContent"></div>
      </div>

    </div>

  </div>

  <!-- Overlay (dark background when sheet is open) -->
  <div v-if="showSession" @click="showSession = false" class="fixed inset-0 bg-black/40 z-30"></div>

  <!-- Bottom Sheet for mobile -->
  <div
    class="fixed bottom-0 left-0 w-full h-[100vh] bg-gray-200 rounded-t-lg z-40 transition-transform duration-300 md:hidden"
    :class="showSession ? 'translate-y-0' : 'translate-y-full'">
    <div class="p-4 flex justify-between items-center">
      <h3 class="text-[24px] font-bold text-[#343434]">{{ policy.title_eng }}</h3>
      <button @click="showSession = false" class="text-gray-600">✕</button>
    </div>
    <div class="flex justify-end gap-4 mx-4">
      <div
        class="bg-white shadow-md px-2 py-1 text-base text-[#343434] border-[#343434] rounded-full flex items-center gap-2">
        <span>Share</span>
        <div class="w-4 h-4">
          <svg class="w-full h-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.3333 14.6666C10.7777 14.6666 10.3055 14.4721 9.91659 14.0833C9.5277 13.6944 9.33325 13.2221 9.33325 12.6666C9.33325 12.5999 9.34992 12.4444 9.38325 12.1999L4.69992 9.46658C4.52214 9.63325 4.31659 9.76392 4.08325 9.85858C3.84992 9.95325 3.59992 10.0004 3.33325 9.99992C2.7777 9.99992 2.30547 9.80547 1.91659 9.41658C1.5277 9.0277 1.33325 8.55547 1.33325 7.99992C1.33325 7.44436 1.5277 6.97214 1.91659 6.58325C2.30547 6.19436 2.7777 5.99992 3.33325 5.99992C3.59992 5.99992 3.84992 6.04725 4.08325 6.14192C4.31659 6.23659 4.52214 6.36703 4.69992 6.53325L9.38325 3.79992C9.36103 3.72214 9.34725 3.64725 9.34192 3.57525C9.33659 3.50325 9.3337 3.42259 9.33325 3.33325C9.33325 2.7777 9.5277 2.30547 9.91659 1.91659C10.3055 1.5277 10.7777 1.33325 11.3333 1.33325C11.8888 1.33325 12.361 1.5277 12.7499 1.91659C13.1388 2.30547 13.3333 2.7777 13.3333 3.33325C13.3333 3.88881 13.1388 4.36103 12.7499 4.74992C12.361 5.13881 11.8888 5.33325 11.3333 5.33325C11.0666 5.33325 10.8166 5.28592 10.5833 5.19125C10.3499 5.09659 10.1444 4.96614 9.96659 4.79992L5.28325 7.53325C5.30547 7.61103 5.31947 7.68614 5.32525 7.75858C5.33103 7.83103 5.3337 7.91147 5.33325 7.99992C5.33281 8.08836 5.33014 8.16903 5.32525 8.24192C5.32036 8.31481 5.30636 8.3897 5.28325 8.46658L9.96659 11.1999C10.1444 11.0333 10.3499 10.9028 10.5833 10.8086C10.8166 10.7144 11.0666 10.667 11.3333 10.6666C11.8888 10.6666 12.361 10.861 12.7499 11.2499C13.1388 11.6388 13.3333 12.111 13.3333 12.6666C13.3333 13.2221 13.1388 13.6944 12.7499 14.0833C12.361 14.4721 11.8888 14.6666 11.3333 14.6666Z"
              fill="#343434" />
          </svg>

        </div>
      </div>

      <div
        class="bg-white shadow-md px-2 py-1 text-base text-[#343434] border-[#343434] rounded-full flex items-center gap-2">
        <span>Save</span>
        <div class="w-4 h-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.88877 7.24444V0.888889C8.88877 0.653141 8.79512 0.427048 8.62843 0.260349C8.46173 0.0936505 8.23563 0 7.99989 0C7.76414 0 7.53805 0.0936505 7.37135 0.260349C7.20465 0.427048 7.111 0.653141 7.111 0.888889V7.24444L5.13766 4.77689C5.06615 4.68169 4.97624 4.60183 4.87326 4.54205C4.77029 4.48227 4.65636 4.44379 4.53823 4.42889C4.4201 4.41398 4.30018 4.42297 4.18559 4.4553C4.07099 4.48763 3.96407 4.54266 3.87115 4.61711C3.77823 4.69157 3.70122 4.78393 3.64468 4.88872C3.58815 4.9935 3.55324 5.10858 3.54203 5.22712C3.53083 5.34566 3.54355 5.46524 3.57944 5.57877C3.61534 5.69229 3.67368 5.79745 3.751 5.888L7.30655 10.3324C7.38984 10.4363 7.49538 10.52 7.61539 10.5776C7.73539 10.6352 7.86679 10.6651 7.99989 10.6651C8.13298 10.6651 8.26438 10.6352 8.38439 10.5776C8.50439 10.52 8.60993 10.4363 8.69322 10.3324L12.2488 5.888C12.3261 5.79745 12.3844 5.69229 12.4203 5.57877C12.4562 5.46524 12.4689 5.34566 12.4577 5.22712C12.4465 5.10858 12.4116 4.9935 12.3551 4.88872C12.2986 4.78393 12.2215 4.69157 12.1286 4.61711C12.0357 4.54266 11.9288 4.48763 11.8142 4.4553C11.6996 4.42297 11.5797 4.41398 11.4615 4.42889C11.3434 4.44379 11.2295 4.48227 11.1265 4.54205C11.0235 4.60183 10.9336 4.68169 10.8621 4.77689L8.88877 7.24444Z"
              fill="#343434" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.91733 11.4436L3.87378 8.88892H1.77778C1.30628 8.88892 0.854097 9.07622 0.520699 9.40962C0.187301 9.74301 0 10.1952 0 10.6667V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V10.6667C16 10.1952 15.8127 9.74301 15.4793 9.40962C15.1459 9.07622 14.6937 8.88892 14.2222 8.88892H12.1262L10.0818 11.4436C9.83195 11.7558 9.51509 12.0079 9.15466 12.1811C8.79423 12.3543 8.39945 12.4443 7.99956 12.4443C7.59966 12.4443 7.20489 12.3543 6.84445 12.1811C6.48402 12.0079 6.16716 11.7558 5.91733 11.4436ZM12.4444 11.5556C12.2087 11.5556 11.9826 11.6492 11.8159 11.8159C11.6492 11.9826 11.5556 12.2087 11.5556 12.4445C11.5556 12.6802 11.6492 12.9063 11.8159 13.073C11.9826 13.2397 12.2087 13.3334 12.4444 13.3334H12.4533C12.6891 13.3334 12.9152 13.2397 13.0819 13.073C13.2486 12.9063 13.3422 12.6802 13.3422 12.4445C13.3422 12.2087 13.2486 11.9826 13.0819 11.8159C12.9152 11.6492 12.6891 11.5556 12.4533 11.5556H12.4444Z"
              fill="#343434" />
          </svg>


        </div>
      </div>
    </div>
    <div class="my-4 mx-4">
      <h3 class="text-[14px] text-[#343434] font-bold">Session</h3>
    </div>
    <!-- scrollable area -->
    <div class="mx-4 overflow-y-auto h-[calc(95vh-32px)] pb-12 hide-scrollbar">
      <ul class="pb-4 mb-4">
        <li v-for="(nav, index) in navigationList" :key="index" :class="[
          'py-4 flex flex-col transition-all duration-300 ease-in-out',
          nav.isOpen ? 'border-none' : 'border-b border-gray'
        ]">
          <!-- parent link -->
          <a :href="'#' + nav.id" @click="nav.sub_title.length ? toggleDropdown(index) : void (0)"
            class="text-sm font-semibold text-gray-600 flex justify-between items-center">

            {{ nav.title }}

            <span v-if="nav.sub_title.length">
              <svg v-if="nav.isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </a>

          <!-- inner dropdown -->
          <transition name="dropdown" enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0">
            <ul v-show="nav.isOpen" class="mt-2 overflow-hidden">
              <li v-for="(subnav, subIndex) in nav.sub_title" :key="subIndex"
                class="border-b py-2 ml-4 border-gray flex flex-col">
                <a @click="showSession = false" :href="'#' + subnav.id" class="text-sm text-gray-500">
                  {{ subnav.text }}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </div>

  <!-- Side drawer (tablet & up only) -->
  <div
    class="fixed top-0 right-0 h-[100vh] w-80 md:w-[400px] bg-white shadow-lg z-40 transition-transform duration-300 hidden md:block"
    :class="showSession ? 'translate-x-0' : 'translate-x-full'">
    <div class="p-4 flex justify-between items-center">
      <h3 class="text-[24px] font-bold text-[#343434]">{{ policy.title_eng }}</h3>
      <button @click="showSession = false" class="text-gray-600">✕</button>
    </div>
    <div class="flex justify-end gap-4 mx-4">
      <div
        class="bg-white shadow-md px-2 py-1 text-base text-[#343434] border-[#343434] rounded-full flex items-center gap-2">
        <span>Share</span>
        <div class="w-4 h-4">
          <svg class="w-full h-full" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.3333 14.6666C10.7777 14.6666 10.3055 14.4721 9.91659 14.0833C9.5277 13.6944 9.33325 13.2221 9.33325 12.6666C9.33325 12.5999 9.34992 12.4444 9.38325 12.1999L4.69992 9.46658C4.52214 9.63325 4.31659 9.76392 4.08325 9.85858C3.84992 9.95325 3.59992 10.0004 3.33325 9.99992C2.7777 9.99992 2.30547 9.80547 1.91659 9.41658C1.5277 9.0277 1.33325 8.55547 1.33325 7.99992C1.33325 7.44436 1.5277 6.97214 1.91659 6.58325C2.30547 6.19436 2.7777 5.99992 3.33325 5.99992C3.59992 5.99992 3.84992 6.04725 4.08325 6.14192C4.31659 6.23659 4.52214 6.36703 4.69992 6.53325L9.38325 3.79992C9.36103 3.72214 9.34725 3.64725 9.34192 3.57525C9.33659 3.50325 9.3337 3.42259 9.33325 3.33325C9.33325 2.7777 9.5277 2.30547 9.91659 1.91659C10.3055 1.5277 10.7777 1.33325 11.3333 1.33325C11.8888 1.33325 12.361 1.5277 12.7499 1.91659C13.1388 2.30547 13.3333 2.7777 13.3333 3.33325C13.3333 3.88881 13.1388 4.36103 12.7499 4.74992C12.361 5.13881 11.8888 5.33325 11.3333 5.33325C11.0666 5.33325 10.8166 5.28592 10.5833 5.19125C10.3499 5.09659 10.1444 4.96614 9.96659 4.79992L5.28325 7.53325C5.30547 7.61103 5.31947 7.68614 5.32525 7.75858C5.33103 7.83103 5.3337 7.91147 5.33325 7.99992C5.33281 8.08836 5.33014 8.16903 5.32525 8.24192C5.32036 8.31481 5.30636 8.3897 5.28325 8.46658L9.96659 11.1999C10.1444 11.0333 10.3499 10.9028 10.5833 10.8086C10.8166 10.7144 11.0666 10.667 11.3333 10.6666C11.8888 10.6666 12.361 10.861 12.7499 11.2499C13.1388 11.6388 13.3333 12.111 13.3333 12.6666C13.3333 13.2221 13.1388 13.6944 12.7499 14.0833C12.361 14.4721 11.8888 14.6666 11.3333 14.6666Z"
              fill="#343434" />
          </svg>

        </div>
      </div>

      <div
        class="bg-white shadow-md px-2 py-1 text-base text-[#343434] border-[#343434] rounded-full flex items-center gap-2">
        <span>Save</span>
        <div class="w-4 h-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.88877 7.24444V0.888889C8.88877 0.653141 8.79512 0.427048 8.62843 0.260349C8.46173 0.0936505 8.23563 0 7.99989 0C7.76414 0 7.53805 0.0936505 7.37135 0.260349C7.20465 0.427048 7.111 0.653141 7.111 0.888889V7.24444L5.13766 4.77689C5.06615 4.68169 4.97624 4.60183 4.87326 4.54205C4.77029 4.48227 4.65636 4.44379 4.53823 4.42889C4.4201 4.41398 4.30018 4.42297 4.18559 4.4553C4.07099 4.48763 3.96407 4.54266 3.87115 4.61711C3.77823 4.69157 3.70122 4.78393 3.64468 4.88872C3.58815 4.9935 3.55324 5.10858 3.54203 5.22712C3.53083 5.34566 3.54355 5.46524 3.57944 5.57877C3.61534 5.69229 3.67368 5.79745 3.751 5.888L7.30655 10.3324C7.38984 10.4363 7.49538 10.52 7.61539 10.5776C7.73539 10.6352 7.86679 10.6651 7.99989 10.6651C8.13298 10.6651 8.26438 10.6352 8.38439 10.5776C8.50439 10.52 8.60993 10.4363 8.69322 10.3324L12.2488 5.888C12.3261 5.79745 12.3844 5.69229 12.4203 5.57877C12.4562 5.46524 12.4689 5.34566 12.4577 5.22712C12.4465 5.10858 12.4116 4.9935 12.3551 4.88872C12.2986 4.78393 12.2215 4.69157 12.1286 4.61711C12.0357 4.54266 11.9288 4.48763 11.8142 4.4553C11.6996 4.42297 11.5797 4.41398 11.4615 4.42889C11.3434 4.44379 11.2295 4.48227 11.1265 4.54205C11.0235 4.60183 10.9336 4.68169 10.8621 4.77689L8.88877 7.24444Z"
              fill="#343434" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.91733 11.4436L3.87378 8.88892H1.77778C1.30628 8.88892 0.854097 9.07622 0.520699 9.40962C0.187301 9.74301 0 10.1952 0 10.6667V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V10.6667C16 10.1952 15.8127 9.74301 15.4793 9.40962C15.1459 9.07622 14.6937 8.88892 14.2222 8.88892H12.1262L10.0818 11.4436C9.83195 11.7558 9.51509 12.0079 9.15466 12.1811C8.79423 12.3543 8.39945 12.4443 7.99956 12.4443C7.59966 12.4443 7.20489 12.3543 6.84445 12.1811C6.48402 12.0079 6.16716 11.7558 5.91733 11.4436ZM12.4444 11.5556C12.2087 11.5556 11.9826 11.6492 11.8159 11.8159C11.6492 11.9826 11.5556 12.2087 11.5556 12.4445C11.5556 12.6802 11.6492 12.9063 11.8159 13.073C11.9826 13.2397 12.2087 13.3334 12.4444 13.3334H12.4533C12.6891 13.3334 12.9152 13.2397 13.0819 13.073C13.2486 12.9063 13.3422 12.6802 13.3422 12.4445C13.3422 12.2087 13.2486 11.9826 13.0819 11.8159C12.9152 11.6492 12.6891 11.5556 12.4533 11.5556H12.4444Z"
              fill="#343434" />
          </svg>


        </div>
      </div>
    </div>
    <div class="my-4 mx-4">
      <h3 class="text-[14px] text-[#343434] font-bold">Session</h3>
    </div>
    <div class="mx-4 pb-4 overflow-y-scroll h-full hide-scrollbar ">
      <ul class="pb-4 mb-4 mx-6">
        <li v-for="(nav, index) in navigationList" :key="index" :class="[
          'py-4 flex flex-col transition-all duration-300 ease-in-out',
          nav.isOpen ? 'border-none' : 'border-b border-gray'
        ]">
          <!-- parent link -->
          <a :href="'#' + nav.id" @click="nav.sub_title.length ? toggleDropdown(index) : void (0)"
            class="text-sm text-[#343434] flex justify-between items-center">

            {{ nav.title }}

            <span v-if="nav.sub_title.length">
              <svg v-if="nav.isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </a>

          <!-- inner sub list -->
          <!-- animated dropdown -->
          <transition name="dropdown" enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0">
            <ul v-show="nav.isOpen" class="mt-2 overflow-hidden">
              <li v-for="(subnav, subIndex) in nav.sub_title" :key="subIndex"
                class="border-b py-2 ml-4 border-gray flex flex-col">
                <a @click="showSession = false" :href="'#' + subnav.id" class="text-[14px] text-[#343434]">
                  {{ subnav.text }}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { converToHTML } from '@/composible/convertToHTML';
import { usePoliciesStore } from '@/stores/policiesStore';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const showSession = ref(false);
const policyStore = usePoliciesStore();
const route = useRoute();
const policy = ref('');
const navigationList = ref([]);
const htmlContent = ref('');

onMounted(async () => {
  if (route.params.id) {
    if (policyStore.policies.length === 0) {
      await policyStore.fetchPolicies();
    }

    policy.value = policyStore.policies.find(pol => {
      return pol.id === parseInt(route.params.id);
    })

    if (policy.value?.content_eng) {
      try {

        let json = JSON.parse(policy.value.content_eng)

        if (typeof json === 'string') {
          json = JSON.parse(json);
        }

        const content = Array.isArray(json) ? { type: 'doc', content: json } : json

        navigationList.value = extractHeadings(content.content);

        htmlContent.value = converToHTML(content);

      } catch (err) {
        console.error('Failed to parse or render TipTap content:', err)
      }
    }

  }
})

const toggleDropdown = (index) => {
  // toggle selected one
  navigationList.value[index].isOpen = !navigationList.value[index].isOpen;
  // optionally close others
  navigationList.value.forEach((nav, i) => {
    if (i !== index) nav.isOpen = false;
  });
};

function extractHeadings(docContent) {
  if (!docContent || !Array.isArray(docContent)) return []

  const result = []
  let currentH1 = null

  for (const node of docContent) {
    if (node.type === 'heading' && node.attrs?.level === 1) {
      // Decode the readable title from the id
      let decodedTitle = '';
      if (node.attrs?.id) {
        // Remove prefix like "h1-" and decode
        decodedTitle = decodeURIComponent(node.attrs.id.replace(/^h\d-/, ''))
          .replace(/-/g, ' ') // convert hyphens back to spaces
          .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize each word (optional)
      }

      currentH1 = {
        title: decodedTitle || node.content?.[0]?.text || '',
        id: node.attrs?.id || '',
        sub_title: [],
      };
      result.push(currentH1);

    } else if (
      node.type === 'heading' &&
      (node.attrs?.level === 2 || node.attrs?.level === 3)
    ) {
      if (currentH1) {
        let decodedSubtitle = '';
        if (node.attrs?.id) {
          decodedSubtitle = decodeURIComponent(node.attrs.id.replace(/^h\d-/, ''))
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
        }

        currentH1.sub_title.push({
          text: decodedSubtitle || node.content?.[0]?.text || '',
          id: node.attrs?.id || '',
        });
      }
    }
  }
  return result
}


</script>

<style scoped></style>
