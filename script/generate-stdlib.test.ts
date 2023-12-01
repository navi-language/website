import { expect, test } from 'bun:test';
import { Function, generateFunction } from './generate-stdlib';

test('generateFunction', () => {
  let fn: Function = {
    kind: 'function',
    name: 'say_name',
    desc: {
      doc: 'Say hello to name.',
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'suffix',
          type: 'string',
          default_value: '"!"',
        },
      ] as any,
      return: ['string'],
      deprecated: true,
      async: true,
    },
    module: '',
  };

  expect(generateFunction(fn)).toEqual(
    `async fn say_name(name: string, suffix: string = "!"): string`
  );
  fn.desc.async = false;
  fn.desc.throws = [] as any;

  expect(generateFunction(fn)).toEqual(
    `fn say_name(name: string, suffix: string = "!"): string throws`
  );

  fn.desc.throws = ['Error1', 'Error2'] as any;
  fn.desc.return = [] as any;

  expect(generateFunction(fn)).toEqual(
    `fn say_name(name: string, suffix: string = "!") throws Error1, Error2`
  );
});
