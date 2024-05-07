# Upload a file

HTTP upload file is have a muiple ways:

- Send a file as a form data
- Send a file as a binary data

## Send a file as a form data

We have [FormData] type to create a form data.

```nv
use std.net.http.{self, FormData};
use std.fs;

fn main() throws {
    let f = try fs.open("main.nv");

    let form = FormData.new();
    form.set("file", f);

    let res = try http.post("https://httpbin.org/post", body: form);
    if (res.status() != 200) {
        println("Failed to upload file", try res.text());
        return;
    }

    println(try res.text());
}
```

After run `navi run main.nv` will output:

```json
{
  "form": {
    "file": "use std.net.http.{self, FormData};\nuse std.fs;\n\nfn main() throws {\n    let f = try fs.open(\"main.nv\");\n\n    let form = FormData.new();\n    form.set(\"file\", f);\n\n    let res = try http.post(\"https://httpbin.org/post\", body: form);\n    if (res.status() != 200) {\n        println(\"Failed to upload file\", try res.text());\n        return;\n    }\n\n    println(try res.text());\n}\n"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "566",
    "Content-Type": "multipart/form-data; boundary=13a93074bc934b08-a754f29d0131df2b-c3c9356adfc70e70-b3e7362cbfc28f17",
    "Host": "httpbin.org"
  },
  "url": "https://httpbin.org/post"
}
```

In this case, we create a `FormData` type and set the file to the form using the `set` method. The `set` method takes the field name and the file object as arguments.

- The `fs.open` function is used to open a file. It returns a `File` type that represents the file.
- The `FormData.new` function is used to create a new multipart form data.
- We use the `form.set` method to set the file to the form data, you can also you `form.append` to append a file to the form data. The `set` is will override the field if the field is already exists. But the `append` will append the duplicate field.
- The `http.post` can accepct a `FromData` type as the `body` argument, and when you give a [FormData] type to the `body` argument, the `Content-Type` will be set to `multipart/form-data` in automatically.

## Send a file as a binary data

Sometimes, the HTTP server may only accept the file as a binary data, you can use the `File` type to read the file and send it as a binary data.

```nv
use std.net.http;
use std.fs;

fn main() throws {
    let f = try fs.open("main.nv");

    let res = try http.post("https://httpbin.org/post", body: f);
    if (res.status() != 200) {
        println("Failed to upload file", try res.text());
        return;
    }

    println(try res.text());
}
```

After `navi run` above code, the output will be:

```json
{
  "data": "use std.net.http;\nuse std.fs;\n\nfn main() throws {\n    let f = try fs.open(\"main.nv\");\n\n    let res = try http.post(\"https://httpbin.org/post\", body: f);\n    if (res.status() != 200) {\n        println(\"Failed to upload file\", try res.text());\n        return;\n    }\n\n    println(try res.text());\n}\n",
  "headers": {
    "Accept": "*/*",
    "Content-Length": "296",
    "Host": "httpbin.org"
  },
  "url": "https://httpbin.org/post"
}
```

In this case, we open the file using the `File.open` function and pass the file object to the `http.post` function as the `body` argument. The `http.post` function will send the file as a binary data.

The `body` argument can accept any type that implements the [std.io.Read] interface, and the `File` type implements that interface.

[File.open]: /stdlib/std.fs#open
[FormData]: /stdlib/std.net.http#std.net.http.FormData
[FormData.new]: /stdlib/std.net.http#FormData#new
[std.io.Read]: /stdlib/std.io#Read
