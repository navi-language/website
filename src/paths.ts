import { Module, TypeSymbol } from '../src/types';

type Params =
  | {
      type: 'module';
      name: string;
      id: string;
      module: Module;
      modules: Record<string, Module>;
    }
  | {
      type: 'type';
      name: string;
      module: string;
      id: string;
      symbol: TypeSymbol;
      modules: Record<string, Module>;
    };

export const generatePaths = (allModules: Record<string, Module>) => {
  return {
    paths() {
      const results: { params: Params }[] = [];

      for (const [id, module] of Object.entries(allModules)) {
        const symbols = module.symbols;
        results.push({
          params: {
            type: 'module',
            id,
            name: id,
            module,
            modules: allModules,
          },
        });

        const module_id = id;
        for (const [symbol_name, symbol] of Object.entries(symbols)) {
          if (symbol.kind === 'type') {
            results.push({
              params: {
                type: 'type',
                id: `${module_id}.${symbol_name}`,
                module: module_id,
                name: symbol_name,
                symbol,
                modules: allModules,
              },
            });
          }
        }
      }

      return results;
    },
  };
};
