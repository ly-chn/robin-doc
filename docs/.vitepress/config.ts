import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Robin Document",
  description: "Documents for robin",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '指南', link: '/guide/' }
    ],

    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: [
          { text: '介绍', link: '/' },
          { text: '快速开始', link: '/getting-started' },
        ]
      }
    },

    footer: {
      message: "Released under the MIT License.",
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ly-chn/robin' }
    ]
  }
})
