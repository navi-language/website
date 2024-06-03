import { Module, Type } from '../../types';

function link(text: string, href: string, opts?: { class?: string }): string {
  const classAttr = opts?.class ? ` class="${opts.class}"` : '';
  return `<a href="${href}"${classAttr}>${text}</a>`;
}

export class CodeGenerator {
  urlPrefix: '/stdlib/' | '/pkg/';
  modules: Record<string, Module> = {};

  constructor(prefix: 'stdlib' | 'pkg', modules: Record<string, Module>) {
    if (prefix === 'stdlib') {
      this.urlPrefix = '/stdlib/';
    } else {
      this.urlPrefix = '/pkg/';
    }
    this.modules = modules;
  }

  linkType(type: Type): string {
    return `<a href="/types/${type}">${type}</a>`;
  }

  moduleURL(module: string, symbol?: string, suffix?: string): string {
    let symbolSuffix = symbol ? `.${symbol}` : '';
    if (module) {
      return `${this.urlPrefix}${module}${symbolSuffix}${suffix || ''}`;
    } else {
      return `${this.urlPrefix}${symbolSuffix}${suffix || ''}`;
    }
  }

  genType(type: Type): string {
    const options = {
      class: '--code-class',
    };

    const getText = () => {
      switch (type.type) {
        case 'struct':
        case 'enum':
        case 'interface':
        case 'new_type':
          const s = `${type.module}.${type.name}`;
          switch (s) {
            case 'std.str.string':
              return {
                name: 'string',
                module: 'std.str',
                symbol: 'string',
              };
            case 'std.any.Any':
              return {
                name: 'Any',
                module: 'std.any',
                symbol: 'string',
              };
            default:
              return {
                name: type.name,
                module: type.module,
                symbol: type.name,
              };
          }
        case 'bool':
          return {
            name: 'bool',
            module: 'bool',
          };
        case 'char':
          return {
            name: 'char',
            module: 'char',
          };
        case 'float':
          return {
            name: 'float',
            module: 'float',
          };
        case 'generic':
          return `T`;
        case 'int':
          return {
            name: 'int',
            module: 'int',
          };
        case 'optional':
          return `${this.genType(type.element)}?`;
        case 'array':
          return `[${this.genType(type.element)}]`;
        case 'map':
          return `&lt;${this.genType(type.key)}, ${this.genType(
            type.value
          )}&gt;`;
        case 'channel':
          return `channel::<${this.genType(type.element)}>`;
        case 'closure':
          let args = `|(${type.arguments
            .map((t) => this.genType(t))
            .join(', ')})|`;
          let returns = type.return_type
            ? `: ${this.genType(type.return_type)}`
            : '';

          return args + returns;
        case 'union':
          return type.types.map((t) => this.genType(t)).join(' | ');
        default:
          throw `unimplemented: ${JSON.stringify(type)}`;
      }
    };

    let text = getText();
    if (typeof text === 'string') {
      return text;
    }

    return link(text.name, this.moduleURL(text.module, text.symbol), {
      class: '_nv_class',
    });
  }
}
