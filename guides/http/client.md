# Make a HTTP Client

In some cases, you may need to make multiple requests to the same server. In such cases, it is more efficient to create an HTTP client and reuse it for multiple requests. The [http.Client](/stdlib/std.net.http#std.net.http.Client) struct provides a way to create an HTTP client that can be reused for multiple requests.

The HTTP Client holds a connection pool to reuse the connections, so it is more efficient than creating a new connection for each request.

And the client also provides a way to set more complex options like `timeout`, `redirect`, `user_agent` for us to control the behavior of the client. See: [Client.new](/stdlib/std.net.http#Client.new) for more details.

> The `http.get`, `http.post`, `http.put`, `http.delete`, `http.head`, `http.options`, `http.patch` functions are just a wrapper around the `http.Client` struct, they have a default client that can be used to send a request.

## Create a HTTP client

```nv
use std.net.http.{Client, Request};

fn main() throws {
    let client = Client.new(timeout: 15.seconds(), redirect: 5, user_agent: "navi-client");
    let req = Request.new("GET", "https://api.github.com/repos/navi-language/navi");
    let res = try client.execute(req);

    if (res.status() != 200) {
        println("Failed to fetch repo", try res.text());
        return;
    }

    println(try res.text());
}
```

In the above example:

1. We create an HTTP client using the [Client.new](/stdlib/std.net.http#std.net.http.Client#new) function.
2. We set the `timeout` to 15 seconds, `redirect` to 5, and `user_agent` to `navi-client`.
   - The `timeout` is the maximum time to wait for the server to respond.
   - The `redirect` is the maximum number of redirects to follow.
   - The `user_agent` is the User-Agent string to send with the request.
3. We create a [Request](/stdlib/std.net.http#std.net.http.Request) object with the `GET` method and the URL of the GitHub API, because of the client execute method required a Request type.
4. Then we execute the request using the [Client.execute](/stdlib/std.net.http#Client#execute) method.

::: tip

- The `5.seconds()` is a shorthand for creating a [Duration](/stdlib/std.time#std.time.Duration) object with 5 seconds, you can use `nanoseconds`, `microseconds`, `milliseconds`, `seconds`, `minutes`, `hours`, `days` methods on a `int` or `float` value to create a `Duration`. e.g., [15.minutes()](/stdlib/lang.int#int#minutes), [0.1.hours()](/stdlib/lang.float#float#hours), etc.

:::
