<template>
    <div class="lg:grid lg:grid-cols-12 lg:gap-0 lg:h-screen lg:overflow-hidden">

        <!-- Side session navigation tag for desktop screen -->
        <div
            class="hidden lg:block col-span-4 overflow-y-auto hide-scrollbar bg-[#F2F0F0] lg:shadow-lg lg:border-r lg:border-[#F2F0F0]">
            <div class="ml-6 mt-16 mb-8 text-[20px] font-bold text-[#343434]">
                <h3 class="tracking-[8px]">{{ course.title_eng }}</h3>
            </div>

            <h4 class="text-[14px] font-semibold text-[#343434] ml-4 mb-4">Session</h4>
            <ul v-if="sessions.length > 0" class="">
                <li @click.stop="selectSession(session)" v-for="(session, index) in sessions" :key="index"
                    class="border-b ml-4 py-4 border-gray flex flex-col">
                    <a class="text-base text-[#343434] cursor-pointer hover:text-[#F94B65]" :class="[
                        viewSessionObject.type === 'session' && viewSessionObject.id === session.id ? 'text-[#F94B65]' : 'text-[#343434]'
                    ]">{{ session.title_eng }}</a>
                    <ul class="mt-2">
                        <li @click.stop="selectSubSession(subsession)" v-for="(subsession, i) in session.subsessions"
                            :class="[
                                'ml-4 flex flex-col py-4 cursor-pointer group',
                                i !== session.subsessions.length - 1 ? 'border-b border-gray' : '',
                                i == 0 ? 'border-t' : '',
                                viewSessionObject.type === 'subsession' && viewSessionObject.id === subsession.id ? 'text-[#F94B65]' : 'text-[#343434]'
                            ]">
                            <a class="text-[14px] group-hover:text-[#F94B65]">{{ subsession.title_eng
                                }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div v-else
                class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
                <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h3 class="text-gray-600 text-base md:text-[20px]">Loading ...</h3>
            </div>
        </div>

        <div ref="readView"
            class="mt-8 md:my-12 mx-4 md:mx-8 lg:mx-[96px] lg:col-span-8 overflow-y-auto hide-scrollbar">
            <div class="flex gap-4">
                <div>
                    <RouterLink to="/Strategies">
                        <!-- back icon -->
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_84_3885)">
                                <rect x="1" y="1" width="29" height="29" rx="14.5" fill="white"
                                    shape-rendering="crispEdges" />
                                <rect x="1.5" y="1.5" width="28" height="28" rx="14" stroke="#CCCCCC"
                                    shape-rendering="crispEdges" />
                                <path
                                    d="M15.5 12.4267V9.96241C15.4997 9.7721 15.4409 9.58613 15.331 9.42796C15.2211 9.26978 15.065 9.14646 14.8825 9.07355C14.7 9.00064 14.4991 8.98139 14.3052 9.01824C14.1113 9.05508 13.9331 9.14637 13.793 9.2806L7.5 15.2589L13.793 21.2363C13.8857 21.3261 13.9958 21.3973 14.1171 21.4459C14.2385 21.4945 14.3686 21.5195 14.5 21.5195C14.6314 21.5195 14.7615 21.4945 14.8829 21.4459C15.0042 21.3973 15.1143 21.3261 15.207 21.2363C15.3945 21.0558 15.4999 20.8109 15.5 20.5555V18.1586C18.25 18.224 21.255 18.7036 23.5 22V21.037C23.5 16.5754 20 12.9063 15.5 12.4267Z"
                                    fill="#343434" />
                            </g>
                            <defs>
                                <filter id="filter0_d_84_3885" x="0" y="0" width="33" height="33"
                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="1" dy="1" />
                                    <feGaussianBlur stdDeviation="1" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix"
                                        result="effect1_dropShadow_84_3885" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_84_3885"
                                        result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </RouterLink>

                </div>

                <div class="flex gap-[8px] items-center">
                    <!-- nav bar home + policies -->
                    <RouterLink to="/">
                        <div class="w-4 h-4">
                            <!-- home icon -->
                            <svg class="w-full h-full" viewBox="0 0 27 30" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M25.4667 7.40058L25.5067 7.43258C26.2227 7.98324 26.6667 8.83658 26.6667 9.77524V24.7832C26.6688 25.3799 26.5531 25.9711 26.3262 26.523C26.0993 27.0748 25.7658 27.5765 25.3446 27.9991C24.9234 28.4218 24.423 28.7572 23.8719 28.986C23.3208 29.2148 22.73 29.3326 22.1334 29.3326H4.53336C3.93669 29.3326 3.34588 29.2148 2.79483 28.986C2.24377 28.7572 1.74331 28.4218 1.32214 27.9991C0.900972 27.5765 0.567383 27.0748 0.340505 26.523C0.113626 25.9711 -0.00207767 25.3799 2.82379e-05 24.7832V9.77524C2.82379e-05 8.83658 0.444028 7.98324 1.16003 7.43258L1.19869 7.40191L11.5854 0.559245C12.0855 0.195773 12.6878 0 13.306 0C13.9243 0 14.5266 0.195773 15.0267 0.559245L25.4667 7.40058ZM10.6667 15.9992V26.6659H8.00003V15.7326C8.00003 14.4099 9.07736 13.3326 10.4 13.3326H16.2667C17.5894 13.3326 18.6667 14.4099 18.6667 15.7326V26.6659H16V15.9992H10.6667Z"
                                    fill="#343434" />
                            </svg>
                        </div>
                    </RouterLink>

                    <div class="w-4 h-4">
                        <!-- right arrow -->
                        <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.38909 0.1922C6.18752 0.1922 5.98125 0.271887 5.82656 0.426575C5.51719 0.73595 5.51719 1.2422 5.82656 1.55157L16.4156 12.1406L5.98125 22.575C5.67187 22.8844 5.67187 23.3906 5.98125 23.7C6.29062 24.0094 6.79687 24.0094 7.10625 23.7L18.1078 12.7031C18.4172 12.3938 18.4172 11.8875 18.1078 11.5781L6.95625 0.426575C6.79688 0.2672 6.59534 0.1922 6.38909 0.1922Z"
                                fill="#343434" />
                        </svg>
                    </div>

                    <div>
                        <h3 class="text-[#343434] text-[14px]">Learning</h3>
                    </div>
                </div>
            </div>


            <motion.div v-if="!viewSessionObject || !viewSessionObject.id" :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.5, ease: 'easeOut' }" class="">
                <!-- Course title -->
                <div class="mt-8 mb-4 pl-2 py-1 border-l-3 border-[#F94B65]">
                    <h1 class="text-gray-700 text-[20px] text-justify leading-[32px] font-semibold tracking-wider">
                        {{
                            course.title_eng }}</h1>
                </div>

                <!-- Number of session icon -->
                <div class="flex justify-between items-center text-sm mb-4 px-2">
                    <div class="flex gap-1 items-center text-sm align-middle">
                        <span>{{ course.sessions_count }}</span>
                        <div class="w-2 h-2 bg-[#F94B65] rounded-full">

                        </div>
                        <span>Sessions</span>
                    </div>

                    <div class="flex gap-2 mb-4 text-[#F94B65] text-small items-center font-semibold">
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_54_22271)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.76462 9.02833L7.66196 10.5L7.99996 10.5003C10.8566 10.5003 12.7663 10.4247 13.8666 10.361C14.7823 10.3083 15.5546 9.64866 15.665 8.70099C15.7516 7.95766 15.8336 6.85133 15.8336 5.33366C15.8336 3.81599 15.7513 2.70999 15.665 1.96633C15.555 1.01866 14.7823 0.358992 13.8666 0.306326C12.7663 0.242659 10.8566 0.166992 7.99996 0.166992C7.23218 0.167214 6.53162 0.172103 5.89829 0.181659C6.3393 0.469348 6.70153 0.862573 6.95211 1.32568C7.2027 1.78878 7.33372 2.30711 7.33329 2.83366C7.33329 3.45033 7.15662 4.02633 6.85162 4.51333C7.77496 4.52999 8.69329 4.56433 9.57962 4.61499C10.1093 4.64533 10.9003 4.97199 11.0946 5.86033C11.178 6.23933 11.204 6.73533 11.091 7.35366C10.94 8.17866 10.259 8.68933 9.56862 8.78299L7.76462 9.02833ZM4.16662 5.00033C3.59199 5.00033 3.04089 4.77205 2.63456 4.36572C2.22823 3.95939 1.99996 3.40829 1.99996 2.83366C1.99996 2.25902 2.22823 1.70792 2.63456 1.30159C3.04089 0.895265 3.59199 0.666992 4.16662 0.666992C4.74126 0.666992 5.29236 0.895265 5.69869 1.30159C6.10502 1.70792 6.33329 2.25902 6.33329 2.83366C6.33329 3.40829 6.10502 3.95939 5.69869 4.36572C5.29236 4.77205 4.74126 5.00033 4.16662 5.00033ZM9.52262 5.61366C7.12662 5.47599 4.49362 5.46366 2.16862 5.57699C1.50962 5.60866 0.953957 6.07966 0.840957 6.73566C0.705291 7.52266 0.541291 8.71199 0.506624 10.01C0.496957 10.376 0.741624 10.7043 1.12096 10.7557C1.26996 10.776 1.45596 10.7963 1.68362 10.8137C1.77362 10.8203 1.84162 10.8923 1.84496 10.9773L1.97029 14.361C1.99062 14.906 2.38896 15.3727 2.94396 15.431C3.04285 15.4414 3.14762 15.4512 3.25829 15.4603C3.54129 15.4837 3.77829 15.2633 3.78929 14.9853L3.90429 11.994C3.90593 11.9509 3.92421 11.9101 3.95529 11.8802C3.98637 11.8503 4.02783 11.8336 4.07096 11.8337H4.26262C4.3057 11.8336 4.34711 11.8503 4.37818 11.8801C4.40925 11.9099 4.42757 11.9506 4.42929 11.9937L4.54429 14.9903C4.54654 15.0566 4.56214 15.1218 4.59017 15.182C4.61819 15.2421 4.65806 15.296 4.70738 15.3403C4.75671 15.3847 4.81447 15.4187 4.87723 15.4402C4.93999 15.4618 5.00644 15.4704 5.07262 15.4657C5.19329 15.4561 5.30674 15.4461 5.41296 15.4357C5.95529 15.3803 6.35029 14.9333 6.38729 14.4027L6.81396 8.28266C6.81661 8.24438 6.83238 8.2082 6.85861 8.1802C6.88485 8.15221 6.91994 8.13412 6.95796 8.12899L9.43396 7.79233C9.75796 7.74833 10.045 7.51466 10.1073 7.17399C10.1983 6.67733 10.171 6.31566 10.118 6.07399C10.0523 5.77333 9.77796 5.62833 9.52262 5.61366Z"
                                        fill="#F94B65" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_54_22271">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <span>Lessons</span>
                    </div>
                </div>

                <!-- Cover image -->
                <div class="aspect-video lg:w-95 mb-4 border border-gray-300 shadow-lg rounded-lg">
                    <img :src="course.cover_url" class="w-full h-full group-hover:brightness-80 transition" alt="">
                </div>

                <!-- Sessin tag and save btn -->
                <div class="flex mb-8 justify-between items-center">
                    <div class="py-2 border-b-2 border-[#F94B65]">
                        <h3 class="text-[#4D4D4D] text-base">
                            Sessions
                        </h3>
                    </div>


                    <!-- save button -->
                    <div class="flex gap-2 px-2 py-1 items-center border border-gray-400 rounded-full">
                        <span class="text-[#4D4D4D] text-sm">Save</span>
                        <div class="w-3 h-3">
                            <svg class="w-full h-full" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.88877 7.24444V0.888889C8.88877 0.653141 8.79512 0.427048 8.62843 0.260349C8.46173 0.0936505 8.23563 0 7.99989 0C7.76414 0 7.53805 0.0936505 7.37135 0.260349C7.20465 0.427048 7.111 0.653141 7.111 0.888889V7.24444L5.13766 4.77689C5.06615 4.68169 4.97624 4.60183 4.87326 4.54205C4.77029 4.48227 4.65636 4.44379 4.53823 4.42889C4.4201 4.41398 4.30018 4.42297 4.18559 4.4553C4.07099 4.48763 3.96407 4.54266 3.87115 4.61711C3.77823 4.69157 3.70122 4.78393 3.64468 4.88872C3.58815 4.9935 3.55324 5.10858 3.54203 5.22712C3.53083 5.34566 3.54355 5.46524 3.57944 5.57877C3.61534 5.69229 3.67368 5.79745 3.751 5.888L7.30655 10.3324C7.38984 10.4363 7.49538 10.52 7.61539 10.5776C7.73539 10.6352 7.86679 10.6651 7.99989 10.6651C8.13298 10.6651 8.26438 10.6352 8.38439 10.5776C8.50439 10.52 8.60993 10.4363 8.69322 10.3324L12.2488 5.888C12.3261 5.79745 12.3844 5.69229 12.4203 5.57877C12.4562 5.46524 12.4689 5.34566 12.4577 5.22712C12.4465 5.10858 12.4116 4.9935 12.3551 4.88872C12.2986 4.78393 12.2215 4.69157 12.1286 4.61711C12.0357 4.54266 11.9288 4.48763 11.8142 4.4553C11.6996 4.42297 11.5797 4.41398 11.4615 4.42889C11.3434 4.44379 11.2295 4.48227 11.1265 4.54205C11.0235 4.60183 10.9336 4.68169 10.8621 4.77689L8.88877 7.24444Z"
                                    fill="#343434" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.91733 11.4436L3.87378 8.88892H1.77778C1.30628 8.88892 0.854097 9.07622 0.520699 9.40962C0.187301 9.74301 0 10.1952 0 10.6667V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V10.6667C16 10.1952 15.8127 9.74301 15.4793 9.40962C15.1459 9.07622 14.6937 8.88892 14.2222 8.88892H12.1262L10.0818 11.4436C9.83195 11.7558 9.51509 12.0079 9.15466 12.1811C8.79423 12.3543 8.39945 12.4443 7.99956 12.4443C7.59966 12.4443 7.20489 12.3543 6.84445 12.1811C6.48402 12.0079 6.16716 11.7558 5.91733 11.4436ZM12.4444 11.5556C12.2087 11.5556 11.9826 11.6492 11.8159 11.8159C11.6492 11.9826 11.5556 12.2087 11.5556 12.4445C11.5556 12.6802 11.6492 12.9063 11.8159 13.073C11.9826 13.2397 12.2087 13.3334 12.4444 13.3334H12.4533C12.6891 13.3334 12.9152 13.2397 13.0819 13.073C13.2486 12.9063 13.3422 12.6802 13.3422 12.4445C13.3422 12.2087 13.2486 11.9826 13.0819 11.8159C12.9152 11.6492 12.6891 11.5556 12.4533 11.5556H12.4444Z"
                                    fill="#343434" />
                            </svg>

                        </div>
                    </div>
                </div>

                <div class="flex flex-col mb-8">
                    <ul v-if="sessions.length > 0">
                        <li @click.stop="selectSession(session)" v-for="(session, index) in sessions"
                            class="flex items-center justify-between cursor-pointer  transition group py-4 gap-2 border-b-2 border-[#F94B65] border-dashed">
                            <h3 class="text-base text-gray-700 font-semiobld leading-[32px] group-hover:text-[#F94B65]">
                                {{
                                    session.title_eng }}</h3>
                            <div>
                                <svg width="12" height="20"
                                    class="stroke-gray-500 group-hover:stroke-[#F94B65] transition" viewBox="0 0 12 20"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 18L10 10L2 2" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>

                            </div>
                        </li>
                    </ul>
                    <div v-else
                        class="h-[120px] mt-[96px] flex flex-col items-center justify-center lg:col-span-12 lg:text-center">
                        <svg class="h-full animate-spin" viewBox="0 0 68 68" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M34 8.5C48.0817 8.5 59.5 19.9183 59.5 34" stroke="#F94B65" stroke-width="4"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h3 class="text-gray-600 text-base md:text-[20px]">Loading ...</h3>
                    </div>
                </div>
            </motion.div>
            <div v-else class="">
                <!-- if session or sub session is selected via side navigation or slide -->
                <ViewSession :title="title" :content="content">

                    <div class="flex justify-end gap-8 pb-4 mt-6">
                        <div @click.stop="goToPrevious"
                            class="border border-gray-300  text-gray-600 bg-white rounded-full shadow-md px-2 py-1 cursor-pointer hover:shadow-none hover:bg-gray-200 transition active:bg-gray-400 text-sm">
                            Previous
                        </div>
                        <div @click.stop="goToNext"
                            class="border border-gray-300 text-gray-600 bg-white rounded-full shadow-md px-4 py-1 cursor-pointer hover:shadow-none hover:bg-gray-200 transition active:bg-gray-400 text-sm">
                            Next
                        </div>
                    </div>
                </ViewSession>
            </div>


        </div>
        <!-- top nav bar -->

        <StickySession :viewSessionObject="viewSessionObject" :sessions="sessions" @selectSession="selectSession"
            @selectSubsession="selectSubSession">
        </StickySession>
    </div>



