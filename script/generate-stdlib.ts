import { spawnSync } from 'child_process';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { Buffer as StringBuffer } from './string_buffer';
const repo = 'navi-language/navi';
const target = 'stdlib';

interface Module {
  name: string;
  functions: [Function];
  structs: [Struct];
}

interface Struct {
  name: string;
  properties: Record<string, Property>;
  methods: Record<string, Function>;
}

interface Property {
  name: string;
  getter: boolean;
  setter: boolean;
}

interface Function {
  kind: 'function' | 'method';
  module: string;
  name: string;
  desc: FunctionDesc;
}

interface FunctionDesc {
  deprecated: boolean;
  async: boolean;
  args: [Argument];
  return?: [string];
  doc?: string;
}

interface Argument {
  name: string;
  type: string;
  default_value?: string;
}

const fetchStdlibDocs = async () => {
  // Download navi-docs.tar.gz from GitHub latest release
  // Unarchive it and parse stdlib.json to generate stdlib.md
  const data: any = await (
    await fetch(`https://api.github.com/repos/${repo}/releases/latest`)
  ).json();

  const asset = data.assets.find(
    (asset: any) => asset.name === 'navi-docs.tar.gz'
  );
  if (!asset) {
    console.error(JSON.stringify(data, null, 2));
    throw new Error('Cannot find navi-docs.tar.gz');
  }
  const url = asset.browser_download_url;
  console.log('Fetch stdlib docs from', url);
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  const tar = spawnSync('tar', ['xzf', '-'], {
    input: Buffer.from(buffer),
    stdio: 'inherit',
  });
  if (tar.error || tar.status !== 0) {
    throw tar;
  }
};

const generateStdlibDocs = () => {
  const stdlib = JSON.parse(fs.readFileSync('stdlib.json', 'utf-8'));

  console.log("Generating stdlib docs to 'stdlib/'");
  console.log('Total modules:', Object.keys(stdlib).length);

  Object.keys(stdlib).forEach((module) => {
    let fname = module;
    if (module == '#prelude') {
      fname = 'index';
    }
    fname = fname.replace(/\./g, '_');
    let filename = path.join(target, fname + '.md');
    fs.mkdirSync(path.dirname(filename), { recursive: true });

    console.log('->', module);
    let body = buildBody(stdlib[module]);
    fs.writeFileSync(filename, body);
  });
};

const buildBody = (module: Module) => {
  let buf = new StringBuffer();
  let links = new StringBuffer();

  // Frontmatter
  buf.write('---');
  buf.write(`title: ${module.name}`);
  buf.write('---\n');

  buf.write('[[toc]]\n');

  buf.write(`# ${module.name}\n`);

  module.functions.forEach((fn) => {
    let prefix = fn.desc.async ? 'async ' : '';
    let returns = fn.desc.return ? `: ${fn.desc.return.join(', ')}` : '';
    let args = fn.desc.args
      .map((arg) => {
        let default_value = arg.default_value ? ` = ${arg.default_value}` : '';
        return `${arg.name}: ${arg.type}${default_value}`;
      })
      .join(', ');

    buf.write(`## ${fn.name}\n`);
    buf.write(`\`${prefix}fn ${fn.name}(${args})${returns}\`\n`);

    links.write(`[${fn.name}]: #${fn.name}`);

    if (fn.desc.deprecated) {
      buf.write('::: warning\nDeprecated.\n:::');
      buf.write('\n');
    }

    buf.write(`${fn.desc.doc || 'TODO'}`);
    buf.write('\n');
  });

  buf.write('\n');
  buf.write(links.toString('\n'));

  return buf.toString('\n');
};

fetchStdlibDocs().then(() => {
  generateStdlibDocs();

  console.log('Stdlib docs generated.');
});
