# Read a file as stream

The `File.read` method is used to read a file in stream mode. The first argument accpets a `std.io.Bytes` as a buffer to store the read data.

You must special each read operation to handle the buffer size and the read data. For example 1024 bytes buffer size, and read until the end of the file.

Every call `read` method it will return the actual read bytes length, if it's 0, it means the end of the file. So you can use it to break the loop.

## Navi Code

```nv, no_run
use std.fs.File;
use std.io.Bytes;

fn main() throws {
    let file = try File.open("path/to/file.txt");

    loop {
        let chunk = Bytes.new(len: 1024);
        // Read 1024 bytes to chunk, if the end of the file, it will return 0
        if (try file.read(chunk) == 0) {
            break;
        }

        // Do something with buf
        print(chunk.to_string());
    }
}
```
