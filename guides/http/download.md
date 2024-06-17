# Download a file

You can download a file from the server using the `http.get` function.

```nv,no_run
use std.net.http;
use std.io;
use std.fs;

fn main() throws {
    let f = try fs.create("image.png");
    defer try f.close();

    let res = try http.get("https://httpbin.org/image/png");
    if (res.status() != 200) {
        println("Failed to download file", try res.text());
        return;
    }

    let content_length = res.headers().get("Content-Length");
    println("Downloaded file size:", content_length);

    try io.copy(res.body(), f);
}
```

After run `navi run main.nv`, we will download and save `image.png` file.

In this case:

- We use the [fs.create] to open a file with **WRITE** mode, if the file is not exists, it will create a new file.
- The `defer` statement is used to close the file after the function returns (Like defer in Go).
- The `http.get` function is used to send a GET request to the server and get the response.
- The `res.body()` is return the [std.io.Read] interface. So we can use the `f.write` to write the body to the file, because the `write` function accept that interface.
- The `res.body()` in a stream response, so the `f.write` will write the body to the file in a stream way.

[fs.create]: /stdlib/std.fs#create
[std.io.Read]: /stdlib/std.io#Read
