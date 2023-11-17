import { defineConfig } from 'vitepress';
import stdlib from '../stdlib.json';
import { naviLanguage } from './language';

const stdlibItems = Object.keys(stdlib).map((module: any) => {
  if (module == '#prelude') {
    return { text: 'Preludo', link: '/' };
  }

  return { text: module, link: `/stdlib/${module.replace(/\./g, '_')}` };
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Navi Language',
  description: 'Navi is a high-performance programming language.',
  cleanUrls: true,
  markdown: {
    languages: [naviLanguage],
    toc: {
      level: [1, 2, 3],
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
      { text: 'Stdlib', link: '/stdlib/' },
      { text: 'Tools', link: '/tools' },
      {
        text: 'Releases',
        link: '/releases',
      },
    ],

    sidebar: {
      '/stdlib/': stdlibItems,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/navi-language' }],
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.svg',
        media: '(prefers-color-scheme: light)',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo-dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
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
      `window.LogRocket && window.LogRocket.init('navi-language/website');`,
    ],
  ],
});
