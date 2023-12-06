import { spawnSync } from 'child_process';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { Buffer as StringBuffer } from './string_buffer';
import { formatSlug, replaceHeadings } from './utils';
const repo = 'navi-language/navi';
const target = 'stdlib';

const indocHeadingLevel = 2;

interface Module {
  name: string;
  functions: [Function];
  structs: Record<string, Struct>;
}

interface Struct {
  name: string;
  properties: Record<string, Property>;
  methods: Record<string, Function>;
  doc?: string;
}

interface Property {
  name: string;
  getter: boolean;
  setter: boolean;
  doc?: string;
}

export interface Function {
  kind: 'function' | 'method';
  module: string;
  name: string;
  desc: FunctionDesc;
}

interface FunctionDesc {
  deprecated?: string;
  async: boolean;
  args: [Argument];
  returns?: [string];
  doc?: string;
  throws?: [string];
}

interface Argument {
  name: string;
  type: string;
  default_value?: string;
}

const fetchStdlibDocs = async () => {
  if (fs.existsSync('stdlib.json')) {
    console.warn('stdlib.json exists, skip download.');
    return;
  }

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

  let moduleIndex = buildModuleIndex(stdlib);
  let indexFilename = path.join(target, 'index.md');
  fs.mkdirSync(path.dirname(indexFilename), { recursive: true });
  fs.writeFileSync(indexFilename, moduleIndex);

  Object.keys(stdlib).forEach((module) => {
    let fname = module;
    if (module == '#prelude') {
      fname = 'prelude';
    }
    fname = fname.replace(/\./g, '_');
    let filename = path.join(target, fname + '.md');
    fs.mkdirSync(path.dirname(filename), { recursive: true });

    console.log('->', module);
    let body = buildBody(stdlib[module]);
    fs.writeFileSync(filename, body);
  });
};

const buildModuleIndex = (stdlib: Record<string, Module>) => {
  let buf = new StringBuffer();

  Object.keys(stdlib)
    .sort()
    .forEach((moduleName) => {
      let module = stdlib[moduleName];
      buf.write(
        `- [${module.name}](${formatSlug(module.name.replace('#', ''))}.md)`
      );
    });

  return buf.toString('\n');
};

const buildBody = (module: Module) => {
  let buf = new StringBuffer();
  let links = new StringBuffer();

  // Frontmatter
  // #prelude is a special module name
  let title = module.name.replace('#', '');
  buf.write('---');
  buf.write(`title: ${title}`);
  buf.write('editLink: false');
  buf.write('---\n');

  buf.write(`# ${module.name}\n`);

  buf.write(generateStructToc(module, module.structs));
  buf.write(generateModuleFunctionToc(module, module.functions));

  module.functions.forEach((fn) => {
    buf.write(generateFunctionDoc(fn, links));
  });

  buf.write('------------------------\n');
  buf.write(generateStructs(module, module.structs, links));

  buf.write('\n');
  buf.write(links.toString('\n'));

  return buf.toString('\n');
};

/**
 * To generate Structs Doc.
 */
const generateStructs = (
  module: Module,
  structs: Record<string, Struct>,
  links: StringBuffer
) => {
  let buf = new StringBuffer();
  Object.keys(structs)?.forEach((structName) => {
    let struct = structs[structName];
    buf.write(`## ${struct.name} {#${module.name}.${struct.name}}\n`);

    buf.write(
      struct.doc
        ? replaceHeadings(struct.doc, indocHeadingLevel) + '\n'
        : 'No documentation.\n'
    );

    if (Object.keys(struct.properties).length > 0) {
      buf.write('**Properties**\n');

      Object.keys(struct.properties)
        .sort()
        .forEach((name) => {
          let prop = struct.properties[name];

          let propSuffix: string[] = [];
          if (prop.getter && !prop.setter) {
            propSuffix.push('readonly');
          }
          if (prop.setter) {
            propSuffix.push('writable');
          }
          let propSuffixStr =
            propSuffix.length > 0 ? `\`${propSuffix.join(', ')}\` ` : '';

          let anchor = `{#${struct.name}#prop#${name}}`;

          buf.write('### ' + name + ' `prop`' + anchor + '\n');

          buf.write(propSuffixStr);

          if (prop.doc) {
            buf.write('\n');
            buf.write(
              `    ` + replaceHeadings(prop.doc, indocHeadingLevel) + '\n'
            );
          }
        });
      buf.write('\n');
    }

    buf.write('---------------------------\n');

    if (Object.keys(struct.methods).length > 0) {
      Object.keys(struct.methods)
        .sort()
        .forEach((name) => {
          let fn = struct.methods[name];
          buf.write(
            generateFunctionDoc(fn, links, {
              level: 3,
              anchorPrefix: `${struct.name}#`,
              kind: 'method',
            })
          );
        });
      buf.write('\n');
    }
  });

  return buf.toString('\n');
};

