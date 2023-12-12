# Install Navi

If you are on Linux or macOS, you can install Navi by running the following command in your terminal:

```bash
curl -sSL https://navi-lang.org/install | sh
```

> This script is also used for upgrading.

The install script will install Navi into `~/.navi`.

And then add `~/.navi` to your `$PATH` environment variable.

After installing, you can run `navi -h` to check if it is installed successfully.

```bash
$ navi -h
```

::: tip
If `navi` is not found, you may need to restart your terminal to reload the `$PATH` environment variable.
Or just add `export PATH="$HOME/.navi:$PATH"` to your shell configuration file, and source it.
:::

## Install a specific version

You can install a specific version by passing the version number to the script.

::: code-group

```bash [Latest Nightly]
# This script will install the latest nightly version.
curl -sSL https://navi-lang.org/install | sh -s -- nightly
```

```bash [Special Version]
curl -sSL https://navi-lang.org/install | sh -s -- v0.9.0-nightly
```

:::
