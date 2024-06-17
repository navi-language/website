# Using TcpStream

Each accepted connection gives a `std.net.TcpStream` instance, and you can then spawn a new Navi coroutine to handle the connection.

This guide provides an overview of the TcpStream type, focusing on creating a stream, reading from it, writing to it, and shutting it down. By following this guide, you will be able to understand and implement TCP communication in their applications.

## What is TcpStream?

A `TcpStream` represents a TCP connection between a local and a remote socket.

Reading and writing to a TcpStream is typically done using the convenience methods found on the `Read` and `Write` traits. The `write_all()` method is defined on the `Write` trait.

## Creating a TcpStream

A `TcpStream` can be created by accepting a connection from a listener. An example is shown below.

```nv,no_run
use std.net.TcpListener;

let listener = try! TcpListener.bind("127.0.0.1:3000");
loop {
    let stream = try! listener.accept();
    spawn {
        // Handling the connection
    }
}
```

## Read

The `read()` method pulls some bytes from the `TcpStream` into the specified buffer, returning the number of bytes read. An example is shown below.

```nv,ignore
let buf = Bytes.new(len: 1024);
let n = try! stream.read(buf);
io.println(`read ${n} bytes`);
```

In the above example, a buffer of `1024` bytes is created to hold the data read from the stream. The `read()` method reads data from the stream into the buffer. The number of bytes read is returned. The number of bytes read is printed.

## Write

The `write()` method writes a buffer into the `TcpStream`, returning the number of bytes written. The `flush()` method ensures that all intermediately buffered contents reach their destination. An example is shown below.

```nv,ignore
let data = "hello world".bytes();
let n = try! stream.write(data);
try! stream.flush();
io.println(`wrote ${n} bytes`);
```

In the above example, a buffer containing the string `"Hello, world!"` is created. The `write()` method writes the data to the stream. The number of bytes written is returned. The `flush()` method ensures that all buffered data is sent. The number of bytes written is printed.

## The Remote Address

For each accepted connection, you can obtain the remote address of the client using the stream's `remote_addr()` method.

## Shutting Down

To shut down the stream in the write direction, you can call the `shutdown()` method. This will cause the other peer to receive a read of length `0`, indicating that no more data will be sent. This only closes the stream in one direction. An example is shown below.

```nv,ignore
try! stream.shutdown();
io.println("stream shut down");
```

In the above example, the `shutdown()` method is called to shut down the stream. A message indicating that the stream is shut down is printed.
