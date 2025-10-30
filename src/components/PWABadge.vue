<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// check for updates every hour
const period = 60 * 60 * 1000
const swActivated = ref(false)


// 🟩 Detect installability
const canInstall = ref(false)
let deferredPrompt = null

function handleBeforeInstallPrompt(e) {
  // Stop automatic mini-infobar prompt
  e.preventDefault()
  deferredPrompt = e
  canInstall.value = true
}

async function installApp() {
  if (!deferredPrompt) return
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  console.log(`PWA install: ${outcome}`)
  deferredPrompt = null
  canInstall.value = false
}

function handleAppInstalled() {
  canInstall.value = false
  deferredPrompt = null
  alert("Offline App was installed to your home screen!")
}

// onMounted(() => {
//   window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
//   window.addEventListener('appinstalled', handleAppInstalled)
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
//   window.removeEventListener('appinstalled', handleAppInstalled)
// })



// existing SW registration logic
function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return
    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })
    if (resp?.status === 200) await r.update()
  }, period)
}

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {

    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    } else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        const sw = e.target
        swActivated.value = sw.state === 'activated'
        if (swActivated.value) registerPeriodicSync(swUrl, r)
      })
    }
  },
})

const title = computed(() => {
  if (offlineReady.value) return 'App ready for offline usage'
  if (needRefresh.value) return 'New content available, please reload.'
  return ''
})

function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <!-- Normal PWA toast -->
  <transition name="fade">
    <div v-if="needRefresh" class="pwa-toast z-999" aria-labelledby="toast-message" role="alert">
      <div class="message">
        <span id="toast-message" style="color: gray;">
          {{ title }}
        </span>
      </div>
      <div class="buttons">
        <button v-if="needRefresh" type="button" class="reload text-sm" @click="updateServiceWorker()">
          Reload
        </button>
        <button type="button" @click="close">Close</button>
      </div>
    </div>
  </transition>

  <!-- <transition name="fade">
    <div v-if="canInstall" class="fixed bottom-6 right-6 z-[9999]">
      <button @click="installApp"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition">
        Install App
      </button>
    </div>
  </transition> -->

</template>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 999;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  display: grid;
  background-color: #fff;
}

.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast .buttons {
  display: flex;
}

.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}

.pwa-toast button.reload {
  display: block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
