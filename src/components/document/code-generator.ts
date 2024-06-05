import type { Field, FunctionSymbol, Type, TypeSymbol } from '../../types';
import { escape } from '../../utils';

/**
 * Escape HTML
 * @param text
 * @returns
 */
function h(text: string): string {
  return escape(text);
}

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
  return `<span class="_nv_token_${ty}">${h(name)}</span>`;
}

function span(text: string): string {
  return h(text);
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

  /**
   * Get the name for a `type`
   * @param type
   * @param param1
   * @returns
   */
  getTypeSign(name: string, symbol: TypeSymbol): string {
    if (!symbol.kind) {
      return '';
    }

    const sign = () => {
      switch (symbol.kind) {
        case 'type':
          if (symbol.value_type?.type == 'new_type' || symbol.source_type) {
            if (symbol.alias) {
              return 'type alias';
            }

            return 'type';
          }

          return symbol.value_type?.type || 'type';

        default:
          return symbol.kind;
      }
    };

    let suffix = '';
    if (symbol.source_type) {
      suffix = seq(` `, `=`, ` `, this.genType(symbol.source_type));
    }

    return seq(token('keyword', sign()), ' ', token('type', name), suffix);
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
          return seq(this.genType(type.element), span('?'));
        case 'array':
          return seq(span('['), this.genType(type.element), span(']'));
        case 'map':
          return seq(
            span('<'),
            this.genType(type.key),
            span(', '),
            this.genType(type.value),
            span('>')
          );
        case 'channel':
          return seq(
            token('keyword', 'channel'),
            span('::'),
            span('<'),
            this.genType(type.element),
            span('>')
          );
        case 'closure':
          let args = `|(${type.arguments
            .map((t) => this.genType(t))
            .join(span(', '))})|`;
          let returns = type.return_type
            ? seq(span(': '), this.genType(type.return_type))
            : '';

          return args + returns;
        case 'union':
          return type.types.map((t) => this.genType(t)).join(span(' | '));
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
            span(': '),
            this.genType(arg.value_type),
            defaultValue
          );
        case 'self':
          return token('self', 'self');
        case 'arbitrary':
          return seq(
            token('argument', arg.name),
            span(': ..'),
            this.genType(arg.value_type)
          );
        default:
          return seq(
            token('argument', arg.name),
            span(': '),
            this.genType(arg.value_type)
          );
      }
    });

    let throws = '';
    if (symbol.throws) {
      let throws_types = symbol.throws.map((t) => this.genType(t));
      throws = seq(
        span(' '),
        token('keyword', 'throws'),
        throws_types.length > 0 ? span(' ') : '',
        throws_types.join(span(', '))
      );
    }

    let generics = '';
    if (symbol.generic_params && symbol.generic_params.length > 0) {
      generics = seq(
        span('<'),
        symbol.generic_params.join(span(', ')),
        span('>')
      );
    }

    let return_type = symbol.return_type
      ? seq(span(':'), span(' '), this.genType(symbol.return_type))
      : '';

    const anchor = `${kind}.${name}`;
    return genCodeToHTML(
      seq(
        `<span id="${anchor}" />`,
        token('keyword', 'pub'),
        span(' '),
        token('keyword', 'fn'),
        span(' '),
        link(token('fn', name), `#${anchor}`),
        generics,
        span('('),
        args.join(span(', ')),
        span(')'),
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
      span(': '),
      this.genType(field.value_type)
    );
  }

  genImplFor(interface_: Type, for_: Type) {
    return seq(
      token('keyword', 'impl'),
      span(' '),
      this.genType(interface_),
      span(' '),
      token('keyword', 'for'),
      span(' '),
      this.genType(for_)
    );
  }

  genImplementations(impls: Type[]): string {
    return impls.map((impl) => this.genType(impl)).join(span(', '));
  }
}

export const codeGenerator = new CodeGenerator();
