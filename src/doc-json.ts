import pkg from '../pkg.json';
import stdlib from '../stdlib.json';
import { Module } from './types';

const isPubModule = (module: string) => {
  return !module.startsWith('_');
};

export const stdlibModules = {};
export const coreModules = {};

Object.keys(stdlib.modules).forEach((name) => {
  let module: Module = stdlib.modules[name];

  if (name == '__LANG__') {
    for (let [key, symbol] of Object.entries(module.symbols)) {
      const symbols = {};
      symbols[key] = symbol;
      coreModules[key] = {
        symbols,
      };
    }
  } else {
    if (
      !(
        name == 'std' ||
        name.startsWith('std.') ||
        name == 'test_harness' ||
        name.startsWith('lang.') ||
        isPubModule(name)
      )
    ) {
      return;
    }

    stdlibModules[name] = module;
  }
});

export const pkgModules = {};
Object.keys(pkg.modules)
  .filter((name) => {
    return (
      isPubModule(name) &&
      !(name.startsWith('std.') || name.startsWith('test_harness'))
    );
  })
  .forEach((name) => {
    let module: Module = pkg.modules[name];
    pkgModules[name] = module;
  });

export const vitePressSidebars = {
  stdlib: [
    {
      text: 'Core',
      link: '/stdlib/',
      items: Object.keys(coreModules).map((module: string) => {
        return { module, text: module, link: `/stdlib/${module}` };
      }),
    },
    {
      text: 'Std',
      link: '/stdlib/',
      items: Object.keys(stdlibModules).map((module: string) => {
        return { module, text: module, link: `/stdlib/${module}` };
      }),
    },
  ],
  pkg: Object.keys(pkgModules).map((module: string) => {
    return { module, text: module, link: `/pkg/${module}` };
  }),
};
