import type { FunctionSymbol, Type } from '../../types';

export const genType = (type: Type): string => {
  switch (type.type) {
    case 'struct':
    case 'enum':
    case 'interface':
    case 'new_type':
      return `${type.module}.${type.name}`;
    case 'array':
      return `[${genType(type.element)}]`;
    case 'map':
      return `<${genType(type.key)}, ${genType(type.value)}>`;
    case 'channel':
      return `channel::<${genType(type.element)}>`;
    case 'closure':
      return `|(${type.arguments.map(genType).join(', ')})| -> ${genType(
        type.return_type
      )}`;
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
    throws = `throws ${symbol.throws.map((t) => genType(t)).join(', ')}`;
  }

  let return_type = symbol.return_type
    ? `: ${genType(symbol.return_type)}`
    : '';

  return `pub fn ${name}(${args.join(', ')})${return_type} ${throws}`;
};
