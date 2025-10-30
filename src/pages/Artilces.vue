<template>
  <AppbarComponent />
  <div style="scrollbar-width: none"
    class="home-block bg-[url(/images/strike02_cover.jpg)] bg-cover bg-no-repeat relative min-h-screen overflow-y-scroll">
    <!-- bg gradient block -->
    <div class="absolute top-0 bottom-0 left-0 right-0 bg-block z-0"></div>
    <div class="relative z-100">
      <div class="lg:mx-[96px]">
        <!-- Logo Block -->
        <LogoComponent class="hidden md:flex mt-8"></LogoComponent>
        <!-- search button -->
        <div
          class="w-[142px] rounded-l-[8px] border border-white flex items-center justify-between gap-2 px-4 py-2 mt-6 ml-auto md:rounded-r-[8px] md:mr-[24px]">
          <span class="text-white">Search</span>
          <img src="/images/search-icon.svg" class="w-8 h-8" alt="" />
        </div>

        <!-- Nav bar -->
        <NavBar class="flex mt-8" title="Articles"></NavBar>



        <div v-if="strategicStore.articles.length > 0"
          class="flex flex-col gap-4 my-8 md:grid md:grid-cols-12 md:gap-4 md:mx-6 lg:mx-0">
          <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :viewport="{ once: true }"
            :transition="{ duration: 0.6, delay: index * 0.2 }" class="mx-4 md:mx-0 md:col-span-6 lg:col-span-5"
            :class="[index % 2 === 0 ? 'lg:col-start-2' : '']" v-for="(article, index) in strategicStore.articles">
            <Articlescard :title="article.title_eng" :author="article.author" :date="article.date"
              :description="article.description" :cover_url="article.cover_url"
              @click.stop="goToViewArticle(article.id)"></Articlescard>
          </motion.div>
        </div>
        <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
          <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import LogoComponent from '@/components/LogoComponent.vue'
import AppbarComponent from '@/components/AppbarComponent.vue'
import NavBar from '@/components/navBar.vue'
import { motion } from 'motion-v'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Articlescard from '@/components/Articlescard.vue'
import { useStrategicStore } from '@/stores/strategicStore'


const strategicStore = useStrategicStore();

const router = useRouter()
onMounted(async () => {
  await strategicStore.fetchArticleAll();

})

function goToViewArticle(articleId) {
  router.push({ name: 'ViewArticle', params: { id: articleId } })
}

</script>

<style>
.card_shadow {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
}
</style>
