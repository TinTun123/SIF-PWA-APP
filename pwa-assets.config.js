import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: minimal2023Preset,
  headLinkOptions: {
    preset: "2023",
    // you can customize <link> rels in <head>
  },
  images: [
    "public/sif-icon.svg", // main logo source
  ],
  favicons: true,
  maskable: true,
  apple: true,
  splashScreens: true,
  shortcuts: true,
});
