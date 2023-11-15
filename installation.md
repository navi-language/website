# Install Navi

If you are on Linux or macOS, you can install Navi by running the following command in your terminal:

```bash
curl -sSL https://navi-lang.org/install | sh
```

> This script is also used for upgrading.

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
