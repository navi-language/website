/*
 * Navi Doc Types
 */

export interface Module {
  doc?: string;
  symbols: Record<string, Symbol>;
}

export type Symbol = TypeSymbol | FunctionSymbol | GlobalVarSymbol;
export interface TypeSymbol {
  doc: string;
  kind: 'type';
  value_type?: Type;
  implementions: Type[];

  // for struct/enum/new_type/interface
  methods: Method[];
  // For struct
  fields: Field[];
  // For enum
  items: EnumItem[];
  // for newtype, is a `type alias`
  alias: Boolean;
  source_type?: Type;

  generic_params: string[];
}
export interface FunctionSymbol {
  doc: string;
  kind: 'function';
  arguments: Argument[];
  return_type?: Type;
  throws?: Type[];
  generic_params: string[];
}
export interface GlobalVarSymbol {
  doc: string;
  kind: 'global_var';
  is_const: boolean;
}

export interface EnumItem {
  doc: string;
  name: string;
  value?: number;
}

export interface Field {
  doc: string;
  name: string;
  value_type: Type;
  read: boolean;
  write: boolean;
}

export interface Method {
  doc: string;
  name: string;
  generic_params: string[];
  arguments: Argument[];
  return_type?: Type;
  throws?: Type[];
}

export type Argument =
  | {
      type: 'positional' | 'arbitrary';
      name: string;
      value_type: Type;
    }
  | {
      type: 'keyword';
      name: string;
      value_type: Type;
      default_value: string;
    }
  | {
      type: 'self';
    };

export type Type =
  | {
      type: 'struct' | 'enum' | 'interface' | 'new_type';
      module: string;
      name: string;
    }
  | {
      type: 'generic';
      index: number;
    }
  | {
      type: 'bool';
    }
  | {
      type: 'int';
    }
  | {
      type: 'float';
    }
  | {
      type: 'char';
    }
  | {
      type: 'array';
      element: Type;
    }
  | {
      type: 'map';
      key: Type;
      value: Type;
    }
  | {
      type: 'channel';
      element: Type;
    }
  | {
      type: 'closure';
      arguments: Type[];
      return_type: Type;
      throws?: Type[];
    }
  | {
      type: 'optional';
      element: Type;
    }
  | {
      type: 'union';
      types: Type[];
    };
