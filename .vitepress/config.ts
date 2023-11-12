import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Navi Language',
  description: 'Navi is a high-performance programming language.',
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/145518894',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
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
