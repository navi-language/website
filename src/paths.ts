import { Module, Params, Symbol } from '../src/types';

export const generatePaths = (allModules: Record<string, Module | Symbol>) => {
  return {
    paths() {
      const results: { params: Params }[] = [];

      for (const [name, module] of Object.entries(allModules)) {
        if ('symbols' in module) {
          const module_name = name;

          const symbols = module.symbols;
          results.push({
            params: {
              type: 'module',
              id: module.id,
              name: module_name,
              module,
            },
          });

          for (const [symbol_name, symbol] of Object.entries(symbols)) {
            if (symbol.kind === 'type') {
              results.push({
                params: {
                  type: 'type',
                  id: symbol.id || '',
                  module: module_name,
                  name: symbol_name,
                  symbol,
                },
              });
            }
          }
        } else {
          const symbol = module;
          if (symbol.kind === 'type') {
            results.push({
              params: {
                type: 'type',
                id: symbol.id || '',
                module: '',
                name: name,
                symbol,
              },
            });
          }
        }
      }

      return results;
    },
  };
};
