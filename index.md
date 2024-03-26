---
layout: home
hero:
  name: Navi
  text: A high-performance programming language.
  image:
    light: /logo.svg
    dark: /logo-dark.svg
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /learn
    - theme: alt
      text: View on GitHub
      link: https://github.com/navi-language/navi
features:
  - title: Simple and Clean Syntax
    details: Designed with a straightforward and clean syntax.
  - title: Modern Optional-Type and Error-Handling Design
    details: With a modern design of optional types and error handling, Navi allows developers to gracefully manage exceptional cases and abnormal data.
  - title: No NULL Pointer Panic, Safe Runtime
    details: No NULL pointer exceptions. Once your code compiles, you can expect consistent and reliable execution.
---

## Install Navi

Run the following command in your terminal:

```sh
curl -sSL https://navi-lang.org/install | bash
```

## Quick Start

The following `main.nv` is a simple "Hello, World!" program in Navi:

```nv
use std.io;

fn main() throws {
    io.println("Hello, World!");
}
```

Run the program with the following command:

```sh
$ navi run
```

[Continue learning](/learn) about Navi.
