export default {
  srcDir: "src/",
  ssr: false,

  target: 'static',

  head: {
    title: 'bilibili视频下载助手',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'bilibili视频下载助手' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'keywords', content: 'bilibili,视频,下载,免费,飞龙project,feilongproject' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '//cdn.jsdelivr.net/gh/feilongproject/bili-downloader/favicon.ico' },
    ],
    script: [{ src: "/index.js" }],
  },

  css: [
    "static/index.css",
    "element-ui/lib/theme-chalk/index.css",
  ],


  plugins: ["plugins/element-ui"],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  vendor: ["element-ui"]
}
