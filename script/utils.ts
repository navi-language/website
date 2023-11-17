export const replaceHeadings = (body: string): string => {
  // Replace h2 with h3
  body = body.replace(/^#####/gm, '######');
  body = body.replace(/^####/gm, '#####');
  body = body.replace(/^###/gm, '####');
  body = body.replace(/^##/gm, '###');

  return body;
};
