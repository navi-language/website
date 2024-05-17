# Using TcpListener

This guide introduces how to use `std.net.TcpListener` to create a basic TCP server in Navi. The guide teaches how to bind to an address, accept incoming connections, and handle data reading and writing, etc. By understanding and using the TcpListener library, you can write efficient and robust TCP application servers using Navi.

## What is TcpListener?

A TcpListener is a TCP socket server that listens for incoming connections. It allows you to accept new connections and handle them in your application.

You can accept a new connection by using the `accept()` method.

## Creating a TcpListener

```nv
let listener = try! TcpListener.bind("127.0.0.1:3000");
```

This creates a new TcpListener, which will be bound to the specified address. The returned listener is ready for accepting connections.

Binding with a port number of `0` will request that the OS assigns a port to this listener. The port allocated can be queried via the `local_addr()` method explained below.

## The Listening Address

The method `local_addr()` returns the local address that the listener is bound to. This can be useful, for example, when binding to port 0 to figure out which port was actually bound.

```nv
io.println(`listening on ${try! listener.local_addr()}`);
```

## Accepting Connections

```nv
let stream = try! listener.accept();
```

The call to `accept()` method will yield once a new TCP connection is established. When established, the corresponding `TcpStream` and the remote peer's address will be returned. See the TcpStream guide for details.
