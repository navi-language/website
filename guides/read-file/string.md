# Read a file to string

The `fs.read_to_string` function is used to read a file and return a `string`.

## Navi Code

```nv, no_run
use std.fs;

fn main() throws {
    let content = try fs.read_to_string("path/to/file.txt");
}
```
