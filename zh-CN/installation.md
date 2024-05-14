# 安装 Navi

如果你使用的是 Linux 或 macOS，你可以通过在终端中运行以下命令来安装 Navi：

```bash
curl -sSL https://navi-lang.org/install | bash
```

> 此脚本也可以用于升级 Navi 到最新版本。

安装脚本将 Navi 安装到 `~/.navi` 目录中。

并将 `~/.navi` 添加到你的 `$PATH` 环境变量中，这样你就可以直接访问 `navi` 命令。

安装成功后，你可以运行 `navi -h` 来检查是否安装成功。

```bash
$ navi -h
```

::: tip
如果找不到 `navi`，你可能需要重新启动终端以重新加载 `$PATH` 环境变量。
或者只需将 `export PATH="$HOME/.navi:$PATH"` 添加到你的 shell 配置文件中，并重新加载。
:::

## 安装特定的 Navi 版本

你可以通过将版本号传递给脚本来安装特定版本。

::: code-group

```bash [Nightly 版本]
curl -sSL https://navi-lang.org/install | bash -s -- nightly
```

```bash [特定版本]
curl -sSL https://navi-lang.org/install | bash -s -- v0.9.0-nightly
```

:::
