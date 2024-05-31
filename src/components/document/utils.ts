import type { Field, FunctionSymbol, Type } from '../../types';

export const genType = (type: Type): string => {
  switch (type.type) {
    case 'struct':
    case 'enum':
    case 'interface':
    case 'new_type':
      const s = `${type.module}.${type.name}`;
      switch (s) {
        case 'std.str.string':
          return 'string';
        case 'std.any.Any':
          return 'Any';
        default:
          return s;
      }
    case 'array':
      return `[${genType(type.element)}]`;
    case 'map':
      return `<${genType(type.key)}, ${genType(type.value)}>`;
    case 'channel':
      return `channel::<${genType(type.element)}>`;
    case 'closure':
      let args = `|(${type.arguments.map(genType).join(', ')})|`;
      let returns = type.return_type ? `: ${genType(type.return_type)}` : '';

      return args + returns;
    case 'bool':
      return 'bool';
    case 'char':
      return 'char';
    case 'float':
      return 'float';
    case 'generic':
      return `T`;
    case 'int':
      return 'int';
    case 'optional':
      return `${genType(type.element)}?`;
    case 'union':
      return type.types.map(genType).join(' | ');
    default:
      throw `unimplemented: ${JSON.stringify(type)}`;
  }
};

/**
 * Generate Function Signature
 * @param name
 * @param symbol
 * @returns String
 */
export const genFn = (name: String, symbol: FunctionSymbol) => {
  const args = symbol.arguments.map((arg) => {
    switch (arg.type) {
      case 'keyword':
        let defaultValue =
          arg.default_value.length > 0 ? ` = ${arg.default_value}` : '';
        return `${arg.name}: ${genType(arg.value_type)}${defaultValue}`;
      case 'self':
        return 'self';
      case 'arbitrary':
        return `${arg.name}: ..${genType(arg.value_type)}`;
      default:
        return `${arg.name}: ${genType(arg.value_type)}`;
    }
  });

  let throws = '';
  if (symbol.throws) {
    let throws_types = symbol.throws.map((t) => genType(t));
    if (throws_types.length > 0) {
      throws = ` throws ${throws_types.join(', ')}`;
    } else {
      throws = ' throws';
    }
  }

  let generics = '';
  if (symbol.generic_params && symbol.generic_params.length > 0) {
    generics = `<${symbol.generic_params.join(', ')}>`;
  }

  let return_type = symbol.return_type
    ? `: ${genType(symbol.return_type)}`
    : '';

  return `pub fn ${name}${generics}(${args.join(', ')})${return_type}${throws}`;
};

/**
 * Generate Field Signature
 */
export const genField = (name: string, field: Field) => {
  return `${name}: ${genType(field.value_type)}`;
};

/**
 * Replace all headings in a markdown document with headings of a different level.
 * @param markdown
 * @param rootLevel
 */
export const replaceHeading = (body: string, level: number = 2) => {
  if (!body) {
    return '';
  }

  // Get the root heading level in the body
  let allHeadings = body.match(/^(#+)/gm);
  if (!allHeadings) {
    return body;
  }

  let rootLevel = 0;
  for (let heading of allHeadings) {
    let indentLevel = heading.length;
    if (indentLevel < rootLevel || rootLevel == 0) {
      rootLevel = indentLevel;
    }
  }

  let offsetLevel = level + 1 - rootLevel;
  let result = body.replace(/^(#+)/gm, (match, p1) => {
    let indentLevel = p1.length + offsetLevel;
    return match.replace(p1, '#'.repeat(indentLevel));
  });

  return result;
};
