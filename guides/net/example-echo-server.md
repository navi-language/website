# Example: Echo Server

This example demonstrates a basic TCP echo server that binds to a local address and port, continuously accepts incoming connections, spawns a new Navi coroutine for each connection to handle reading and writing data.

Here is the overall example and we will break it down into pieces so that it is easy to understand.

```nv
use std.io.Bytes;
use std.io;
use std.net.TcpListener;

fn main() {
    let listener = try! TcpListener.bind("127.0.0.1:3000");
    loop {
        let stream = try! listener.accept();
        spawn {
            let buf = Bytes.new(len: 1024);
            loop {
                let n = try! stream.read(buf);
                if (n == 0) {
                    break;
                }
                try! stream.write_all(buf.slice(0, n));
            }
        }
    }
}
```

## Imports

`std.io.Bytes` is used for handling input/output operations. `std.net.TcpListener` is used to create a TCP server.


## Binding to an Address

```nv
let listener = try! TcpListener.bind("127.0.0.1:3000");
```

The `TcpListener.bind` method binds the TCP listener to the specified address (`127.0.0.1`) and port (`3000`). The `try!` keyword is used to handle any errors that may occur during this operation.

## Accepting Connections

```nv
loop {
    let stream = try! listener.accept();
    spawn {
        // Handling the connection
    }
}
```

The server enters an infinite loop to continuously accept incoming connections. For each accepted connection, it spawns a new Navi coroutine to handle the connection.

## Handling the Connection

```nv
spawn {
    let buf = Bytes.new(len: 1024);
    loop {
        let n = try! stream.read(buf);
        if (n == 0) {
            break;
        }
        try! stream.write_all(buf.slice(0, n));
    }
}
```

Inside the spawned thread, a buffer of 1024 bytes is created. The server then enters another loop to read data from the stream. If the read operation returns `0` bytes, the loop breaks, indicating the connection is closed. Otherwise, it prints the number of bytes read and writes the same data back to the client using stream's `write_all()` method.
