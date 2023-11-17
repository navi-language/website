import { replaceHeadings } from './utils';

import fs from 'fs';
import fetch from 'node-fetch';

const targetFile = 'releases.md';
const repo = 'navi-language/navi';
const pageSize = 200;

interface Release {
  name: string;
  tag_name: string;
  html_url: string;
  body: string;
  prerelease: boolean;
}

const fetchRelease = async () => {
  const data: Release[] = (await (
    await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=${pageSize}`
    )
  ).json()) as Release[];

  let releaseBody = '# Releases\n\n';
  data.forEach((release: any) => {
    if (release.prerelease) {
      return;
    }

    let name = release.name || release.tag_name;

    releaseBody += `## [${name}](${release.html_url})\n\n`;
    let body = release.body;
    // Replace h2 with h3
    body = replaceHeadings(body || '');
    releaseBody += `${body}\n\n`;
  });
  fs.writeFileSync(targetFile, releaseBody, 'utf-8');
};

fetchRelease().then(() => {
  console.log('Generate releases success.');
});
