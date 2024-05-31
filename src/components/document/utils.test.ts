import { describe, test } from 'bun:test';
import assert from 'node:assert';
import { genFn, genType, getTypeSign, replaceHeading } from './utils';

test('replaceHeading', () => {
  let raw = '# heading 1\n\n## heading 2\n\n## heading 2.1\n\n### heading 3';

  assert.equal(
    replaceHeading(raw, 2),
    '### heading 1\n\n#### heading 2\n\n#### heading 2.1\n\n##### heading 3'
  );
  assert.equal(
    replaceHeading(raw, 3),
    '#### heading 1\n\n##### heading 2\n\n##### heading 2.1\n\n###### heading 3'
  );

  raw = '## heading 2\n\n### heading 2.1\n\n#### heading 3';

  assert.equal(
    replaceHeading(raw, 1),
    '## heading 2\n\n### heading 2.1\n\n#### heading 3'
  );
  assert.equal(
    replaceHeading(raw, 3),
    '#### heading 2\n\n##### heading 2.1\n\n###### heading 3'
  );
});

describe('genType', () => {
  test('struct', () => {
    assert.equal(
      genType({
        type: 'struct',
        module: 'std.process',
        name: 'Command',
      }),
      'std.process.Command'
    );
  });

  test('enum', () => {
    assert.equal(
      genType({
        type: 'enum',
        module: 'std.foo',
        name: 'Bar',
      }),
      'std.foo.Bar'
    );
  });

  test('string', () => {
    assert.equal(
      genType({
        type: 'struct',
        module: 'std.str',
        name: 'string',
      }),
      'string'
    );
  });

  test('array', () => {
    assert.equal(
      genType({
        type: 'array',
        element: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
      }),
      '[string]'
    );
  });

  test('array of struct', () => {
    assert.equal(
      genType({
        type: 'array',
        element: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      '[std.process.Command]'
    );
  });

  test('map', () => {
    assert.equal(
      genType({
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
      '<string, std.process.Command>'
    );
  });

  test('union', () => {
    assert.equal(
      genType({
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
      'string | std.process.Command'
    );
  });

  test('optional', () => {
    assert.equal(
      genType({
        type: 'optional',
        element: {
          type: 'struct',
          module: 'std.str',
          name: 'string',
        },
      }),
      'string?'
    );
  });

  test('optional struct', () => {
    assert.equal(
      genType({
        type: 'optional',
        element: {
          type: 'struct',
          module: 'std.process',
          name: 'Command',
        },
      }),
      'std.process.Command?'
    );
  });

  test('closure', () => {
    assert.equal(
      genType({
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
      '|(string)|: std.process.Command'
    );

    assert.equal(
      genType({
        type: 'closure',
        arguments: [
          {
            type: 'struct',
            module: 'std.str',
            name: 'string',
          },
        ],
      }),
      '|(string)|'
    );
  });
});

test('genFn', () => {
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
    'pub fn foo<A, B>(self)'
  );

  assert.equal(
    genFn('foo', {
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
    }),
    'pub fn foo<T>(self, arg1: string, arg2: int = 101, arg3: ..std.process.Command): std.process.Command? throws std.err.Error, std.err.IOError'
  );

  assert.equal(
    genFn('foo', {
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
    }),
    'pub fn foo(self, arg3: ..std.process.Command) throws'
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
    'pub fn foo<T>(arg1: string): std.process.Command'
  );
});

test('getTypeSymbolSign', () => {
  assert.equal(
    getTypeSign({ type: 'struct', module: 'std.process', name: 'Command' }),
    'struct'
  );
  assert.equal(
    getTypeSign({
      type: 'new_type',
      module: 'std.process',
      name: 'test',
    }),
    'type'
  );
  assert.equal(
    getTypeSign(
      {
        type: 'new_type',
        module: 'std.process',
        name: 'Command',
      },
      { alias: true }
    ),
    'type alias'
  );
  assert.equal(
    getTypeSign(
      {
        type: 'new_type',
        module: 'std.process',
        name: 'Command',
      },
      { alias: true }
    ),
    'type alias'
  );
});
