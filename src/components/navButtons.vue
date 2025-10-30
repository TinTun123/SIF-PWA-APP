<template>
  <motion.div v-for="(item, i) in navItems" :key="item.label" :transition="{ duration: 0.6, delay: i * 0.2 }"
    :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }" :class="item.class"
    class="md:col-start-auto md:col-span-4">
    <RouterLink :to="item.to">
      <div
        class="bg-white rounded-lg md:h-[84px] shadow p-4 font-bold cursor-pointer hover:shadow-none hover:border hover:border-red-500">
        <span>{{ item.label }}</span>
      </div>
    </RouterLink>
  </motion.div>
</template>

<script setup>
import { motion } from 'motion-v'

const navItems = [
  {
    label: 'Strategies',
    to: '/Strategies',
    class: 'col-span-5 col-start-2 tracking-wider md:col-start-auto ',
  },
  {
    label: 'Statements',
    to: '/statements',
    class: 'col-span-5 col-start-8 tracking-wider md:col-start-auto ',
  },
  {
    label: 'Posters',
    to: '/Posters',
    class: 'col-span-5 tracking-wider md:col-start-auto ',
  },
  {
    label: 'Art movements',
    to: '/ArtMovements',
    class: 'col-span-6 tracking-wider md:col-start-auto',
  },
  {
    label: 'Articles',
    to: '/articles',
    class: 'col-span-5 col-start-2 tracking-wider',
  },
  {
    label: 'Media',
    to: '/Media',
    class: 'col-span-5 col-start-8 tracking-wider',
  },
  {
    label: 'We are ...',
    to: '/About-us',
    class: 'col-span-5 tracking-wider',
  },
  {
    label: 'Policies',
    to: '/policies',
    class: 'col-span-5 col-start-7 tracking-wider',
  },
]
</script>
