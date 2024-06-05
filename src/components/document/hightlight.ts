import { fromHighlighter } from '@shikijs/markdown-it/core';
import MarkdownIt from 'markdown-it';
import { getHighlighter } from 'shiki';

import naviDark from '../../navi-dark.theme.json';
import naviLight from '../../navi-light.theme.json';
import naviStreamLanguageGrammar from '../../navi-stream.tmLanguage.json';
import naviLanguageGrammar from '../../navi.tmLanguage.json';

const naviLanguage: any = {
  aliases: ['navi', 'nv', 'nv,'],
  ...naviLanguageGrammar,
};

const naviStreamLanguage: any = {
  aliases: ['nvs'],
  ...naviStreamLanguageGrammar,
};

const highlighter = await getHighlighter({
  langs: ['javascript', 'json', 'bash', 'toml', 'yaml', 'plaintext', 'diff'],
  themes: [],
});

await highlighter.loadLanguage(naviLanguage, naviStreamLanguage);
await highlighter.loadTheme(naviLight as any, naviDark as any);

const shikiConfig = {
  themes: {
    light: 'navi-light',
    dark: 'navi-dark',
  },
  trimEndingNewline: true,
  cssVariablePrefix: '--shiki-',
};

/**
 * Highlight code to HTML
 * @param code
 * @param lang
 * @returns
 */
export function highlight(code: string, lang: string) {
  return highlighter.codeToHtml(code, {
    ...shikiConfig,
    lang,
    structure: 'inline',
  });
}

const md = MarkdownIt().use(fromHighlighter(highlighter, shikiConfig));

/**
 * Render Markdown to HTML
 */
export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}
