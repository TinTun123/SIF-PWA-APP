<template>
    <div v-if="strategicStore.comics.length" class="flex flex-col gap-4 md:grid md:grid-cols-12">
        <ComicCard @click.stop="selectComic(comic)" v-for="(comic, index) in strategicStore.comics" :key="index"
            :title="comic.title" :date="comic.date" :image="JSON.parse(comic.images)[0]"></ComicCard>
    </div>
    <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
    </div>

    <TeleportModal myClass="m-0 p-0 bg-none h-[80%]" :show="open" @close="open = false">
        <ReadComic :imgs="imgs" :date="date"></ReadComic>
    </TeleportModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ComicCard from './ComicCard.vue';
import ReadComic from './ReadComic.vue';
import TeleportModal from './TeleportModal.vue';
import { useStrategicStore } from '../stores/strategicStore';

const open = ref();
const strategicStore = useStrategicStore();

const imgs = ref([]);
const date = ref("");

onMounted(async () => {
    if (!strategicStore.comics.length) {
        await strategicStore.fetchComicsAll();
    }
})

function selectComic(comic) {
    imgs.value = JSON.parse(comic.images);
    date.value = comic.date;
    open.value = true;
}
</script>