export default defineNuxtConfig({
  nitro:{
    prerender: {
      autoSubfolderIndex: false
    },
    preset: 'cloudflare-pages'
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "nuxt-content-twoslash",
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
  ],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
    classSuffix: ''
  },
  site: {
    url: 'https://blog.dongsy.com.cn'
  },

  css: ['./assets/main.css', './assets/tailwind.css'],

  ui: {
    icons: ["heroicons", "lucide"],
  },

  tailwindcss: {
    viewer: false
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "zh",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
      script: [
        { src: 'https://cdn.staticfile.net/translate.js/3.5.1/translate.js' }
      ]
    },

  },

  content: {
    highlight: {
      theme: 'vitesse-light',
      langs: [
        'python',
        'bash',
        'powershell',
        'vue',
        'vue-html',
        'r',
        'shell',
        'mermaid', 'js', 'jsx', 'json', 'ts', 'tsx', 'css', 'html', 'md', 'mdc', 'yaml'
      ]
    },
  },
  mdc: {
    highlight: {
      langs: [
        'python',
        'bash',
        'powershell',
        'vue',
        'vue-html',
        'r',
        'shell',
        'mermaid', 'js', 'jsx', 'json', 'ts', 'tsx', 'css', 'html', 'md', 'mdc', 'yaml'
      ]
    }
  },

  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  build: {
    analyze: {
      filename: "stats.html"
    }
  },
  compatibilityDate: "2025-01-04"
});