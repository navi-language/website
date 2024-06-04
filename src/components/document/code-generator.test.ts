import { describe, test } from 'bun:test';
import assert from 'node:assert';
import { codeGenerator as generator } from './code-generator';

describe('genType', () => {
  test('struct', () => {
    assert.equal(
      generator.genType({
        type: 'struct',
        module: 'std.process',
        name: 'Command',
      }),
      '<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );
  });

  test('enum', () => {
    assert.equal(
      generator.genType({
        type: 'enum',
        module: 'std.foo',
        name: 'Bar',
      }),
      '<a href="std.foo.Bar"><span class="_nv_token_type">Bar</span></a>'
    );
  });

  test('string', () => {
    assert.equal(
      generator.genType({
        type: 'struct',
        module: 'std.str',
        name: 'string',
      }),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a>'
    );
  });

  test('array', () => {
    assert.equal(
      generator.genType({
        type: 'array',
        element: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
      }),
      '[<a href="std.str.string"><span class="_nv_token_type">string</span></a>]'
    );
  });

  test('array of struct', () => {
    assert.equal(
      generator.genType({
        type: 'array',
        element: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      '[<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>]'
    );
  });

  test('map', () => {
    assert.equal(
      generator.genType({
        type: 'map',
        key: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
        value: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      '&lt;<a href="std.str.string"><span class="_nv_token_type">string</span></a>, <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>&gt;'
    );
  });

  test('union', () => {
    assert.equal(
      generator.genType({
        type: 'union',
        types: [
          {
            type: 'struct',
            module: 'std.str',
            name: 'string',
          },
          {
            type: 'struct',
            module: 'std.process',
            name: 'Command',
          },
        ],
      }),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a> | <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );
  });

  test('optional', () => {
    assert.equal(
      generator.genType({
        type: 'optional',
        element: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
      }),
      '<a href="std.str.string"><span class="_nv_token_type">string</span></a>?'
    );
  });

  test('optional struct', () => {
    assert.equal(
      generator.genType({
        type: 'optional',
        element: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      '<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>?'
    );
  });

  test('closure', () => {
    assert.equal(
      generator.genType({
        type: 'closure',
        arguments: [
          {
            type: 'struct',
            module: 'std.str',
            name: 'string',
          },
        ],
        return_type: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      '|(<a href="std.str.string"><span class="_nv_token_type">string</span></a>)|: <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>'
    );

    assert.equal(
      generator.genType({
        type: 'closure',
        arguments: [
          {
            type: 'struct',
            module: 'std.str',
            name: 'string',
          },
        ],
      }),
      '|(<a href="std.str.string"><span class="_nv_token_type">string</span></a>)|'
    );
  });
});

test('genFn', () => {
  const genFn = generator.genFn.bind(generator);

  assert.equal(
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
    '<span id="method.foo" /><span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <a href="#method.foo"><span class="_nv_token_fn">foo</span></a><A, B>(<span class="_nv_token_self">self</span>)'
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
        value_type: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
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
        value_type: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      },
    ],
    return_type: {
      type: 'optional',
      element: {
        type: 'struct',
        module: 'std.process',
        name: 'Command',
      },
    },
    doc: '',
    generic_params: ['T'],
    id: '',
    throws: [
      {
        type: 'struct',
        module: 'std.err',
        name: 'Error',
      },
      {
        type: 'struct',
        module: 'std.err',
        name: 'IOError',
      },
    ],
  });
  console.log(result);

  assert.equal(
    result,
    '<span class="_nv_token_keyword">pub</span> <span class="_nv_token_keyword">fn</span> <span class="_nv_token_fn">foo</span><T>(self, arg1: <a href="std.str.string"><span class="_nv_token_type">string</span></a>, arg2: <a href="int"><span class="_nv_token_type">int</span></a> = 101, arg3: ..<a href="std.process.Command"><span class="_nv_token_type">Command</span></a>): <a href="std.process.Command"><span class="_nv_token_type">Command</span></a>? throws <a href="std.err.Error"><span class="_nv_token_type">Error</span></a>, <a href="std.err.IOError"><span class="_nv_token_type">IOError</span></a>'
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
        value_type: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      },
    ],
    doc: '',
    generic_params: [],
    id: '',
    throws: [],
  });
  console.log(result);
  assert.equal(
    result,
    'pub fn foo(self, arg3: ..<a href="std.process.Command" class="_nv_class">Command</a>) throws'
  );

  assert.equal(
    genFn('foo', {
      kind: 'function',
      arguments: [
        {
          name: 'arg1',
          type: 'positional',
          value_type: {
            type: 'struct',
            module: 'std.str',
            name: 'string',
          },
        },
      ],
      return_type: {
        type: 'struct',
        module: 'std.process',
        name: 'Command',
      },
      doc: '',
      generic_params: ['T'],
      id: '',
    }),
    'pub fn foo<T>(arg1: <a href="std.str.string" class="_nv_class">string</a>): <a href="std.process.Command" class="_nv_class">Command</a>'
  );
});

test('genField', () => {
  assert.equal(
    generator.genField({
      doc: '',
      name: 'title',
      value_type: {
        type: 'struct',
        module: 'std.str',
        name: 'string',
      },
    }),
    '<span class="_nv_token_variable">title</span>: <a href="std.str.string"><span class="_nv_token_type">string</span></a>'
  );
});
