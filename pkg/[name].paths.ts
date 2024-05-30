import { pkgModules } from '../src/lib';

export default {
  paths() {
    return Object.entries(pkgModules).map(([name, module]) => {
      return { params: { name, module, modules: pkgModules } };
    });
  },
};
