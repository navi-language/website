import { Module, Type } from '../../types';

function optionalType(name: string, isOptional: boolean = false): string {
  return isOptional ? `${name}?` : name;
}

function link(text: string, href: string): string {
  return `<a href="${href}">${text}</a>`;
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

  genType(type: Type, optional: boolean = false): string {
    switch (type.type) {
      case 'struct':
      case 'enum':
      case 'interface':
      case 'new_type':
        const s = `${type.module}.${type.name}`;
        switch (s) {
          case 'std.str.string':
            return link(
              optionalType('string', optional),
              this.moduleURL('std.str', 'string')
            );
          case 'std.any.Any':
            return link(
              optionalType('Any', optional),
              this.moduleURL('std.any', 'Any')
            );
          default:
            return link(
              optionalType(s, optional),
              this.moduleURL(type.module, type.name)
            );
        }
      case 'array':
        return `[${this.genType(type.element)}]`;
      case 'map':
        return `&lt;${this.genType(type.key)}, ${this.genType(type.value)}&gt;`;
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
      case 'bool':
        return link(
          optionalType('bool', optional),
          this.moduleURL('bool', 'bool')
        );
      case 'char':
        return link(
          optionalType('char', optional),
          this.moduleURL('char', 'char')
        );
      case 'float':
        return link(
          optionalType('float', optional),
          this.moduleURL('float', 'float')
        );
      case 'generic':
        return `T`;
      case 'int':
        return link(
          optionalType('int', optional),
          this.moduleURL('int', 'int')
        );
      case 'optional':
        return `${this.genType(type.element)}?`;
      case 'union':
        return type.types.map((t) => this.genType(t)).join(' | ');
      default:
        throw `unimplemented: ${JSON.stringify(type)}`;
    }
  }
}
