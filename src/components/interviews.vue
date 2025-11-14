<template>
    <div v-if="strategicStore.interviews.length" class="flex flex-col gap-4 md:grid md:grid-cols-12 md:grap-6">
        <InterviewCard v-for="(int, index) in strategicStore.interviews" :key="index" :date="int.date"
            :persons="JSON.parse(int.persons)" :tags="JSON.parse(int.tags)" :quote="int.quote" :vidURL="int.videoFile"
            :vidType="int.type" :savedAt="int.savedAt ?? null" :id="int.id">
        </InterviewCard>
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
import InterviewCard from './interviewCard.vue';
import { useStrategicStore } from '@/stores/strategicStore'


const strategicStore = useStrategicStore();

onMounted(async () => {
    if (!strategicStore.interviews.length) {
        await strategicStore.fetchInterviewAll();
    }
})
</script>