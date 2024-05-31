import { pkgModules } from '../src/doc-json';

export default {
  paths() {
    return Object.entries(pkgModules).map(([name, module]) => {
      return { params: { name, module, modules: pkgModules } };
    });
  },
};
