<template>
    <div class="">
        <div class="flex flex-col gap-4 md:grid md:grid-cols-12 md:grap-6" v-if="strategicStore.podcasts.length > 0">
            <PodcastCard @click.stop="goTo(podcast.id)" v-for="(podcast, index) in strategicStore.podcasts"
                :title="podcast.title" :episodes="podcast.episodes" :description="podcast.description"
                :thunmnailURL="podcast.cover_url" :podcaster="podcast.podcaster">
            </PodcastCard>
        </div>
        <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
            <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
        </div>

    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import PodcastCard from './podcastCard.vue';
import { useRouter } from 'vue-router';
import { useStrategicStore } from '../stores/strategicStore';

const router = useRouter();
const strategicStore = useStrategicStore();

function goTo(id) {
    router.push({
        name: 'Podcast', params: {
            id: id
        }
    })
}
const podcasts = ref([
])

onMounted(async () => {
    if (!strategicStore.podcasts.length) {
        await strategicStore.fetchPodcastsAll();
    }
})
</script>