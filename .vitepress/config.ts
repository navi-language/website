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
    logo: 'https://avatars.githubusercontent.com/u/145518894',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Learn', link: '/learn' },
      {
        text: 'Releases',
        link: 'https://github.com/navi-language/navi/releases',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Getting Started',
        link: '/getting-started',
      },
      {
        text: 'Development Tools',
        link: '/development-tools',
      },
      {
        text: 'Language Reference',
        link: '/learn',
      },
    ],

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
