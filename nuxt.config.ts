export default defineNuxtConfig({
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
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap"
  ],
  colorMode:{
    preference:'light',
    dataValue: 'theme',
    classSuffix: ''
  },
  site: {
    url: 'https://blog.dongsy.com.cn'
  },
  css:['./assets/main.css'],

  ui: {
    icons: ["heroicons", "lucide"],
  },

  tailwindcss:{
    viewer:false
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
      script:[
        // local JS
        {src:'/translate.js'},
        {src:'https://cdn.staticfile.net/translate.js/3.5.1/translate.js'}
      ]
    },
    
  },

  content: {
    highlight: {
      theme:'vitesse-light',
    },
    markdown:{
      mdc:true,
    }
  },
  mdc:{
    highlight:{
      langs:[
        'mermaid',
        'python',
        'js',
        'ts',
        'vue',
        'html',
        'shell'
      ]
    }
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  build:{
    analyze: {
      filename: "stats.html"
    }
  },

  compatibilityDate: "2024-07-22",
});