</template>

<script setup>
import StickySession from '@/components/StickySession.vue';
import ViewSession from '@/pages/ViewSession.vue';
import { convertJsonContent } from '@/composible/convertJsonContent';
import { converToHTML } from '@/composible/convertToHTML';
import { useStrategicStore } from '@/stores/strategicStore';
import { motion } from 'motion-v';
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';


const route = useRoute();
const sessions = ref([]);
const strategicStore = useStrategicStore();
const course = ref({});
const viewSessionObject = ref({

})
const readView = ref(null)
const title = ref("");
const content = ref("");

onMounted(async () => {
    if (strategicStore.courses.length === 0) {
        await strategicStore.fetchCourses();
    }

    if (route.params.id) {
        course.value = strategicStore.courses.find(course => {
            return course.id === parseInt(route.params.id);
        })

        await strategicStore.fetchSessionsData(route.params.id).then(async (res) => {
            if (res.status === 200) {
                const sessionsWithSubs = await Promise.all(
                    res.data.sessions.map(async (session) => {
                        let subSessions = [];

                        const subsRes = await strategicStore.fetchSubSessionsData(session.id);
                        if (subsRes.status === 200) {
                            subSessions = subsRes.data.subsessions;
                        }

                        return { ...session, subsessions: subSessions };
                    })
                );

                sessions.value = sessionsWithSubs;

            }
        });
    }
})

