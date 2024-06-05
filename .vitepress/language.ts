import { readFileSync } from 'fs';

const naviLanguageGrammar = JSON.parse(
  readFileSync('src/navi.tmLanguage.json').toString()
);
const naviStreamLanguageGrammar = JSON.parse(
  readFileSync('src/navi-stream.tmLanguage.json').toString()
);

const naviLightTheme = JSON.parse(
  readFileSync('src/navi-light.theme.json').toString()
);
const naviDarkTheme = JSON.parse(
  readFileSync('src/navi-dark.theme.json').toString()
);

const naviLanguage: any = {
  aliases: ['navi', 'nv'],
  ...naviLanguageGrammar,
};

const naviStreamLanguage: any = {
  aliases: ['nvs'],
  ...naviStreamLanguageGrammar,
};

export { naviDarkTheme, naviLanguage, naviLightTheme, naviStreamLanguage };
