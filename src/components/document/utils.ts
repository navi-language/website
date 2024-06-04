import type { Type } from '../../types';

/**
 * Get the name for a `type`
 * @param type
 * @param param1
 * @returns
 */
export const getTypeSign = (
  type?: Type,
  opts?: {
    alias?: boolean;
  }
): string => {
  const { alias } = opts || {};
  if (!type) {
    return '';
  }

  switch (type.type) {
    case 'new_type':
      if (alias) {
        return 'type alias';
      }
      return 'type';
    default:
      return type.type;
  }
};

/**
 * Replace all headings in a markdown document with headings of a different level.
 * @param markdown
 * @param rootLevel
 */
export const replaceHeading = (body: string, level: number = 2) => {
  if (!body) {
    return '';
  }

  // Get the root heading level in the body
  let allHeadings = body.match(/^(#+)/gm);
  if (!allHeadings) {
    return body;
  }

  let rootLevel = 0;
  for (let heading of allHeadings) {
    let indentLevel = heading.length;
    if (indentLevel < rootLevel || rootLevel == 0) {
      rootLevel = indentLevel;
    }
  }

  let offsetLevel = level + 1 - rootLevel;
  let result = body.replace(/^(#+)/gm, (match, p1) => {
    let indentLevel = p1.length + offsetLevel;
    return match.replace(p1, '#'.repeat(indentLevel));
  });

  return result;
};
