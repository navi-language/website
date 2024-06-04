import { test } from 'bun:test';
import assert from 'node:assert';
import { getTypeSign, replaceHeading } from './utils';

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
