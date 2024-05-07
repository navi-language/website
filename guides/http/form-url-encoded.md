# Send a URL-encoded form

The `www-form-urlencoded` is a common format for sending data to the server. You can use the `FormUrlEncoded` type to create a URL-encoded form.

```nv
use std.net.http.{self, FormUrlEncoded};

fn main() throws {
    let form = FormUrlEncoded.from({
        "name": "Navi",
        "website": "https://navi-lang.org",
        "profile[bio]": "Navi is a programming language",
    });

    let res = try http.post("https://httpbin.org/post", body: form);
    if (res.status() != 200) {
        println("Failed to send form", try res.text());
        return;
    }

    println(try res.text());
}
```

Run the above code with `navi run main.nv`, will output:

```json
{
  "form": {
    "email": "huacnlee@gmail.com",
    "name": "Jason Lee"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "41",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org"
  },
  "url": "https://httpbin.org/post"
}
```

In this case, we create a [FormUrlEncoded] type and set the fields to the form using the `from` method.

- The `FormUrlEncoded.from` function is used to create a new URL-encoded form data, the first argument accpets a `key-value` pair map, the key must be a `string` type, and the value can be `Any` type that can be serialized to a string.
  - Please note that the `FormUrlEncoded` just accept 1 level key-value pair, if you want to send a nested form, if you prefer to send a nested form, the request will throw an error. If you want to send a nested form, you special the key with `[]` to make it as an array, like `profile[bio]` in the example above.
- The `body` arugment of the `http.post` function can accept a `FormUrlEncoded` type, and when you give a `FormUrlEncoded` type to the `body` argument, the `Content-Type` will be set to `application/x-www-form-urlencoded` in automatically.

[FormUrlEncoded]: /stdlib/std.net.http#std.net.http.FormUrlEncoded
