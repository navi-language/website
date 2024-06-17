import pkg from "../pkg.json";
import stdlib from "../stdlib.json";
import type { Module, Symbol } from "./types";
import { escape } from "./utils";

export const formatFilename = (name: string) => {
  if (name === "T?") {
    return "optional";
  }

  return name.replace(/[^a-zA-Z0-9\-_ ,\.:\[\]<>]/g, "");
};

const isPubModule = (module: string) => {
  return !module.startsWith("_");
};

export const stdlibModules: Record<string, Module> = {};
export const coreModules: Record<string, Symbol> = {};

const prepareSymbols = (
  symbols: Record<string, Symbol>,
  module_id?: string,
) => {
  for (let [key, symbol] of Object.entries(symbols)) {
    if (module_id) {
      symbol.id = `${module_id}.${formatFilename(key)}`;
    } else {
      symbol.id = formatFilename(key);
    }
  }
};

Object.keys(stdlib.modules).forEach((name) => {
  let module: Module = stdlib.modules[name];

  if (name == "__LANG__") {
    for (let [name, symbol] of Object.entries(module.symbols)) {
      symbol.id = formatFilename(name);
      coreModules[name] = symbol;
    }
  } else {
    if (
      !(
        name == "std" ||
        name.startsWith("std.") ||
        name == "test_harness" ||
        name.startsWith("lang.")
      )
    ) {
      return;
    }

    if (!isPubModule(name)) {
      return;
    }

    module.id = formatFilename(name);
    module.basePath = "/stdlib/";
    prepareSymbols(module.symbols, module.id);
    stdlibModules[name] = module;
  }
});

export const pkgModules = {};
Object.keys(pkg.modules)
  .filter((name) => {
    return (
      isPubModule(name) &&
      !(name.startsWith("std.") || name.startsWith("test_harness"))
    );
  })
  .forEach((name) => {
    let module: Module = pkg.modules[name];
    module.id = formatFilename(name);
    module.basePath = "/pkg/";

    prepareSymbols(module.symbols, module.id);
    pkgModules[name] = module;
  });

export const vitePressSidebars = {
  stdlib: [
    {
      text: "core",
      link: "/stdlib/",
      items: Object.keys(coreModules)
        .sort()
        .map((name: string) => {
          const symbol = coreModules[name];
          return { text: escape(name), link: `/stdlib/${symbol.id}` };
        }),
    },
    {
      text: "std",
      link: "/stdlib/",
      items: Object.keys(stdlibModules)
        .sort()
        .map((name: string) => {
          const module = stdlibModules[name];
          return { text: escape(name), link: `/stdlib/${module.id}` };
        }),
    },
  ],
  pkg: Object.keys(pkgModules)
    .sort()
    .map((name: string) => {
      const module = pkgModules[name];
      return { text: escape(name), link: `/pkg/${module.id}` };
    }),
};
