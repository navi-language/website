import { test } from 'bun:test';
import assert from 'node:assert';
import { replaceHeading } from './utils';

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
