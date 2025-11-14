<template>
    <div class="group h-full flex flex-col justify-between h-full md:col-span-6"
        :class="[route.name !== 'Statements' ? 'p-4 border border-gray-200 rounded-lg cursor-pointer' : 'border-b-2 border-[#F94B65] border-dashed pb-4']">
        <div class="flex-1 flex flex-col justify-between">
            <!-- Title & date -->
            <div class="flex flex-col gap-2 px-3 py-2 border-l-3 border-[#F94B65] mb-4">
                <h1 :class="[route.name !== 'Statements' ? 'text-gray-700' : 'text-white']"
                    class="text-sm md:text-base lg:text-[18px] text-justify leading-[32px]">{{ title }}
                </h1>

            </div>

            <!-- Cover image -->
            <div class="my-4 flex justify-center">
                <div :class="[aspect === 'portrait' ? 'aspect-[0.71] w-50 md:w-80 lg:w-95' : 'aspect-video']">
                    <div v-if="!isOnline && !savedAt" class="flex flex-col items-center justify-center">
                        <div class="w-12 h-12">
                            <svg class="w-full h-full" viewBox="0 0 22 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.75 3.75C2.80039 4.66901 2.04541 5.7697 1.53001 6.98655C1.01462 8.20339 0.749349 9.51151 0.750001 10.833C0.750001 16.31 5.227 20.75 10.75 20.75C13.3642 20.7563 15.8769 19.7386 17.75 17.915"
                                    stroke="#DDDDDD" stroke-width="1.5" />
                                <path
                                    d="M14.25 14.75C13.633 18.282 12.39 20.75 10.75 20.75C8.54 20.75 6.75 16.273 6.75 10.75C6.75 9.519 6.839 8.34 7.002 7.25"
                                    stroke="#DDDDDD" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M0.75 10.75H10.75" stroke="#DDDDDD" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M5.91199 1.14801C5.73581 1.23846 5.60256 1.39491 5.5413 1.58323C5.48004 1.77155 5.49575 1.97645 5.585 2.15323C5.67425 2.33002 5.8298 2.46432 6.0177 2.52685C6.2056 2.58939 6.41061 2.57506 6.58799 2.48701L5.91199 1.14801ZM19.012 14.912C18.9223 15.0897 18.907 15.2957 18.9692 15.4848C19.0315 15.6738 19.1663 15.8304 19.344 15.92C19.5217 16.0097 19.7277 16.025 19.9167 15.9628C20.1058 15.9005 20.2623 15.7657 20.352 15.588L19.012 14.912ZM14.75 10.75H14C14 11.164 14.336 11.5 14.75 11.5V10.75ZM7.05299 3.47601C6.98487 3.66016 6.99168 3.86368 7.07196 4.04286C7.15224 4.22204 7.29959 4.3626 7.48235 4.43434C7.66512 4.50609 7.86873 4.5033 8.04947 4.42658C8.2302 4.34986 8.37364 4.20532 8.44899 4.02401L7.05299 3.47601ZM10.75 1.50001C13.2032 1.50001 15.556 2.47456 17.2907 4.20927C19.0254 5.94399 20 8.29676 20 10.75H21.5C21.5 4.81301 16.687 1.23011e-05 10.75 1.23011e-05V1.50001ZM6.58799 2.48701C7.87851 1.83559 9.30438 1.49745 10.75 1.50001V1.23011e-05C9.06955 -0.00253557 7.41213 0.390749 5.91199 1.14801L6.58799 2.48701ZM20 10.75C20.0025 12.1956 19.6644 13.6215 19.013 14.912L20.352 15.588C21.1092 14.0879 21.5025 12.4305 21.5 10.75H20ZM10.75 1.50001C11.03 1.50001 11.372 1.63901 11.762 2.05101C12.154 2.46501 12.542 3.10501 12.882 3.95701C13.562 5.65801 14 8.06001 14 10.75H15.5C15.5 7.91801 15.042 5.31901 14.275 3.40001C13.892 2.44301 13.417 1.61801 12.852 1.02001C12.285 0.421012 11.575 1.23011e-05 10.75 1.23011e-05V1.50001ZM8.44899 4.02401C8.78399 3.16901 9.20499 2.51401 9.63299 2.08601C10.066 1.65401 10.455 1.50001 10.75 1.50001V1.23011e-05C9.92599 1.23011e-05 9.17799 0.420012 8.57299 1.02501C7.96299 1.63501 7.44299 2.48001 7.05299 3.47601L8.44899 4.02401ZM14.75 11.5H20.75V10H14.75V11.5Z"
                                    fill="#DDDDDD" />
                                <path d="M0.75 0.75L20.75 20.75" stroke="#DDDDDD" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="text-[#DDDDDD] text-lg">
                            Please connect the internet
                        </div>
                    </div>
                    <img v-else :src="cover_url" @load="checkAspect" ref="imageEl" class="h-full w-full rounded-lg"
                        alt=""></img>
                </div>
            </div>

            <!-- Author & tags -->
            <div class="flex flex-col gap-2 justify-between mb-4">
                <h3 v-for="(org, index) in orgs" :key="index"
                    :class="[route.name !== 'Statements' ? 'text-gray-700' : 'text-white']"
                    class="text-[12px] font-semibold tracking-wider border-r-2 border-white pr-2 text-right">{{ org }}
                </h3>
            </div>
        </div>

        <div class="flex justify-between gap-4 mt-auto cursor-pointer flex-none">
            <div>
                <span :class="[route.name !== 'Statements' ? 'text-gray-700' : 'text-white']"
                    class="text-[12px] font-semibold">{{ date }}</span>
            </div>

            <div @click.stop="saveStatement({ title: title, date: date, orgs: orgs, images: images, id: id })"
                :class="[route.name !== 'Statements' ? 'text-gray-700' : 'text-white', savedAt || progress === 100 ? 'border-[#51F94B]' : 'border-[#F94B65]']"
                class="flex gap-2 items-center hover:bg-gray-600 hover:text-white transition px-2 py-1 text-[12px] rounded-full border">
                <div class="w-3 h-3">
                    <svg v-if="savedAt || progress === 100" width="16" height="11" viewBox="0 0 16 11" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.9882 4.58333C13.0824 4.30833 13.1765 4.03333 13.1765 3.66667C13.1765 1.65 11.4824 0 9.41176 0C8 0 6.68235 0.825 6.11765 2.01667C5.83529 1.925 5.45882 1.83333 5.17647 1.83333C3.85882 1.83333 2.82353 2.84167 2.82353 4.125C2.82353 4.30833 2.82353 4.49167 2.91765 4.58333C1.22353 4.85833 0 6.14167 0 7.79167C0 9.53333 1.50588 11 3.29412 11H12.7059C14.4941 11 16 9.53333 16 7.79167C16 6.14167 14.6824 4.76667 12.9882 4.58333ZM7.05882 9.99167L4.04706 7.05833L5.36471 5.775L7.05882 7.425L10.6353 3.94167L11.9529 5.225L7.05882 9.99167Z"
                            fill="#51F94B" />
                    </svg>

                    <svg v-else class="w-full h-full" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.88877 7.24444V0.888889C8.88877 0.653141 8.79512 0.427048 8.62843 0.260349C8.46173 0.0936505 8.23563 0 7.99989 0C7.76414 0 7.53805 0.0936505 7.37135 0.260349C7.20465 0.427048 7.111 0.653141 7.111 0.888889V7.24444L5.13766 4.77689C5.06615 4.68169 4.97624 4.60183 4.87326 4.54205C4.77029 4.48227 4.65636 4.44379 4.53823 4.42889C4.4201 4.41398 4.30018 4.42297 4.18559 4.4553C4.07099 4.48763 3.96407 4.54266 3.87115 4.61711C3.77823 4.69157 3.70122 4.78393 3.64468 4.88872C3.58815 4.9935 3.55324 5.10858 3.54203 5.22712C3.53083 5.34566 3.54355 5.46524 3.57944 5.57877C3.61534 5.69229 3.67368 5.79745 3.751 5.888L7.30655 10.3324C7.38984 10.4363 7.49538 10.52 7.61539 10.5776C7.73539 10.6352 7.86679 10.6651 7.99989 10.6651C8.13298 10.6651 8.26438 10.6352 8.38439 10.5776C8.50439 10.52 8.60993 10.4363 8.69322 10.3324L12.2488 5.888C12.3261 5.79745 12.3844 5.69229 12.4203 5.57877C12.4562 5.46524 12.4689 5.34566 12.4577 5.22712C12.4465 5.10858 12.4116 4.9935 12.3551 4.88872C12.2986 4.78393 12.2215 4.69157 12.1286 4.61711C12.0357 4.54266 11.9288 4.48763 11.8142 4.4553C11.6996 4.42297 11.5797 4.41398 11.4615 4.42889C11.3434 4.44379 11.2295 4.48227 11.1265 4.54205C11.0235 4.60183 10.9336 4.68169 10.8621 4.77689L8.88877 7.24444Z"
                            fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.91733 11.4436L3.87378 8.88892H1.77778C1.30628 8.88892 0.854097 9.07622 0.520699 9.40962C0.187301 9.74301 0 10.1952 0 10.6667V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V10.6667C16 10.1952 15.8127 9.74301 15.4793 9.40962C15.1459 9.07622 14.6937 8.88892 14.2222 8.88892H12.1262L10.0818 11.4436C9.83195 11.7558 9.51509 12.0079 9.15466 12.1811C8.79423 12.3543 8.39945 12.4443 7.99956 12.4443C7.59966 12.4443 7.20489 12.3543 6.84445 12.1811C6.48402 12.0079 6.16716 11.7558 5.91733 11.4436ZM12.4444 11.5556C12.2087 11.5556 11.9826 11.6492 11.8159 11.8159C11.6492 11.9826 11.5556 12.2087 11.5556 12.4445C11.5556 12.6802 11.6492 12.9063 11.8159 13.073C11.9826 13.2397 12.2087 13.3334 12.4444 13.3334H12.4533C12.6891 13.3334 12.9152 13.2397 13.0819 13.073C13.2486 12.9063 13.3422 12.6802 13.3422 12.4445C13.3422 12.2087 13.2486 11.9826 13.0819 11.8159C12.9152 11.6492 12.6891 11.5556 12.4533 11.5556H12.4444Z"
                            fill="white" />
                    </svg>
                </div>
                <span>{{ savedAt || progress == 100 ? "SAVED" : 'Save' }}</span>

            </div>
        </div>
    </div>

