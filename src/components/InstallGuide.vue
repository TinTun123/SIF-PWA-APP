<template>
    <div @click="installOrRenderInstruct()"
        class="text-white flex gap-2 px-2 py-1 rounded-l-lg fixed right-0 bottom-4 border border-white cursor-pointer hover:bg-gray-900 active:bg-gray-700 transition z-999">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="white"
                    d="m11.4 19l4.35-8.5h-3V5l-4.5 8.5h3.15zm.6 3q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
            </svg>
        </div>
        <span class="text-sm font-semibold">Install App</span>
    </div>

    <TeleportModal myClass="m-0 p-0 bg-none h-[80%] flex items-center justify-center" :show="open"
        @close="open = false">
        <!-- <div v-else-if="browser === 'safari'" class="p-4">
            <h2 class="text-white text-lg font-semibold mb-2">Install this app on Safari</h2>
            <p class="text-gray-300 mb-4">Follow these simple steps to install the PWA on your iPhone or iPad.</p>

            <div class="flex flex-col md:flex-row gap-4 items-start">
              
                <div class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                    <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                        <li>
                            Open this site in <strong>Safari</strong> (other browsers on iOS don’t support
                            installation).
                        </li>
                        <li>
                            Tap the <strong>Share</strong> icon
                            <span class="inline-block align-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4m0 0L8 6m4-4v12" />
                                </svg>
                            </span>
                            at the bottom of your screen.
                        </li>
                        <li>Scroll down and tap <strong>“Add to Home Screen”</strong>.</li>
                        <li>Confirm by tapping <strong>Add</strong> in the top-right corner.</li>
                        <li>The app will now appear on your home screen like a native app 🎉</li>
                    </ol>
                </div>

               
                <div class="relative w-full md:w-1/2 flex justify-center">
                    <div
                        class="relative border-8 border-gray-800 rounded-[2rem] overflow-hidden shadow-lg max-w-[280px]">
                        <video src="" autoplay muted loop playsinline class="w-full h-auto object-cover"></video>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div v-else-if="browser === 'firefox'" class="p-4">
            <h2 class="text-white text-lg font-semibold mb-2">Install on Firefox (Android)</h2>
            <p class="text-gray-300 mb-4">Follow these simple steps to install the PWA on your firefox browser.</p>

            <div class="flex flex-col md:flex-row gap-4 items-start">
                <div class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                    <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                        <li>Tap the <strong>three dots</strong> ⋮ in the top-right corner.</li>
                        <li>Choose <strong>“Install”</strong> or <strong>“Add to Home Screen”</strong>.</li>
                        <li>Confirm the prompt to install the PWA.</li>
                        <li>Now you can launch the app directly from your home screen 🎉</li>
                    </ol>
                </div>

                <div class="relative w-full md:w-1/2 flex justify-center">
                    <div class="relative border-8 border-gray-800 rounded-2xl overflow-hidden shadow-lg max-w-[280px]">
                        <video src="" autoplay muted loop playsinline class="w-full h-auto object-cover"></video>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- Safari / iOS instruction -->
        <div v-if="platformBrowser.browser === 'safari'">
            <div v-if="platformBrowser.platform === 'ios'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-white text-lg font-semibold mb-2">Install on iPhone / iPad (Safari)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Open this website in <strong>Safari</strong> on your iPhone or iPad.</li>
                    <li>Tap the <strong>Share</strong> icon (the square with an arrow) at the bottom of the screen.</li>
                    <li>Scroll the share sheet and tap <strong>“Add to Home Screen”</strong>.</li>
                    <li>Optionally edit the name shown on the home screen, then tap <strong>Add</strong> in the
                        top-right corner.</li>
                    <li>The app icon will appear on your home screen — tap it to open the PWA in standalone mode.</li>
                </ol>
            </div>

            <!-- Safari / macOS instruction -->
            <div v-else-if="platformBrowser.platform === 'macos'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-white text-lg font-semibold mb-2">Install on macOS (Safari)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Open this website in <strong>Safari</strong> on your Mac.</li>
                    <li>Make sure the page is the active tab, then open the menu bar.</li>
                    <li>Look for <strong>File → Add to Dock</strong> (or a similar “Add to Dock / Add to Applications”
                        option) and select it.</li>
                    <li>If your Safari version does not show that menu item, you can create an app-like shortcut by
                        dragging the URL from the address bar to the right side of the Dock (near the Trash / folders)
                        or use a lightweight helper app (e.g., a site-specific browser tool) to create a standalone
                        shortcut.</li>
                    <li>Open the app/shortcut from the Dock or Applications folder — the site will launch like a native
                        app.</li>
                </ol>
            </div>
        </div>

        <!-- Chrome on IOS instruction -->
        <div v-else-if="platformBrowser.browser === 'chrome' && platformBrowser.platform === 'ios'"
            class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
            <h3 class="text-white text-lg font-semibold mb-2">Install on iPhone / iPad (Chrome)</h3>
            <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                <li>Unfortunately, Chrome on iOS does not currently support “Add to Home Screen.”</li>
                <li>To install the app, please open the same link in <strong>Safari</strong> and follow the iOS Safari
                    steps above.</li>
            </ol>
        </div>

        <!-- Firefox instruction -->
        <div v-else-if="platformBrowser.browser === 'firefox'" class="text-white">

            <div v-if="platformBrowser.platform === 'windows'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-lg font-semibold mb-2">Install on Windows (Firefox)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Click the <strong>three-bar menu</strong> (☰) at the top-right corner of the browser window.
                    </li>
                    <li>Choose <strong>“Save Page As…”</strong> → <strong>Desktop</strong> to create a shortcut.</li>
                    <li>Alternatively, visit this site in <strong>Chrome or Edge</strong> to install the full PWA
                        version.</li>
                </ol>
            </div>
            <div v-else-if="platformBrowser.platform === 'macos'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-lg font-semibold mb-2">Install on macOS (Firefox)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Click the <strong>File</strong> menu → <strong>Save Page As…</strong> and save it to your
                        Desktop or Applications folder.</li>
                    <li>Double-click the saved shortcut to reopen the site quickly.</li>
                    <li>For a full app-like experience, use <strong>Safari</strong> and select <strong>File → Add to
                            Dock</strong>.</li>
                </ol>
            </div>
            <div v-else-if="platformBrowser.platform === 'android'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-lg font-semibold mb-2">Install on Android (Firefox)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Tap the <strong>three-dot menu</strong> in the bottom-right corner.</li>
                    <li>Select <strong>Install</strong> or <strong>Add to Home Screen</strong>.</li>
                    <li>Confirm when prompted — the app icon will appear on your home screen.</li>
                </ol>
            </div>
            <div v-else-if="platformBrowser.platform === 'ios'"
                class="bg-white/10 p-4 rounded-lg border border-white/20 w-full md:w-1/2 backdrop-blur-md">
                <h3 class="text-lg font-semibold mb-2">Install on iPhone / iPad (Firefox)</h3>
                <ol class="list-decimal pl-5 space-y-2 text-gray-200">
                    <li>Unfortunatly, Firefox on iOS does not support direct installation of PWAs.</li>
                    <li>To install, please reopen this site in <strong>Safari</strong> and follow the Safari steps
                        above.</li>
                </ol>
            </div>
        </div>
    </TeleportModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TeleportModal from "./TeleportModal.vue";

