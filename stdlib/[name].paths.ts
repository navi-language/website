import stdlib from '../stdlib.json';

export default {
  paths() {
    return Object.entries(stdlib.modules).map(([name, module]) => {
      return { params: { name, module, modules: stdlib.modules } };
    });
  },
};
