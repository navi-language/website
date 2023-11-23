[[toc]]

# Navi Tools

## Navi Fmt {#fmt}

Navi Fmt is a code formatter for Navi, it can format your code to a standard style.

```bash
$ navi fmt -h
Format all Navi files (*.nv)

Usage: navi fmt [OPTIONS] [ENTRY]

Arguments:
  [ENTRY]  Entry module name or a file path [default: .]

Options:
  -e, --emit <EMIT>  Emit formatted code to stdout or write to file [default: files] [possible values: files, stdout]
  -s, --stdin        Read code from stdin
  -t, --type <TYPE>  Whether to read Navi code or Navi Stream code [default: nv] [possible values: nv,nvs]
  -h, --help         Print help information
```

## VS Code

Navi has an VS Code extension, which can help you to write Navi code.

https://marketplace.visualstudio.com/items?itemName=huacnlee.navi

### Demo

![](https://assets.lbkrs.com/uploads/a74d5351-ad70-4816-bad2-23819c30f881/20230328-114253.gif)

## Navi LSP Server {#lsp}

Navi LSP Server is a [Language Server Protocol] for Navi and Navi Stream, it can be used in any IDEs that support LSP.

The `navi-lsp-server` bin is included in the release package: when you [install](/installation) Navi, you will get the `navi-lsp-server` bin.

```bash
$ navi-lsp-server &
Starting Navi LSP server
```

## GitHub Actions

We have a GitHub Action for Navi, you can use it like this:

```yaml
- uses: navi-language/setup-navi@v1
```

If you want a special Navi version:

```yml
- uses: navi-language/setup-navi@v1
  with:
    navi-version: 0.9.0
```

Visit [navi-language/setup-navi] to learn more.

[Language Server Protocol]: https://microsoft.github.io/language-server-protocol/
[navi-language/setup-navi]: https://github.com/navi-language/setup-navi