const selectSession = (session) => {
    viewSessionObject.value = { type: 'session', id: session.id }
}

const selectSubSession = (sub) => {


    viewSessionObject.value = { type: 'subsession', id: sub.id }
}

const goToNext = () => {
    const current = viewSessionObject.value;
    if (!current.id) return;

    // Flatten sessions + subsessions into a linear list
    const flatList = [];
    sessions.value.forEach(session => {
        flatList.push({ type: 'session', id: session.id });
        session.subsessions?.forEach(sub => {
            flatList.push({ type: 'subsession', id: sub.id });
        });
    });

    // Find current index
    const index = flatList.findIndex(item => item.type === current.type && item.id === current.id);
    if (index !== -1 && index < flatList.length - 1) {
        viewSessionObject.value = flatList[index + 1];
    }
};

const goToPrevious = () => {
    const current = viewSessionObject.value;
    if (!current.id) return;

    const flatList = [];
    sessions.value.forEach(session => {
        flatList.push({ type: 'session', id: session.id });
        session.subsessions?.forEach(sub => {
            flatList.push({ type: 'subsession', id: sub.id });
        });
    });

    const index = flatList.findIndex(item => item.type === current.type && item.id === current.id);
    if (index > 0) {
        viewSessionObject.value = flatList[index - 1];
    }
};


// script setup
watch(viewSessionObject, async (newValue, oldValue) => {


    if (newValue.type === 'subsession') {
        await strategicStore.fetchSubSession(newValue.id).then(res => {
            if (res.status === 200) {
                let subsession = res.data.subsession;
                title.value = subsession.title_eng;
                content.value = converToHTML(convertJsonContent(subsession.content_eng));
            }

        })
    } else {
        await strategicStore.fetchSession(newValue.id).then(res => {
            if (res.status === 200) {
                let session = res.data.session;
                title.value = session.title_eng;
                content.value = converToHTML(convertJsonContent(session.content_eng));
            }
        })
    }
    await nextTick() // wait until DOM updates
    if (readView.value) {
        readView.value.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

}, { deep: true })


</script>

<style scoped></style>
