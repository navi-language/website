import { codeToHtml, getHighlighter } from 'shiki';
import naviStreamLanguageGrammar from '../../.vitepress/navi-stream.tmLanguage.json';
import naviLanguageGrammar from '../../.vitepress/navi.tmLanguage.json';

const naviLanguage: any = {
  aliases: ['navi', 'nv'],
  ...naviLanguageGrammar,
};

const naviStreamLanguage: any = {
  aliases: ['nvs'],
  ...naviStreamLanguageGrammar,
};

const highlighter = await getHighlighter({
  langs: ['javascript', 'json', 'bash', 'toml', 'yaml'],
  themes: ['light-plus', 'dark-plus'],
});

await highlighter.loadLanguage(naviLanguage);
await highlighter.loadLanguage(naviStreamLanguage);

/**
 * Highlight code to HTML
 * @param code
 * @param lang
 * @returns
 */
export function highlight(
  code: string,
  lang: string,
  theme_mode: 'light' | 'dark' = 'light'
) {
  return codeToHtml(code, {
    theme: theme_mode == 'light' ? 'light-plus' : 'dark-plus',
    lang,
  });
}
