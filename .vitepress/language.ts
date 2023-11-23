import { readFileSync } from 'fs';

const naviLanguageGrammar = JSON.parse(
  readFileSync('./.vitepress/navi.tmLanguage.json').toString()
);

const naviLanguage: any = {
  id: 'navi',
  scopeName: 'source.navi',
  grammar: naviLanguageGrammar,
  aliases: ['navi', 'nv'],
};

const naviStreamLanguageGrammar = JSON.parse(
  readFileSync('./.vitepress/navi-stream.tmLanguage.json').toString()
);

const naviStreamLanguage: any = {
  id: 'navi-stream',
  scopeName: 'source.navi-stream',
  grammar: naviStreamLanguageGrammar,
  aliases: ['nvs'],
};

export { naviLanguage, naviStreamLanguage };
