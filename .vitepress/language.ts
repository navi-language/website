import { readFileSync } from 'fs';

const naviLanguageGrammar = JSON.parse(
  readFileSync('./.vitepress/navi.tmLanguage.json').toString()
);

const naviLanguage: any = {
  id: 'naviLanguage',
  scopeName: 'source.navi',
  grammar: naviLanguageGrammar,
  aliases: ['navi', 'nv'],
};

export { naviLanguage };
