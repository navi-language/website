# Rename a file

The [fs.rename](/stdlib/std.fs#rename) function is used to rename a file.

This is more like the `mv` command in Unix-like systems.

The first argument is a string of the source file path, and the second argument is a string of the destination file path.

```nv, no_run
use std.fs;

fn main() throws {
    try fs.rename("path/to/source.txt", "path/to/destination.txt");
}
```
