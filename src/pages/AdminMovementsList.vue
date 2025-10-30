<template>
    <div class="mx-12 my-12">
        <div>
            <button @click.stop="goToManageMovement()"
                class="bg-[#F94B65] rounded-lg text-white px-4 py-2 cursor-pointer hover:bg-[#F94B65]/70 transition">New
                Movement</button>
        </div>

        <div v-if="strategicStore.movements.length > 0"
            class="gap-4 my-8 md:grid md:grid-cols-12 md:gap-4 md:mx-6 lg:mx-0">

            <MovementCard @click.stop="goToManageMovement(move.id)" v-for="(move, index) in strategicStore.movements"
                :title="move.title_eng" :date="move.date" :cover_url="move.cover_url" :id="move.id"
                @delete="deleteMovement">
            </MovementCard>

        </div>
        <div v-else class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
            <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3 class="text-gray-600 text-base md:text-[20px]">Loading ...</h3>
        </div>
    </div>
</template>

<script setup>
import { axiosClient } from '@/axios';
import MovementCard from '@/components/MovementCard.vue';
import { useStrategicStore } from '@/stores/strategicStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const strategicStore = useStrategicStore();

onMounted(async () => {
    if (!strategicStore.movements.length) {
        await strategicStore.fetchMovementAll();
    }

})

function goToManageMovement(id) {

    router.push({
        name: 'ManageMovement', params: {
            id: id
        }
    })
}


async function deleteMovement(id) {


    await strategicStore.deleteMovement(id).then(res => {

    })
}
</script>