/**
 * To generate Struct Toc on module top.
 * @param module
 * @param structs
 * @returns
 */
const generateStructToc = (module: Module, structs: Record<string, Struct>) => {
  if (Object.keys(structs).length == 0) {
    return '';
  }

  let buf = new StringBuffer();

  buf.write('**Structs**\n\n');

  let structNames: string[] = [];
  Object.keys(structs)
    ?.sort()
    .forEach((structName) => {
      let struct = structs[structName];
      structNames.push(`[${struct.name}](#${module.name}.${struct.name})`);
    });
  buf.write(structNames.join(', '));
  buf.write('\n');

  return buf.toString('');
};

/**
 * To generate Function Toc on module top.
 * @param module
 * @param functions
 * @returns
 */
const generateModuleFunctionToc = (module: Module, functions: [Function]) => {
  if (!functions.length) {
    return '';
  }

  let buf = new StringBuffer();

  buf.write('**Functions**\n\n');

  let fnNames: string[] = [];
  let names = functions.map((fn) => fn.name).sort();
  names.forEach((name) => {
    fnNames.push(`[${name}](#${name})`);
  });
  buf.write(fnNames.join(', '));
  buf.write('\n');

  return buf.toString('');
};

/**
 * Generate a Function doc.
 * @param fn
 * @param links
 * @param level
 * @returns
 */
const generateFunctionDoc = (
  fn: Function,
  links: StringBuffer,
  opts: {
    level?: number;
    anchorPrefix?: string;
    /**
     * If is method generated doc will skip first argument.
     */
    kind?: 'function' | 'method';
  } = {
    level: 2,
    anchorPrefix: '',
  }
) => {
  let { level = 2, anchorPrefix, kind = 'function' } = opts;

  let buf = new StringBuffer();
  let fnSign = generateFunction(fn);

  let headingPrefix = '#'.repeat(level);

  // Write method heading
  buf.write(`${headingPrefix} ${fn.name} {#${anchorPrefix}${fn.name}}\n`);

  buf.write(`\`\`\`nv\n${fnSign}\n\`\`\`\n`);

  links.write(`[${fn.name}]: #${fn.name}`);

  if (fn.desc.deprecated) {
    buf.write('::: warning, Deprecated');
    buf.write(fn.desc.deprecated);
    buf.write(':::\n');
    buf.write('\n');
  }

  buf.write(`${replaceHeadings(fn.desc.doc, indocHeadingLevel) || 'TODO'}`);
  buf.write('\n');

  return buf.toString('\n');
};

export const generateFunction = (fn: Function): string => {
  let prefix = fn.desc.async ? 'async ' : '';
  let returns = '';
  if (fn.desc.returns) {
    if (fn.desc.returns.length > 0) {
      returns = `: ${fn.desc.returns.join(', ')}`;
    }
  }

  let args = fn.kind === 'method' ? fn.desc.args.slice(1) : fn.desc.args;
  let args_str = args
    .map((arg) => {
      let default_value = arg.default_value ? ` = ${arg.default_value}` : '';
      return `${arg.name}: ${arg.type}${default_value}`;
    })
    .join(', ');

  let throws = '';
  if (fn.desc.throws) {
    if (fn.desc.throws.length > 0) {
      throws = ` throws ${fn.desc.throws.join(', ')}`;
    } else {
      throws = ` throws`;
    }
  }

  return `${prefix}fn ${fn.name}(${args_str})${returns}${throws}`;
};

fetchStdlibDocs().then(() => {
  generateStdlibDocs();

  console.log('Stdlib docs generated.');
});
