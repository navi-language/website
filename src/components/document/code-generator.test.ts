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
      'std.process.Command'
    );
  });

  test('enum', () => {
    assert.equal(
      generator.genType({
        type: 'enum',
        module: 'std.foo',
        name: 'Bar',
      }),
      'std.foo.Bar'
    );
  });

  test('string', () => {
    assert.equal(
      generator.genType({
        type: 'struct',
        module: 'std.str',
        name: 'string',
      }),
      'string'
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
      '[string]'
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
      '[std.process.Command]'
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
      '<string, std.process.Command>'
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
      'string | std.process.Command'
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
      'string?'
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
      'std.process.Command?'
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
      '|(string)|: std.process.Command'
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
      '|(string)|'
    );
  });
});
