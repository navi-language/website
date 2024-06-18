# Example: Echo Server

This example demonstrates a basic TCP echo server that binds to a local address and port, continuously accepts incoming connections, spawns a new Navi coroutine for each connection to handle reading and writing data.

Here is the overall example and we will break it down into pieces so that it is easy to understand.

```nv
use std.{env, io.{self, Bytes}, net.{http.{Client, Request}, TcpListener}, process};

fn main() {
    let jj = env.get("jj");
    let listener = try! TcpListener.bind("127.0.0.1:0");
    io.println(`listening on ${try! listener.local_addr()}`);
    let will_exit = channel::<bool>();
    spawn {
        loop {
            let stream = try! listener.accept();
            io.println(`stream.remote_addr() = ${stream.remote_addr()}`);
            spawn {
                let buf = Bytes.new(len: 1024);
                loop {
                    let n = try! stream.read(buf);
                    if (n == 0) {
                        break;
                    } else {
                        io.println(`read ${n}`);
                    }
                    try! stream.write_all(buf.slice(0, n));
                    io.println(`written ${n}`);
                    process.exit(0); // only for the demo
                }
            }
        }
    }
    let client = Client.new(timeout: 15.seconds(), redirect: 5, user_agent: "navi-client");
    let url = `http://${try! listener.local_addr()}`;
    let req = Request.new(method: "GET", url:);
    let res = try! client.execute(req);
    println(try! res.text());
}
```

## Imports

`std.io.Bytes` is used for handling input/output operations. `std.net.TcpListener` is used to create a TCP server.

## Binding to an Address

```nv,ignore
let listener = try! TcpListener.bind("127.0.0.1:3000");
```

The `TcpListener.bind` method binds the TCP listener to the specified address (`127.0.0.1`) and port (`3000`). The `try!` keyword is used to handle any errors that may occur during this operation.

## Accepting Connections

```nv,ignore
loop {
    let stream = try! listener.accept();
    spawn {
        // Handling the connection
    }
}
```

The server enters an infinite loop to continuously accept incoming connections. For each accepted connection, it spawns a new Navi coroutine to handle the connection.

## Handling the Connection

```nv,ignore
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
