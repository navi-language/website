import pkg from '../pkg.json';
import stdlib from '../stdlib.json';
import { Module } from './types';

/**
 * Prepare JSON
 * @param module
 * @returns
 */
const prepareLib = (modules: Record<string, Module>) => {
  for (let [name, module] of Object.entries(modules)) {
    module.id = name;

    for (let [key, symbol] of Object.entries(module.symbols)) {
      symbol.id = `${module.id}.${key}`;
    }
  }
};

const isPubModule = (module: string) => {
  return !module.startsWith('_');
};

export const stdlibModules: Record<string, Module> = {};
export const coreModules: Record<string, Module> = {};

Object.keys(stdlib.modules).forEach((name) => {
  let module: Module = stdlib.modules[name];

  if (name == '__LANG__') {
    for (let [key, symbol] of Object.entries(module.symbols)) {
      let moduleKey = key;
      if (symbol.kind == 'type') {
        moduleKey = symbol.value_type?.type || key;
      }
      coreModules[moduleKey] = coreModules[moduleKey] || {
        id: moduleKey,
        symbols: {},
      };
      coreModules[moduleKey].symbols[key] = symbol;
    }
  } else {
    if (
      !(
        name == 'std' ||
        name.startsWith('std.') ||
        name == 'test_harness' ||
        name.startsWith('lang.')
      )
    ) {
      return;
    }

    if (!isPubModule(name)) {
      return;
    }

    module.id = name;
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

prepareLib(coreModules);
prepareLib(stdlibModules);
prepareLib(pkgModules);

export const vitePressSidebars = {
  stdlib: [
    {
      text: 'core',
      link: '/stdlib/',
      items: Object.keys(coreModules)
        .sort()
        .map((name: string) => {
          const module = coreModules[name];
          return { text: name, link: `/stdlib/${module.id}` };
        }),
    },
    {
      text: 'std',
      link: '/stdlib/',
      items: Object.keys(stdlibModules)
        .sort()
        .map((name: string) => {
          const module = stdlibModules[name];
          return { text: name, link: `/stdlib/${module.id}` };
        }),
    },
  ],
  pkg: Object.keys(pkgModules)
    .sort()
    .map((name: string) => {
      const module = pkgModules[name];
      return { text: name, link: `/pkg/${module.id}` };
    }),
};
