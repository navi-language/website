import { defineConfig } from 'vitepress';
import { naviLanguage } from './language';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Navi Language',
  description: 'Navi is a high-performance programming language.',
  cleanUrls: true,
  markdown: {
    languages: [naviLanguage],
    toc: {
      level: [2, 3, 4],
    },
  },
  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },

      {
        text: 'Install',
        link: '/installation',
      },
      { text: 'Learn', link: '/learn' },
      { text: 'Tools', link: '/tools' },
      {
        text: 'Releases',
        link: 'https://github.com/navi-language/navi/releases',
      },
    ],

    sidebar: {},

    socialLinks: [{ icon: 'github', link: 'https://github.com/navi-language' }],
  },
  head: [
    [
      'script',
      {
        src: 'https://cdn.lr-intake.com/LogRocket.min.js',
        crossorigin: 'anonymous',
      },
      '',
    ],
    [
      'script',
      {},
      `window.LogRocket && window.LogRocket.init('navi-lang/website');`,
    ],
  ],
});
