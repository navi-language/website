[[toc]]

# Navi Tools

## Cli Commands

Navi has a command line tool `navi`, you can use it to run, test, and benchmark your Navi code.

Use `navi -h` to see the help.

### navi run

Use `navi run` to run a Navi file, default it will run `main.nv` in the current directory.

```shell
$ navi run
```

Or you can pass a file name to run it.

```shell
$ navi run main.nv
```

Or use `-s` to run a script.

```shell
navi run -s 'use std.io; io.println("Hello World!");'
```

### navi test

Use `navi test` to run tests in a Navi file, default it will run all tests (\*_/_.{nv,nvs}) in the current directory.

```shell
$ navi test
```

Or you can pass a file name to run it.

```shell
$ navi test foo/bar.nv
```

### navi bench

Use `navi bench` to run benchmarks in a Navi file, default it will run all benchmarks (\*.{nv,nvs}) in the current directory.

::: warning
Unlike `navi test`, `navi bench` will not iter all subdirectories, it will only run benchmarks in the current directory.
:::

```shell
$ navi bench
```

Or you can pass a file name to run it.

```shell
$ navi bench foo/bar.nv
```

### navi fmt {#fmt}

`navi fmt` is a code formatter for Navi, it can format your code to a standard style.

```bash
$ navi fmt -h
Format all Navi files (*.nv)

Usage: navi fmt [OPTIONS] [INPUT]

Arguments:
  [INPUT]  File (.nv) or path to format [default: .]

Options:
  -e, --emit <EMIT>  Emit formatted code to stdout or write to file [default: files] [possible values: files, stdout]
  -s, --stdin        Read code from stdin
  -t, --type <TYPE>  Whether to read Navi code or Navi Stream code [default: nv] [possible values: nv, nvs]
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
