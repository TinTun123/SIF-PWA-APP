<template>

    <div class="flex flex-row gap-4">
        <div class="flex-2 overflow-y-hidden">
            <div class="flex justify-between">
                <h2 class="text-lg font-semibold">Manage Videos</h2>
                <div>
                    <!-- Playlists select -->
                    <select v-model="selectedPlayList">
                        <option disabled value="">Select playlist</option>
                        <option v-for="playlistName in playLists" :key="playlistName" :value="playlistName">
                            {{ playlistName }}
                        </option>
                    </select>
                </div>
            </div>


            <!-- Need to make this grid scrollable when exceed to flex box -->
            <div class="grid grid-cols-12 gap-2 overflow-y-auto pr-2" style="max-height: 60vh;">
                <!-- video tumbnails -->

                <div @click.stop="selectVideo(vid)" v-for="(vid, index) in renderViedo" :key="index"
                    class="col-span-6 relative cursor-pointer rounded-lg bg-white shadow-xl transition hover:brightness-70">
                    <div @click.stop="deleteVideo(vid.id)"
                        class="absolute top-0 right-0 bg-[#F94B65] hover:bg-[#F94B65]/80 transition flex items-center rounded-lg gap-2 px-2 py-1">
                        <span class="text-white text-sm font-semibold">Delete</span>
                        <div class="w-4 h-4">
                            <svg class="w-full h-full" viewBox="0 0 18 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4C18 4.26522 17.8946 4.51957 17.7071 4.70711C17.5196 4.89464 17.2652 5 17 5H16L15.997 5.071L15.064 18.142C15.0281 18.6466 14.8023 19.1188 14.4321 19.4636C14.0619 19.8083 13.5749 20 13.069 20H4.93C4.42414 20 3.93707 19.8083 3.56688 19.4636C3.1967 19.1188 2.97092 18.6466 2.935 18.142L2.002 5.072L2 5H1C0.734784 5 0.48043 4.89464 0.292893 4.70711C0.105357 4.51957 0 4.26522 0 4C0 3.73478 0.105357 3.48043 0.292893 3.29289C0.48043 3.10536 0.734784 3 1 3H17ZM11 0C11.2652 0 11.5196 0.105357 11.7071 0.292893C11.8946 0.48043 12 0.734784 12 1C12 1.26522 11.8946 1.51957 11.7071 1.70711C11.5196 1.89464 11.2652 2 11 2H7C6.73478 2 6.48043 1.89464 6.29289 1.70711C6.10536 1.51957 6 1.26522 6 1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0H11Z"
                                    fill="white" />
                            </svg>
                        </div>
                    </div>
                    <img :src="vid.thumbnail" class="w-full h-full rounded-lg" alt="">
                </div>
            </div>

        </div>
        <div class="flex-1">
            <h3 class="text-base text-gray-600 font-semibold mb-4">New video</h3>
            <!-- Playlist input -->
            <input v-model="playlist" type="text" placeholder="Enter playlist name"
                class="border rounded-lg px-3 py-2 mb-4 w-full" />

            <!-- Hidden file input -->
            <input ref="fileInput" type="file" accept="video/*" class="hidden" @change="handleFileChange" />

            <!-- Step 1: Choose file -->
            <div v-if="!selectedFile" class="flex flex-col items-center space-y-3">
                <button @click="triggerFileInput" class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Select Video
                </button>
            </div>

            <!-- Step 2: Show selected file -->
            <div v-else class="mt-4 border rounded-lg p-4 bg-gray-50">
                <p class="font-medium text-gray-700 mb-2">
                    Selected: <span class="font-semibold">{{ selectedFile.name }}</span>
                </p>

                <!-- Optional video preview -->
                <video v-if="previewUrl" :src="previewUrl" controls class="w-[80%] rounded-lg mb-3"></video>

                <div class="flex space-x-3">
                    <button @click="removeSelected"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-lg" :disabled="loading">
                        Remove
                    </button>

                    <button @click="uploadVideo"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg disabled:opacity-50"
                        :disabled="loading">
                        {{ loading ? 'Uploading...' : 'Upload' }}
                    </button>
                </div>

                <div v-if="progress > 0" class="mt-3 text-sm text-gray-600">
                    Uploading: {{ progress }}%
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref, render, toRaw } from 'vue'
import { axiosClient } from '@/axios' // make sure this exists

const videos = ref([]);
const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)
const loading = ref(false)
const progress = ref(0)
const playlist = ref('')
const playLists = ref([])
const selectedPlayList = ref("");


const emits = defineEmits(['selectvid']);

function selectVideo(vid) {

    emits('selectvid', toRaw(vid));

}

function triggerFileInput() {
    fileInput.value?.click()
}

const renderViedo = computed(() => {
    return videos.value.filter(vid => {
        return vid.playlist === selectedPlayList.value;
    })
})

function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
}

function removeSelected() {
    selectedFile.value = null
    previewUrl.value = null
    progress.value = 0
    if (fileInput.value) fileInput.value.value = ''
}

async function deleteVideo(id) {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
        await axiosClient.delete(`/videos/${id}`).then(res => {
            if (res.status === 200) {
                videos.value = videos.value.filter(vid => {

                    return vid.id !== id;
                })
            }
        });
        // Refresh list or remove from UI
    } catch (err) {
        console.error(err);
        alert('Failed to delete video.');
    }
}

async function uploadVideo() {
    if (!selectedFile.value) {
        alert('Please select a video first.')
        return
    }

    try {
        loading.value = true
        progress.value = 0

        const formData = new FormData()
        formData.append('video', selectedFile.value)
        formData.append('playlist', playlist.value || 'default')

        const response = await axiosClient.post('/videos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (event) => {
                if (event.total) {
                    progress.value = Math.round((event.loaded * 100) / event.total)
                }
            },
        })

        if (response.status === 200) {
            videos.value.push(response.data.video);

            if (!playLists.value.includes(response.data.video.playlist)) {
                playLists.value.push(response.data.video.playlist);
            }

            if (selectedPlayList.value !== response.data.video.playlist) {
                selectedPlayList.value = response.data.video.playlist;
            }
        }

        // reset UI
        removeSelected()
        playlist.value = ''
    } catch (error) {
        console.error('Upload error:', error)
        alert('Failed to upload video.')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    try {
        const res = await axiosClient.get('/videos')

        if (res.status === 200 && res.data?.data) {
            // store all videos
            videos.value = res.data.data

            // extract unique playlist names
            const allPlaylists = res.data.data
                .map(v => v.playlist)
                .filter(p => p && p.trim() !== '') // remove null/empty

            // unique using Set
            playLists.value = [...new Set(allPlaylists)]
        }
    } catch (error) {
        console.error('Error fetching videos:', error)
    }
})
</script>
