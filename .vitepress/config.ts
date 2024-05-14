import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { generateSidebar } from 'vitepress-sidebar';

import stdlib from '../stdlib.json';
import { naviLanguage, naviStreamLanguage } from './language';

const stdlibAllItems = Object.keys(stdlib).sort();
/**
 * https://github.com/jooy2/vitepress-sidebar
 */
const naviStreamSidebar = generateSidebar([
  {
    scanStartPath: 'navi-stream',
    resolvePath: '/navi-stream/',
    useTitleFromFileHeading: true,
    sortMenusByFrontmatterOrder: true,
    includeRootIndexFile: true,
  },
  {
    scanStartPath: 'zh-CN/navi-stream',
    resolvePath: '/zh-CN/navi-stream/',
    useTitleFromFileHeading: true,
    sortMenusByFrontmatterOrder: true,
    includeRootIndexFile: true,
  },
  {
    scanStartPath: 'guides',
    resolvePath: '/guides/',
    useTitleFromFileHeading: true,
    sortMenusByFrontmatterOrder: true,
    includeRootIndexFile: false,
  },
]);

const isStdlib = (module: string) => {
  return (
    module == 'lang' ||
    module == 'std' ||
    module.startsWith('std.') ||
    module.startsWith('lang.')
  );
};

const stdlibItems = stdlibAllItems.filter(isStdlib).map((module: string) => {
  if (module == '#prelude') {
    return { module, text: 'Preludo', link: '/stdlib/prelude' };
  }

  return { module, text: module, link: `/stdlib/${module}` };
});
const pkgItems = stdlibAllItems
  .filter((item) => !isStdlib(item))
  .map((module: string) => {
    return { module, text: module, link: `/pkg/${module}` };
  });

const sidebars = {
  ...naviStreamSidebar,
  '/stdlib/': stdlibItems,
  '/pkg/': pkgItems,
};

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    lang: 'en-US',
    title: 'Navi Language',
    description: 'Navi is a high-performance programming language.',
    locales: {
      root: {
        label: 'English',
        lang: 'en',
      },
      'zh-CN': {
        label: '简体中文',
        lang: 'zh-CN',
      },
    },
    cleanUrls: true,
    markdown: {
      languages: [naviLanguage, naviStreamLanguage],
      defaultHighlightLang: 'nv',
      toc: {
        level: [2, 3],
      },
    },
    ignoreDeadLinks: true,
    themeConfig: {
      editLink: {
        pattern:
          'https://github.com/navi-language/navi-language.github.io/edit/main/:path',
      },
      search: {
        provider: 'local',
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
        {
          text: 'Playground',
          link: 'https://navi-lang.org/play/',
          target: '_blank',
        },
        { text: 'Guides', link: '/guides/' },
        { text: 'Stdlib', link: '/stdlib/' },
        { text: 'Pkg', link: '/pkg/' },
        { text: 'Navi Stream', link: '/navi-stream/' },
        {
          text: 'Tools',
          items: [
            { text: 'Overview', link: '/tools' },
            {
              text: 'Editor Plugins',
              items: [
                {
                  text: 'VS Code',
                  link: 'https://marketplace.visualstudio.com/items?itemName=huacnlee.navi',
                },
                {
                  text: 'Zed',
                  link: 'https://github.com/navi-language/zed-navi',
                },
                {
                  text: 'tree-sitter-navi',
                  link: 'https://github.com/navi-language/tree-sitter-navi',
                },
              ],
            },
          ],
        },
        {
          text: 'Releases',
          link: '/releases',
        },
      ],

      sidebar: sidebars as any,

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
