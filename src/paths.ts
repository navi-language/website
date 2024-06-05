import { Module, Symbol, TypeSymbol } from '../src/types';

const formatFilename = (name: string) => {
  return name.replace(/[^a-zA-Z0-9\-_\.:\[\]<>]/g, '');
};

type Params =
  | {
      type: 'module';
      name: string;
      id: string;
      module: Module;
    }
  | {
      type: 'type';
      name: string;
      module: string;
      id: string;
      symbol: TypeSymbol;
    };

export const generatePaths = (allModules: Record<string, Module | Symbol>) => {
  return {
    paths() {
      const results: { params: Params }[] = [];

      for (const [name, module] of Object.entries(allModules)) {
        if ('symbols' in module) {
          const module_id = formatFilename(name);
          const module_name = name;

          const symbols = module.symbols;
          results.push({
            params: {
              type: 'module',
              id: module_id,
              name: module_name,
              module,
            },
          });

          for (const [symbol_name, symbol] of Object.entries(symbols)) {
            if (symbol.kind === 'type') {
              results.push({
                params: {
                  type: 'type',
                  id: formatFilename(`${module_id}.${symbol_name}`),
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
                id: formatFilename(name),
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
