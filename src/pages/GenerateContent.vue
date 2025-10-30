<template>
    <code class="m-12">{{ content }}</code>
    <div class="m-12 flex justify-center">
        <editor v-model="content"></editor>
    </div>

</template>

<script setup>
import Editor from '@/components/editor.vue';
import { ref } from 'vue';

const content = ref();

</script>