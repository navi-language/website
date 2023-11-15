# Install Navi

If you are on Linux or macOS, you can install Navi by running the following command in your terminal:

```bash
curl -sSL https://navi-lang.org/install | sh
```

> This script is also used for upgrading.

## Install a specific version

You can install a specific version by passing the version number to the script.

```bash
curl -sSL https://navi-lang.org/install | sh -s -- v0.9.0-nightly
```

## Install a nightly version

This script will install the latest nightly version.

```bash
curl -sSL https://navi-lang.org/install | sh -s -- nightly
```

## Use for GitHub Actions

We have a GitHub Action for Navi, you can use it like this:

```yaml
- uses: navi-language/setup-navi@v1
```

If you wants special a Navi version:

```
- uses: navi-language/setup-navi@v1
  with:
    navi-version: 0.9.0-nightly
```
