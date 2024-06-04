import type { Field, FunctionSymbol, Type } from '../../types';

function link(text: string, href: string, opts?: { class?: string }): string {
  const classAttr = opts?.class ? ` class="${opts.class}"` : '';
  return `<a href="${href}"${classAttr}>${text}</a>`;
}

interface PrinterItem {
  toString(): string;
}

function genCodeToHTML(item: PrinterItem): string {
  return item.toString();
}

function seq(...items: PrinterItem[]): string {
  return items.map((item) => item.toString()).join('');
}

/**
 * Generate HTML with token highlighting
 * @param ty
 * @param name
 * @returns
 */
function token(
  ty: 'keyword' | 'self' | 'fn' | 'variable' | 'const' | 'type' | 'argument',
  name: string
): string {
  return `<span class="_nv_token_${ty}">${name}</span>`;
}

export class CodeGenerator {
  moduleURL(module: string, symbol?: string, suffix?: string): string {
    let symbolSuffix = symbol ? `.${symbol}` : '';
    if (module) {
      return `${module}${symbolSuffix}${suffix || ''}`;
    } else {
      return `${symbolSuffix}${suffix || ''}`;
    }
  }

  genType(type: Type): string {
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
          return seq(this.genType(type.element), '?');
        case 'array':
          return seq('[', this.genType(type.element), ']');
        case 'map':
          return seq(
            '&lt;',
            this.genType(type.key),
            ', ',
            this.genType(type.value),
            '&gt;'
          );
        case 'channel':
          return seq(
            token('keyword', 'channel'),
            '::',
            '&lt;',
            this.genType(type.element),
            '&gt;'
          );
        case 'closure':
          let args = `|(${type.arguments
            .map((t) => this.genType(t))
            .join(', ')})|`;
          let returns = type.return_type
            ? seq(': ', this.genType(type.return_type))
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

    return link(
      token('type', text.name),
      this.moduleURL(text.module, text.symbol)
    );
  }

  genFn(
    name: string,
    symbol: FunctionSymbol,
    kind: 'fn' | 'method' = 'method'
  ) {
    const args = symbol.arguments.map((arg) => {
      switch (arg.type) {
        case 'keyword':
          let defaultValue =
            arg.default_value.length > 0 ? seq(' = ', arg.default_value) : '';
          return seq(
            token('argument', arg.name),
            ': ',
            this.genType(arg.value_type),
            defaultValue
          );
        case 'self':
          return token('self', 'self');
        case 'arbitrary':
          return seq(
            token('argument', arg.name),
            ': ..',
            this.genType(arg.value_type)
          );
        default:
          return seq(
            token('argument', arg.name),
            ': ',
            this.genType(arg.value_type)
          );
      }
    });

    let throws = '';
    if (symbol.throws) {
      let throws_types = symbol.throws.map((t) => this.genType(t));
      throws = seq(' ', token('keyword', 'throws'), throws_types.join(', '));
    }

    let generics = '';
    if (symbol.generic_params && symbol.generic_params.length > 0) {
      generics = `<${symbol.generic_params.join(', ')}>`;
    }

    let return_type = symbol.return_type
      ? seq(':', ' ', this.genType(symbol.return_type))
      : '';

    const anchor = `${kind}.${name}`;
    return genCodeToHTML(
      seq(
        `<span id="${anchor}" />`,
        token('keyword', 'pub'),
        ' ',
        token('keyword', 'fn'),
        ' ',
        link(token('fn', name), `#${anchor}`),
        generics,
        '(',
        args.join(', '),
        ')',
        return_type,
        throws
      )
    );
  }

  genField(field: Field) {
    const anchor = `field.${field.name}`;
    return seq(
      `<span id="${anchor}" />`,
      link(token('variable', field.name), `#${anchor}`),
      ':',
      ' ',
      this.genType(field.value_type)
    );
  }
}

export const codeGenerator = new CodeGenerator();
