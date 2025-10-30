<template>
    <teleport to="body">
        <div v-if="show" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div :class="true ? myClass : ''" class="rounded-2xl shadow-sm w-full relative animate-fadeIn" @click.stop>
                <!-- Close button -->
                <button @click="$emit('close')"
                    class="absolute -top-12 right-3 md:right-12 lg:top-0 md:text-[24px] text-gray-100 hover:text-gray-600 cursor-pointer text-xl">
                    ✕
                </button>

                <!-- Modal content -->
                <slot />
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    myClass: {
        type: String,
        default: "m-6 p-6 bg-white"
    },
})

const emits = defineEmits(["close"]);

const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
        emits('close')
    }
}

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }
)

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
})


</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
}
</style>
