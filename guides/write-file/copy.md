# Copy a file

The [fs.copy](/stdlib/std.fs#copy) function is used to copy a file from one location to another, the first argument is a string of the source file path, and the second argument is a string of the destination file path.

If the destination file exists, it will **overwrite** the file.

::: info
The `fs.copy` function is only used to copy a **file** or a **symlink**.
:::

```nv, no_run
use std.fs;

fn main() throws {
    try fs.copy("path/to/source.txt", "path/to/destination.txt");
}
```

## Link a file

We have [fs.link](/stdlib/std.fs#link) method to create a hard link to a file, and [fs.symlink](/stdlib/std.fs#symlink) method to create a symbolic link to a file.

```nv, no_run
use std.fs;

fn main() throws {
    try fs.link("path/to/source.txt", "path/to/destination.txt");
    try fs.symlink("path/to/source.txt", "path/to/destination.txt");
}
```

You also can use [fs.readlink](/stdlib/std.fs#readlink) method to read the target of a symbolic link, this will return the string path of the link source.

```nv, no_run
use std.fs;

fn main() throws {
    try fs.symlink("path/to/source.txt", "path/to/destination.txt");
    let target = try fs.readlink("path/to/destination.txt");
    println(target);
    // Output: path/to/source.txt
}
```

And the [fs.unlink](/stdlib/std.fs#unlink) method to remove a link.

> Actually, the `fs.unlink` is a alias of `fs.remove_file`.
