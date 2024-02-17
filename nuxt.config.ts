import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "nuxt-graphql-client",
    "@nuxtjs/i18n",
    "nuxt-font-loader",
    "@nuxt/image",
  ],
  components: {
    dirs: [
      {
        path: "~/components/views",
        global: true,
      },
      {
        path: "~/components/blocks",
        global: true,
      },
      {
        path: "~/components/",
        global: true,
      },
    ],
  },
  vite: {
    plugins: [svgLoader()],
  },
  imports: {
    dirs: ["composables/**"],
  },
  i18n: {
    locales: [
      {
        code: "nl",
        name: "Nederlands",
      },
      {
        code: "en",
        name: "English",
        isCatchallLocale: true,
      },
      {
        code: "de",
        name: "Deutsch",
      },
      {
        code: "fr",
        name: "French",
      },
    ],
    detectBrowserLanguage: false,
    defaultLocale: "nl",
  },
  runtimeConfig: {
    craft_cms_graphql_token: "",
    public: {
      recaptcha_site_key: "",
      "graphql-client": {
        clients: {
          craft: {
            host: "will be overwritten by .env",
            tokenStorage: {
              name: "gql:craft",
            },
          },
        },
      },
    },
  },
  image: {
    domains: [process.env.CRAFT_DOMAIN || ""],
  },
  fontLoader: {
    local: [
      {
        src: "/fonts/subset-Satoshi-Regular.woff2",
        family: "Satoshi",
        weight: "400",
      },
      {
        src: "/fonts/subset-Satoshi-Medium.woff2",
        family: "Satoshi",
        weight: "500",
      },
    ],
  },
});
