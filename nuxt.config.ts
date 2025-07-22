// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
  ],
  runtimeConfig: {
    cognito_clientId: process.env.COGNITO_CLIENT_ID,
    callback_secret_token: process.env.CALLBACK_SECRET_TOKEN,
    public: {
      presignedUrlApiUrl: '',
    },
  },
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
  },
});
