import { readFileSync } from 'fs';

const naviLanguageGrammar = JSON.parse(
  readFileSync('src/navi.tmLanguage.json').toString()
);

const naviLanguage: any = {
  aliases: ['navi', 'nv'],
  ...naviLanguageGrammar,
};

const naviStreamLanguageGrammar = JSON.parse(
  readFileSync('src/navi-stream.tmLanguage.json').toString()
);

const naviStreamLanguage: any = {
  aliases: ['nvs'],
  ...naviStreamLanguageGrammar,
};

export { naviLanguage, naviStreamLanguage };
