import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  ssr: false,
  vite: {
    plugins: [nodePolyfills()],
  },
})