<template>
    <div class="flex flex-col gap-4 md:grid md:grid-cols-12">
        <MovementCard v-for="(move, index) in strategicStore.movements" :key="index" :title="move.title_eng"
            :cover_url="move.cover_url" :id="move.id" :date="move.story_date" @click.stop="goToViewMovement(move.id)">
        </MovementCard>
    </div>
</template>

<script setup>
import { useStrategicStore } from '@/stores/strategicStore';
import MovementCard from './MovementCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const strategicStore = useStrategicStore();
const router = useRouter();

onMounted(async () => {
    if (!strategicStore.movements.length) {
        await strategicStore.fetchMovementAll();
    }
})

function goToViewMovement(id) {
    router.push({
        name: 'ViewMovement', params: {
            id: id
        }
    })
}
</script>