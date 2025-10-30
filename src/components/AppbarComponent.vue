<template>
  <header class="bg-white sticky top-0 left-0 w-full z-999 md:hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-[60px] transition">
        <!-- Logo / App Name -->
        <div class="flex items-center">
          <RouterLink to="/">
            <img src="/pwa-icon.svg" alt="Logo" class="h-[48px] mr-2" />
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button @click="toggleMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <motion.div :animate="isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }"
      :style="{ overflow: 'hidden' }" class="md:hidden bg-white shadow-md">
      <nav class="px-4 space-y-2">
        <RouterLink to="/Strategies">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Strategies</a>
        </RouterLink>
        <RouterLink to="/Posters">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Posters</a>
        </RouterLink>

        <RouterLink to="articles">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Articles</a>
        </RouterLink>

        <RouterLink to="/statements">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Statements</a>
        </RouterLink>

        <RouterLink to="ArtMovements">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Art
            Movements</a>
        </RouterLink>
        <RouterLink to="Media">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Media</a>
        </RouterLink>
        <RouterLink to="policies">
          <a href="#"
            class="block text-gray-600 hover:text-gray-900 block py-4 border-b font-semibold tracking-wider">Policies</a>
        </RouterLink>
      </nav>
    </motion.div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { motion } from 'motion-v'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
