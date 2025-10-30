<template>
    <div class="flex flex-col gap-4 md:grid md:grid-cols-12">
        <LearningCard @click.stop="goTo(course.id)" v-for="(course, index) in strategicStore.courses" :key="index"
            :title="course.title_eng" :total_session="course.sessions_count" :cover_url="course.cover_url">
        </LearningCard>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStrategicStore } from '@/stores/strategicStore'
import LearningCard from './LearningCard.vue';
import { useRouter } from 'vue-router';

const strategicStore = useStrategicStore();
const router = useRouter();

function goTo(courseId) {
    router.push({
        name: 'Course', params: {
            id: courseId
        }
    })
}

onMounted(async () => {
    if (strategicStore.courses.length === 0) {
        await strategicStore.fetchCourses();
    }
})

</script>