</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useOnlineStatus } from '../composible/useOnlineStatus';


const aspect = ref(null);
const imageEl = ref(null);
const route = useRoute();
const progress = ref(null)
const { isOnline } = useOnlineStatus();

const props = defineProps({
    title: String,
    cover_url: String,
    date: String,
    orgs: Array,
    images: Array,
    id: Number,
    savedAt: [Number, null, undefined]
})
function checkAspect() {
    const img = imageEl.value;
    if (!img) return;

    const width = img.naturalWidth;
    const height = img.naturalHeight;

    if (width > height) {
        aspect.value = 'landscape';
    } else if (height > width) {
        aspect.value = 'portrait';
    } else {
        aspect.value = 'square';
    }
}



function saveStatement(statement) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {

        console.log("Click Save : ", statement.id);

        navigator.serviceWorker.controller.postMessage({
            type: 'SAVE_STATEMENT',
            payload: statement,
        })
        progress.value = 0
    } else {
        console.warn('Service worker not active')
    }
}

// ✅ Listen for progress updates
function handleSWMessage(event) {
    const { type, progress: pct, statementId } = event.data || {}

    if (type === 'SAVE_PROGRESS' && statementId === props.id) {
        progress.value = pct
    }
    if (type === 'SAVE_DONE' && statementId === props.id) {
        progress.value = 100
    }
}

onMounted(() => {
    navigator.serviceWorker?.addEventListener('message', handleSWMessage)
})
onBeforeUnmount(() => {
    navigator.serviceWorker?.removeEventListener('message', handleSWMessage)
})
</script>