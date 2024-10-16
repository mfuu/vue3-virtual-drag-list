import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const VirtualList = (await import('../../../src/index')).default;
      app.component('virtual-list', VirtualList);
    }
    app.component('demo-preview', ElementPlusContainer);
  },
};
