<template>
    <div v-if="strategicStore.musics.length" class="flex flex-col gap-4 md:grid md:grid-cols-12">
        <MusicCard v-for="(music, index) in strategicStore.musics" :key="index" :vidURL="music.file_url"
            :title="music.title" :date="music.date" :links="JSON.parse(music.links)" :tags="JSON.parse(music.tags)"
            :id="music.id" :savedAt="music.savedAt">
        </MusicCard>
    </div>
    <div v-else class="h-[120px] mt-24 flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import MusicCard from './MusicCard.vue';
import { useStrategicStore } from '../stores/strategicStore';

const strategicStore = useStrategicStore();

onMounted(async () => {
    if (!strategicStore.musics.length) {
        await strategicStore.fetchMusicAll();
    }
})

</script>