import { describe, test } from 'bun:test';
import assert from 'node:assert';
import { CodeGenerator } from './code-generator';

describe('genType', () => {
  const generator = new CodeGenerator('stdlib', {});

  test('struct', () => {
    assert.equal(
      generator.genType({
        type: 'struct',
        module: 'std.process',
        name: 'Command',
      }),
      '<a href="/stdlib/std.process.Command" class="_nv_class">Command</a>'
    );
  });

  test('enum', () => {
    assert.equal(
      generator.genType({
        type: 'enum',
        module: 'std.foo',
        name: 'Bar',
      }),
      '<a href="/stdlib/std.foo.Bar" class="_nv_class">Bar</a>'
    );
  });

  test('string', () => {
    assert.equal(
      generator.genType({
        type: 'struct',
        module: 'std.str',
        name: 'string',
      }),
      '<a href="/stdlib/std.str.string" class="_nv_class">string</a>'
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
      '[<a href="/stdlib/std.str.string" class="_nv_class">string</a>]'
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
      '[<a href="/stdlib/std.process.Command" class="_nv_class">Command</a>]'
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
      '&lt;<a href="/stdlib/std.str.string" class="_nv_class">string</a>, <a href="/stdlib/std.process.Command" class="_nv_class">Command</a>&gt;'
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
      '<a href="/stdlib/std.str.string" class="_nv_class">string</a> | <a href="/stdlib/std.process.Command" class="_nv_class">Command</a>'
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
      '<a href="/stdlib/std.str.string" class="_nv_class">string</a>?'
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
      '<a href="/stdlib/std.process.Command" class="_nv_class">Command</a>?'
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
      '|(<a href="/stdlib/std.str.string" class="_nv_class">string</a>)|: <a href="/stdlib/std.process.Command" class="_nv_class">Command</a>'
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
      '|(<a href="/stdlib/std.str.string" class="_nv_class">string</a>)|'
    );
  });
});
