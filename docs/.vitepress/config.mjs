import { defineConfig } from 'vitepress';
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';

export default defineConfig({
  base: '/vue3-virtual-drag-list/',
  lang: 'en-US',
  title: 'vue3-virtual-drag-list',
  description: 'A virtual scrolling list component that can be sorted by dragging',

  themeConfig: {
    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/mfuu/vue-virtual-drag-list' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} mfuu`,
    },

    nav: [
      {
        text: 'Guide',
        link: '/guide/install',
        activeMatch: '/guide/',
      },
      {
        text: 'Demo',
        link: '/demo/basic',
        activeMatch: '/demo/',
      },
    ],

    sidebar: {
      '/guide/': {
        base: '/guide/',
        items: [
          { text: 'Start', link: 'install' },
          { text: 'Emits', link: 'emits' },
          { text: 'Props', link: 'props' },
          { text: 'Methods', link: 'methods' },
        ],
      },
      '/demo/': {
        base: '/demo/',
        items: [
          { text: 'Basic', link: 'basic' },
          { text: 'Group', link: 'group' },
          { text: 'Infinity', link: 'infinity' },
          { text: 'Horizontal', link: 'horizontal' },
          { text: 'ScrollTo', link: 'scrollto' },
          { text: 'Scroller', link: 'scroller' },
          { text: 'TableMode', link: 'table' },
        ],
      },
    },
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[!!code/g, '[!code');
        },
      },
    ],
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
