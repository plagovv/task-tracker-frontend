// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  appConfig: {
    appDomain: process.env.APP_DOMAIN,
    ssl: process.env.APP_SSL === "true",
  },
  app: {
    head: {
      title: "Task Tracker",
      meta: [
        { name: "description", content: "Приложение для отслеживания задач" },
      ],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "nuxt-icon-tw",
    "@pinia/nuxt",
    "dayjs-nuxt",
    "nuxt-tiptap-editor",
    "@vueuse/nuxt",
  ],
  plugins: [
    "~/plugins/axios.plugin",
    "~/plugins/apiServices.plugin",
    "~/plugins/touchEvents.plugin",
  ],
  css: ["~/assets/css/main.css"],
  // Modules Settings
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  iconTw: {
    collections: ["material-symbols", "mdi"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
});