const open = ref(false);
const platformBrowser = ref({
    browser: '',
    platform: '',
});
const canInstall = ref(false);
let deferredPrompt = null;

onMounted(() => {
    // Detect browser type
    const ua = navigator.userAgent.toLowerCase();

    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    const isMacOS = /macintosh|mac os x/.test(ua);
    const isWindows = /windows/.test(ua);

    const isSafari = /^((?!chrome|crios|fxios).)*safari/i.test(navigator.userAgent);
    const isChrome = /chrome|crios/.test(ua) && !isIOS;
    const isFirefox = /firefox|fxios/.test(ua);

    if (isSafari) platformBrowser.value.browser = 'safari';
    else if (isChrome) platformBrowser.value.browser = 'chrome';
    else if (isFirefox) platformBrowser.value.browser = 'firefox';

    if (isIOS) platformBrowser.value.platform = 'ios';
    else if (isAndroid) platformBrowser.value.platform = 'android';
    else if (isMacOS) platformBrowser.value.platform = 'macos';
    else if (isWindows) platformBrowser.value.platform = 'windows';

    // Listen for PWA install prompt (Chrome / Edge)
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        canInstall.value = true;
    });

    // Handle when app is installed
    window.addEventListener("appinstalled", () => {
        canInstall.value = false;
        deferredPrompt = null;
        alert("✅ App installed");
    });
});

async function installApp() {

    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    deferredPrompt = null;
    canInstall.value = false;
}

function installOrRenderInstruct() {
    console.log(platformBrowser.value.browser, platformBrowser.value.platform);

    if (platformBrowser.value.browser === 'chrome' &&
        (platformBrowser.value.platform === 'android' || platformBrowser.value.platform === 'macos' || platformBrowser.value.platform === 'windows')) {
        installApp();
    } else {
        open.value = true;
    }
}
</script>