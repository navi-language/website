# Getting Started

Run `navi -h` to get help.

```bash
$ navi -h
Usage: navi [OPTIONS] [COMMAND]

Commands:
  run      Run a Navi
  test     Run Navi tests
  bench    Run Navi benchmark tests
  compile  Compile a Navi and show the bytecode
  fmt      Format all Navi files (*.nv)
  help     Print this message or the help of the given subcommand(s)

Options:
  -p, --path <PATH>  Module path
  -h, --help         Print help information
  -V, --version      Print version information
```

### Run a Navi program

You can create a file named with `.nv` extension, and write some code in it, for example a `main.nv`:

> - `.nv` is the extension of Navi source file.
> - `.nvs` is the extension of Navi Stream file.

```rust
use std.io;

fn main() {
  io.println("Hello World.");
}

test "Hello World" {
  assert 1 == 1;
}
```

Then run it by:

```bash
$ navi run
Hello world, this is Navi.

$ navi test
Testing main.nv
test main.nv . ok
All 1 tests 1 passed, 0 failed finished in 0.1s.
```
