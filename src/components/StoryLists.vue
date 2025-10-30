<template>
    <div class="flex flex-col gap-4 md:grid md:grid-cols-12">

        <StoryCard v-for="(story, index) in strategicStore.stories" :key="index" :title="story.title_eng"
            :cover_url="story.cover_url" @click.stop="viewStory(story.id)">
        </StoryCard>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import StoryCard from './StoryCard.vue';
import { useStrategicStore } from '@/stores/strategicStore';
import { useRouter } from 'vue-router';

const strategicStore = useStrategicStore();
const router = useRouter();
onMounted(async () => {
    if (!strategicStore.stories.length) {
        await strategicStore.fetchStoryAll();
    }
})

function viewStory(id) {
    router.push({
        name: 'ViewStory', params: {
            id: id
        }
    })
}
</script>