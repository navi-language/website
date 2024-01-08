import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { generateSidebar } from 'vitepress-sidebar';

import stdlib from '../stdlib.json';
import { naviLanguage, naviStreamLanguage } from './language';

/**
 * https://github.com/jooy2/vitepress-sidebar
 */
const naviStreamSidebar = generateSidebar({
  scanStartPath: 'navi-stream',
  resolvePath: '/navi-stream/',
  useTitleFromFileHeading: true,
  sortMenusByFrontmatterOrder: true,
  includeRootIndexFile: true,
});

const stdlibItems = Object.keys(stdlib)
  .sort()
  .map((module: string) => {
    if (module == '#prelude') {
      return { text: 'Preludo', link: '/stdlib/prelude' };
    }

    return { text: module, link: `/stdlib/${module.replace(/\./g, '_')}` };
  });

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    lang: 'en-US',
    title: 'Navi Language',
    description: 'Navi is a high-performance programming language.',
    cleanUrls: true,
    markdown: {
      languages: [naviLanguage, naviStreamLanguage],
      defaultHighlightLang: 'navi',
      toc: {
        level: [2, 3],
      },
    },
    ignoreDeadLinks: true,
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/navi-language/website/edit/main/:path',
      },
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      outline: [2, 3],
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: 'Install',
          link: '/installation',
        },
        { text: 'Learn', link: '/learn' },
        { text: 'Stdlib', link: '/stdlib/' },
        { text: 'Navi Stream', link: '/navi-stream/' },
        { text: 'Tools', link: '/tools' },
        {
          text: 'Releases',
          link: '/releases',
        },
      ],

      sidebar: {
        '/stdlib/': stdlibItems,
        '/navi-stream/': [
          {
            base: '/navi-stream/',
            items: naviStreamSidebar as any,
          },
        ],
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/navi-language' },
      ],
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
    ],
  })
);
