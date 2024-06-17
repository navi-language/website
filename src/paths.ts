import { Module, Params, Symbol } from "../src/types";

const titleFor = (prefix: string, name: string): string => {
  return `${name} - ${prefix} docs`;
};

export const generatePaths = (
  prefix: "stdlib" | "pkg",
  allModules: Record<string, Module | Symbol>,
) => {
  return {
    paths() {
      const results: { params: Params }[] = [];

      for (const [name, module] of Object.entries(allModules)) {
        if ("symbols" in module) {
          const module_name = name;

          const symbols = module.symbols;
          results.push({
            params: {
              type: "module",
              id: module.id,
              title: titleFor(prefix, module_name),
              name: module_name,
              module,
            },
          });

          for (const [symbol_name, symbol] of Object.entries(symbols)) {
            if (symbol.kind === "type") {
              results.push({
                params: {
                  type: "type",
                  id: symbol.id || "",
                  title: titleFor(prefix, `${module_name}.${symbol_name}`),
                  module: module_name,
                  name: symbol_name,
                  symbol,
                },
              });
            }
          }
        } else {
          const symbol = module;
          if (symbol.kind === "type") {
            results.push({
              params: {
                type: "type",
                id: symbol.id || "",
                title: titleFor(prefix, `${name}`),
                module: "",
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
