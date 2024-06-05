import { describe, expect, test } from 'bun:test';
import { Type, TypeSymbol } from '../../types';
import { codeGenerator as generator } from './code-generator';

const assertDiff = (actual: string, expected: string) => {
  expect(expected).toEqual(actual);
};

const newTypeSymbol = (value_type: Type, options: any = {}): TypeSymbol => {
  return {
    kind: 'type',
    doc: '',
    methods: [],
    implementions: [],
    fields: [],
    generic_params: [],
    items: [],
    value_type,
    alias: false,
    ...options,
  };
};

const newStruct = (module: string, name: string): Type => {
  return {
    type: 'struct',
    module,
    name,
  };
};

const newEnum = (module: string, name: string): Type => {
  return {
    type: 'enum',
    module,
    name,
  };
};

const newInterface = (module: string, name: string): Type => {
  return {
    type: 'interface',
    module,
    name,
  };
};

const newType = (module: string, name: string): Type => {
  return {
    type: 'new_type',
    module,
    name,
  };
};

describe('genType', () => {
  test('struct', () => {
    assertDiff(
      generator.genType(newStruct('std.process', 'Command')),
      '<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );
  });

  test('enum', () => {
    assertDiff(
      generator.genType(newEnum('std.foo', 'Bar')),
      '<a href="std.foo.Bar"><span class="_nv_token_type">Bar</span></a>'
    );
  });

  test('string', () => {
    assertDiff(
      generator.genType(newStruct('std.str', 'string')),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a>'
    );
  });

  test('array', () => {
    assertDiff(
      generator.genType({
        type: 'array',
        element: newStruct('std.str', 'string'),
      }),
      '[<a href="std.str.string"><span class="_nv_token_type">string</span></a>]'
    );
  });

  test('array of struct', () => {
    assertDiff(
      generator.genType({
        type: 'array',
        element: newStruct('std.process', 'Command'),
      }),
      '[<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>]'
    );
  });

  test('map', () => {
    assertDiff(
      generator.genType({
        type: 'map',
        key: newStruct('std.str', 'string'),
        value: newStruct('std.process', 'Command'),
      }),
      '&lt;<a href="std.str.string"><span class="_nv_token_type">string</span></a>, <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>&gt;'
    );
  });

  test('union', () => {
    assertDiff(
      generator.genType({
        type: 'union',
        types: [
          newStruct('std.str', 'string'),
          newStruct('std.process', 'Command'),
        ],
      }),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a> | <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );
  });

  test('optional', () => {
    assertDiff(
      generator.genType({
        type: 'optional',
        element: newStruct('std.str', 'string'),
      }),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a>?'
    );
  });

  test('optional struct', () => {
    assertDiff(
      generator.genType({
        type: 'optional',
        element: newStruct('std.process', 'Command'),
      }),
      '<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>?'
    );
  });

  test('closure', () => {
    assertDiff(
      generator.genType({
        type: 'closure',
        arguments: [newStruct('std.str', 'string')],
        return_type: newStruct('std.process', 'Command'),
      }),
      '|(<a href="std.str.string"><span class="_nv_token_type">string</span></a>)|: <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );

    assertDiff(
      generator.genType({
        type: 'closure',
        arguments: [newStruct('std.str', 'string')],
      }),
      '|(<a href="std.str.string"><span class="_nv_token_type">string</span></a>)|'
    );
  });
});

test('genFn', () => {
  const genFn = generator.genFn.bind(generator);

  assertDiff(
    genFn('foo', {
      kind: 'function',
      arguments: [
        {
          type: 'self',
        },
      ],
      doc: '',
      generic_params: ['A', 'B'],
      id: '',
    }),
    '<span id="method.foo" /><span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <a href="#method.foo"><span class="_nv_token_fn">foo</span></a>&lt;A, B&gt;(<span class="_nv_token_self">self</span>)'
  );

  let result = genFn('foo', {
    kind: 'function',
    arguments: [
      {
        type: 'self',
      },
      {
        name: 'arg1',
        type: 'positional',
        value_type: newStruct('std.str', 'string'),
      },
      {
        name: 'arg2',
        type: 'keyword',
        value_type: {
          type: 'int',
        },
        default_value: '101',
      },
      {
        name: 'arg3',
        type: 'arbitrary',
        value_type: newStruct('std.process', 'Command'),
      },
    ],
    return_type: {
      type: 'optional',
      element: newStruct('std.process', 'Command'),
    },
    doc: '',
    generic_params: ['T'],
    id: '',
    throws: [newStruct('std.err', 'Error'), newStruct('std.err', 'IOError')],
  });

  assertDiff(
    result,
    '<span id="method.foo" /><span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <a href="#method.foo"><span class="_nv_token_fn">foo</span></a>&lt;T&gt;(<span class="_nv_token_self">self</span>, <span class="_nv_token_argument">arg1</span>: <a href="std.str.string"><span class="_nv_token_type">string</span></a>, <span class="_nv_token_argument">arg2</span>: <a href="int"><span class="_nv_token_type">int</span></a> = 101, <span class="_nv_token_argument">arg3</span>: ..<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>): <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>? <span class="_nv_token_keyword">throws</span> <a href="std.err.Error"><span class="_nv_token_type">Error</span></a>, <a href="std.err.IOError"><span class="_nv_token_type">IOError</span></a>'
  );

  result = genFn('foo', {
    kind: 'function',
    arguments: [
      {
        type: 'self',
      },
      {
        name: 'arg3',
        type: 'arbitrary',
        value_type: newStruct('std.process', 'Command'),
      },
    ],
    doc: '',
    generic_params: [],
    id: '',
    throws: [],
  });
  assertDiff(
    result,
    '<span id="method.foo" /><span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <a href="#method.foo"><span class="_nv_token_fn">foo</span></a>(<span class="_nv_token_self">self</span>, <span class="_nv_token_argument">arg3</span>: ..<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>) <span class="_nv_token_keyword">throws</span>'
  );

  assertDiff(
    genFn('foo', {
      kind: 'function',
      arguments: [
        {
          name: 'arg1',
          type: 'positional',
          value_type: newStruct('std.str', 'string'),
        },
      ],
      return_type: newStruct('std.process', 'Command'),
      doc: '',
      generic_params: ['T'],
      id: '',
    }),
    '<span id="method.foo" /><span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <a href="#method.foo"><span class="_nv_token_fn">foo</span></a>&lt;T&gt;(<span class="_nv_token_argument">arg1</span>: <a href="std.str.string"><span class="_nv_token_type">string</span></a>): <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
  );
});

test('genField', () => {
  assertDiff(
    generator.genField({
      doc: '',
      name: 'title',
      value_type: newStruct('std.str', 'string'),
    }),
    '<span id="field.title" /><a href="#field.title"><span class="_nv_token_variable">title</span></a>: <a href="std.str.string"><span class="_nv_token_type">string</span></a>'
  );
});

test('genImplFor', () => {
  expect(
    generator.genImplFor(
      newInterface('std.io', 'Read'),
      newStruct('std.io', 'File')
    )
  ).toEqual(
    '<span class="_nv_token_keyword">impl</span> <a href="std.io.Read"><span class="_nv_token_type">Read</span></a> <span class="_nv_token_keyword">for</span> <a href="std.io.File"><span class="_nv_token_type">File</span></a>'
  );
});

test('getTypeSymbolSign', () => {
  expect(
    generator.getTypeSign(
      'Command',
      newTypeSymbol(newStruct('std.process', 'Command'))
    )
  ).toEqual(
    '<span class="_nv_token_keyword">struct</span> <span class="_nv_token_type">Command</span>'
  );

  expect(
    generator.getTypeSign(
      'Command',
      newTypeSymbol(newEnum('std.process', 'Command'))
    )
  ).toEqual(
    '<span class="_nv_token_keyword">enum</span> <span class="_nv_token_type">Command</span>'
  );

  expect(
    generator.getTypeSign('Foo', newTypeSymbol(newType('std.process', 'Foo')))
  ).toEqual(
    '<span class="_nv_token_keyword">type</span> <span class="_nv_token_type">Foo</span>'
  );

  expect(
    generator.getTypeSign(
      'Foo',
      newTypeSymbol(newType('std.process', 'Foo'), { alias: true })
    )
  ).toEqual(
    '<span class="_nv_token_keyword">type alias</span> <span class="_nv_token_type">Foo</span>'
  );

  expect(
    generator.getTypeSign(
      'Foo',
      newTypeSymbol(newStruct('std.process', 'Foo'), {
        source_type: newStruct('std.process', 'Foo'),
        alias: true,
      })
    )
  ).toEqual(
    `<span class="_nv_token_keyword">type alias</span> <span class="_nv_token_type">Foo</span> = <a href="std.process.Foo"><span class="_nv_token_type">Foo</span></a>`
  );
});
