import { expect, test } from 'bun:test';
import { formatFilename } from './doc-json';

test('formatFilename', () => {
  expect(formatFilename('foo')).toEqual('foo');
  expect(formatFilename('T?')).toEqual('optional');
  expect(formatFilename('<K, V>')).toEqual('<K, V>');
  expect(formatFilename('base64')).toEqual('base64');
});
