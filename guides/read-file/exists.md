# Check if a file exists

The [fs.exists](/stdlib/std.fs#exists) function is used to check if a file exists, the first argument is a string of the file path.

## Navi Code

```nv,no_run
use std.fs;

fn main() {
    if (fs.exists("path/to/file.txt")) {
        println("File exists");
    } else {
        println("File does not exist");
    }
}
```
