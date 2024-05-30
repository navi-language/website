import { coreModules, stdlibModules } from '../src/doc-json';

const allModules = { ...coreModules, ...stdlibModules };

export default {
  paths() {
    return Object.entries(allModules).map(([name, module]) => {
      return { params: { name, module, modules: allModules } };
    });
  },
};
