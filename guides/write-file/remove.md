# Delete a file or directory

The [fs.remove_file](/stdlib/std.fs#remove_file) function is used to delete a file, the first argument is a string of the file path.

And the [fs.remove_dir](/stdlib/std.fs#remove_dir) function for use to delete a directory. [fs.remove_dir_all](/stdlib/std.fs#remove_dir_all) for delete a directory and all its sub-directories and files.

```nv, no_run
use std.fs;

fn main() throws {
    try fs.remove_file("path/to/file.txt");
    try fs.remove_dir("path/to/directory");
    try fs.remove_dir_all("path/to/directory");
}
```
