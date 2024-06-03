import { fromHighlighter } from '@shikijs/markdown-it/core';
import MarkdownIt from 'markdown-it';
import { getHighlighter } from 'shiki';

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
  themes: ['github-light', 'github-dark'],
});

await highlighter.loadLanguage(naviLanguage, naviStreamLanguage);

const shikiConfig = {
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  trimEndingNewline: true,
  defaultColor: 'light',
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
