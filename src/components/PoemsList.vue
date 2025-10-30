<template>
    <div v-if="strategicStore.poems.length" class="flex flex-col gap-4 md:grid md:grid-cols-12">


        <PoemCard v-for="(poem, index) in strategicStore.poems" :key="index" @click.stop="selectPoem(poem)"
            :title="poem.title" :cover_url="poem.cover_url" :poet="poem.author">
        </PoemCard>



        <TeleportModal myClass="m-0 p-0 bg-none h-full" :show="open" @close="open = false">
            <ReadPoem @close="open = false" :title="title" :cover_url="cover_url" :author="author" :passage="passage">
            </ReadPoem>
        </TeleportModal>

    </div>
    <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <h3 class="text-white text-base md:text-[20px]">Loading ...</h3>
    </div>
</template>


<script setup>

import { onMounted, ref } from 'vue';
import PoemCard from './PoemCard.vue';
import ReadPoem from './ReadPoem.vue';
import TeleportModal from './TeleportModal.vue';
import { useStrategicStore } from '../stores/strategicStore';

const strategicStore = useStrategicStore()
const title = ref("");
const author = ref("");
const cover_url = ref("");
const passage = ref("");

const open = ref(false);

function selectPoem(poem) {
    title.value = poem.title;
    author.value = poem.author;
    cover_url.value = poem.cover_url;
    passage.value = poem.passage;
    open.value = true;
}
onMounted(async () => {
    if (!strategicStore.poems.length) {
        await strategicStore.fetchPoemAll();
    }
})
</script>