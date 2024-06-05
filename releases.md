---
title: Releases
editLink: false
---
## [v0.10.0](https://github.com/navi-language/navi/releases/tag/v0.10.0)

### Language

- Added `expect`, `unwrap`, `unwrap_or`, `or`, `or_else`, and, `and_then`, `is_nil`, `map`, `map_or`, `ok_or`, `inspect`, `flatten` methods to optional value.
- Added `type alias` statement to define a type alias, and `type` statement to define a newtype.
- Improved `do/catch` to better handle error.
- Added to support call method in union type.
- Added support `tag` attribute for newtype serde.
- Added to support overridden the default imported names in code scope. e.g.: `Error`, you can have your own `struct Error` to override the default `Error`.

### Stdlib

- Removed `std.io.Buffer`, instead with new `std.io.Bytes`.
- Moved module under `lang` to `std`, and default import `string`, `channel`, `Any`, `Decimal`, removed `lang` module.
- Improved to default import `print` and `println` method from `std`, now we can call it directly without `use`.
- Added to support log format (full, json, pretty, compact).
- Renamed `URLEncodedForm` to `UrlEncodedForm` in `std.net.http`.
- Added `File.seek` and `File.rewind` method to `std.fs`.
- Added to support `flag` and `mode` options for `fs.open` and `File.open` method.
- Added `fs.copy`, `fs.copy_dir`, `fs.rename`, `fs.hard_link`, `fs.symlink`, `fs.unlink` method.
- Improved `assert_throws`, the secondary argument support with a closure to write custom assert.

### Pkg

- Added `csv` package to support read and write CSV file.

### Navi Stream

- Add `draw` function.

### Tools

- doc: Added more details doc for array methods.
- doc: Added to support navi-doc to generate method docs in `lang.optional`, `lang.int` ...
- doc: impl Display for Enum, Struct, Interface, and Module.
- doc: show "instance" for nvs object value types.
- fmt: Updated to indent for switch and case with different levels.
- lsp: Added `navi_stream` language match support for Zed editor.
- lsp: Added to support goto definition for Navi to Navi Stream source.
- lsp: Added to support show hover info for struct fields.
- lsp: Improved find symbol of TypePathNode::Normal.
- lsp: determine `language_id` by file extension.
- lsp: find ImportedModule in current module file symbols first.
- lsp: fix bug of there being always an error message left (nvs).
- lsp: generate diagnostics for Navi Stream.
- lsp: optimize inlay hint padding and improve hover info for Navi Stream.


## [v0.9.6](https://github.com/navi-language/navi/releases/tag/v0.9.6)

### Language

- Improved the `navi run` and `navi test` commands for searching the `navi.toml` within a subproject.
  - Added support for finding `navi.toml` to locate the workspace path.
  - Added the `navi new` command to create a new project.
  - Removed the `--all-dir` option from `navi test`, as it is no longer necessary.
- Improved the `array` type to include more methods: `map`, `filter`, `filter_map`, `concat`, `sum`, `max`, `min`, `position_max`, `position_min`, `max_by`, `position_max_by`, `min_by`, `position_min_by`, `product`, `index_by`, `contains_by`, `clone`.
- Improved the `map` type by adding `clone` methods.
- Updated the `spawn` behavior to execute immediately.
- Fixed support to assign `closure` to `closure?`.
- Fixed a bug where the interface default method's first argument must be `self` error on release.
- Improved internal conversion from char to string.

### Stdlib

- Added `std.log`.
- Added `std.io.Write` as Logger output support and added the `prefix` method.
- Fixed serialization to support union types.
- Updated the `to_string` methods of JSON, YAML, and TOML to support `any?` and added more tests.
- Fixed serialization bugs for some complex cases.

### Tools

- We have released the [Zed extension](https://github.com/navi-language/zed-navi) for Zed with LSP support. Now code formatting, code completion, hover, go-to-definition, find references, rename, and more features are available in Zed.
  - Open your Zed and go to `Extensions` to search for `navi` and install it.
  - Currently, only available for Zed Preview version.

- doc: Added support to generate `enum`, `interface`, `type` for the `navi doc` command.
- doc: Fixed `impl` `enum` `navi doc` generation and included the source code signature by using `navi-fmt` code generation.
- lsp: Fixed LSP absolute path in Zed and other compatibility fixes for Zed.
- lsp: Enhanced LSP to support showing hover info on expr nodes.
- lsp: Fixed LSP inlay hints left padding.
- fmt: Fixed to ensure that the semicolon comes before for long lines.

### Breaking Changes

- Removed the `--all-dir` option from `navi test`, as it is no longer needed.
- Renamed `error` interface to `Error`.
- Removed `execute_many` from the `sql` package because it was deprecated in sqlx.

## [v0.9.5](https://github.com/navi-language/navi/releases/tag/v0.9.5)

### Core

- Add `decimal` as builtin type.
- Fix object pool memory leak.

### Stdlib

- Improve stdlib throws errors, now all errors has it's own error type.
- Add `std.time.Instant`.
- Fix std.time.DateTime, `iso8601` to use **ISO 8601** format, `to_string` to use **RFC 3339** format.
- Add `std.time.Duration` and `std.time.DateTime`, `decimal` to support serialize and deserialize.
- Fix operator (`>`, `>=`, `<`, `<=`) support for `std.time.Duration`.
- Fix `regex.Captures` gc mark leak.

### Pkg

- Add `acquire_timeout` option for `sql.Connection.connect`, default is 30s.
- Add `extra-engine` support to sql.
  > **Extra Engine** backend is a experimental feature, it can be used to execute sql with different engine (CSV, Aliyun OSS, AWS S3, MySQL, PostgreSQL, etc).
- Add `close` method to `sql.Rows` to close the rows.
- Add `longport` SDK basic feature to support [LongPort OpenAPI](https://open.longbridgeapp.com).

### Tools

- Improve Navi LSP performance, and improve auto-completion details.
- Improve [zed-navi](https://github.com/navi-language/zed-navi) syntax highlight [v0.0.4](https://github.com/navi-language/zed-navi/releases/tag/v0.0.4)
- Improve [vscode-navi](https://marketplace.visualstudio.com/items?itemName=huacnlee.navi) to support decimal.


## [v0.9.4](https://github.com/navi-language/navi/releases/tag/v0.9.4)

### Language

- Add to support arbitrary parameters.

  ```rs,no_run
  fn foo(a: int, b: int, items: ..string) {
  }
  ```

- Add top support iterate for channel types.

  ```rs,no_run
  use std.io;

  let ch = channel::<int>();
  spawn {
    defer {
      ch.close();
    }
    for i in 0..10 {
      ch.send(i);
    }
  }

  for n in ch {
    io.println(n);
  }
  ```

- Add to support `impl for`.

  ```rs
  interface Foo {
    fn foo(self);
  }

  struct User {}

  impl for User {
    fn foo(self) {
      io.println("foo");
    }
  }
  ```

- Add support lazy initialization.

  ```rs
  let s: string;

  s = "hello";
  ```

- Add `char` type.

  ```rs
  let c: char = 'a';
  ```

- Add to support `while let`.

  ```rs
  while (let v = ch.recv()) {
    io.println(v);
  }
  ```

- Now can iterate over a string.

  ```rs
  let s = "hello";
  for c in s {
    io.println(c);
  }
  ```
  
- Improve string performance.
- Improve string interpolation for support `${x:?}` to print debug format.
- Improve implicit conversion to support.

  ```rs
  // Option type
  let a: int? = 10;
  assert_eq a!, 10;
  
  let a: int??? = 10;
  let b: int? = a;
  assert_eq b!, 10;
  
  let a: int? = 10;
  let b: int??? = a;
  assert_eq b!!!, 10;
  
  // Union type
  let a: int | string = "abc";
  assert_eq a.(string), "abc";
  
  // Interface
  let a: ToString = 10;
  assert_eq a.to_string(), "10";
  ```
  
- Fix the `break` in `do, catch` block can't break the outside `loop` bug.

### Stdlib

- Add `time.sleep` method.

  ```rs
  use std.time;

  // sleep 1 second
  time.sleep(1);
  ```

- Improve `std.io.print` to support arbitrary argument.

  ```rs
  use std.io;

  io.println("hello", "world");
  ```

- Update http Headers `apppend`, `set` method, not allows nil value.
- Update http `set_basic_auth` the `username` not allows nil.

### Pkg

The `pkg` is used to manage packages that many split out of Navi in the future.

- Add [sql](https://navi-lang.org/stdlib/sql) module to support SQlite, MySQL, PostgreSQL, etc.

  ```rs
  use sql.Connection;


  struct User {
    id: int,
    name: string,
  }

  const conn = try! Connection.connect("sqlite::memory:");
  try! conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");

  try! conn.execute("INSERT INTO users (name) VALUES (?)", "Jason Lee");

  let users = try! conn.query("SELECT * FROM users").scan::<User>();
  ```

- Add [markdown](https://navi-lang.org/stdlib/markdown) module to support markdown render to HTML.

  ```rs
  use markdown;

  let html = markdown.to_html("# Hello, World!");
  ```

### Tools

- Fix Navi LSP to better autocomplete and documentations support.
- Add cache support in Navi LSP for better performance.
- Add `format` support in Navi LSP.
- fmt: insert a new line after std uses.
- fmt: sort outer-layer use { ... } statements
- New [tree-sitter-navi](https://github.com/navi-language/tree-sitter-navi), [tree-sitter-navi-stream](https://github.com/navi-language/tree-sitter-navi-stream) project for tree-sitter support.
- Add [Zed extension](https://github.com/navi-language/zed-navi) support, current only syntax highlight support.


## [v0.9.3](https://github.com/navi-language/navi/releases/tag/v0.9.3)

### Language

- Add generic function supports.
- Add the `enum` syntax.

  ```rs
  enum Color {
      Red,
      Green,
      Blue,
  }

  enum StatusCode {
      Ok = 200,
      BadRequest = 400,
      NotFound = 404,
  }
  ```

- Add the `const` syntax to define a constant.

  ```rs
  const PI = 3.1415926;
  ```

- Add the `pub` keyword to define a public `fn`, `struct`, `struct` field, `const`, `enum` ..., now only the `pub` members can be visited from other modules.

  ```rs
  pub const PI = 3.1415926;

  pub fn add(a: int, b: int): int {
      return a + b;
  }

  pub struct Loc {
      pub line: int,
      pub col: int,
  }
  ```

- Improve compile error message, and write test case for it.
- Allows to visit the `const` from other modules.
- Add `` r\`raw string\` `` syntax to better write Regex rules.

  ```rs
  use std.regex.Regex;

  // Before
  let re = Regex.new("\\d+");

  // After
  let re = Regex.new(r`\d+`);
  ```

- Improvement performance for internal calls, string, Object Ref.
- Add to support use `_` in a number literal.

  ```rs
  let n = 1_234_567.89_012;
  ```

- Add interface inheritance support, and support default implementation.

  ```rs
  interface A {
      fn a(): int;
  }

  interface B: A {
      fn b(): int {
          return 2;
      }
  }
  ```

- Improve assignment detect, now array, map can avoid declaring types, if the left side is a known type.

  ```rs
  fn foo(items: [string]) {}
  fn bar(items: <string, int>) {}

  // Before
  foo([string] { "a", "b" });
  bar(<string, int> { "a": 1, "b": 2 });

  // After
  foo({ "a", "b" });
  bar({ "a": 1, "b": 2 });
  ```

- Improve **Struct Field** and **Kw Arguments** assignment, if the variable name is the same as the field name, we can use a short syntax.

  ```rs
  struct User {
      name: string,
      city: string,
  }

  impl User {
      fn new(name: string = "", city: string = ""): User {
          return User {
              name: name,
              city: city,
          }
      }
  }

  let name = "foo";
  let city = "bar";

  // Before
  let user = User { name: name, city: city };
  let user = User.new(name: name, city: city);

  // After
  let user = User { name, city };
  let user = User.new(name:, city:);
  ```

- Add Union Type support.

  ```rs
  fn foo(n: int | string) {
      switch (let n = n.(type)) {
          case int {
              println("int: {}", n);
          }
          case string {
              println("string: {}", n);
          }
      }
  }

  // Also can return a union type
  fn bar(): int | string {
      return 1;
  }
  ```

### Stdlib

- Rewrite stdlib by Navi wrapper (internal is Rust Native), for better interface, and error support.
- Add `std.io.{Read, Write, Close}` interface.
- Rewrite stdlib by using interface `io.Read`, `io.Write` instead of `[byte]` for support stream, mostly for `std.fs` and `std.net.http`.

  ```rs
  use std.net.http;
  use std.fs;

  let res = try http.get("https://navi-lang.org");

  // Before body is a `[byte]`
  let body = res.body();

  // After
  // Body is a std.io.Read interface
  /// https://navi-lang.org/stdlib/std.net.http#Response.body
  let body = res.body.read_to_string();
  ```

- Add `std.net.http.Client` to create an HTTP client.
- Add `std.io.Cursor` for writing a `[byte]` or `string` to support `std.io.Read` interface.
- Add `json.from_reader` to support parse JSON from a `std.io.Read` in stream.
- Fix `sort` array incorrect order bug in some cases.
- Add `std.xml` module to support parsing XML.
- Add `std.toml` module to support parsing TOML.
- Add `std.io.StringBuffer` for mutable string like `std.io.Buffer`.

### Tools

- lsp: Add Go to define support for LSP, and support to visit Navi stdlib source code.
- lsp: Add Hover document for LSP.
- lsp: Add support newline to keep `///` comment in next line.
- lsp: Add support a bit of Auto Complete support, still need to improve.
- fmt: `use` statement will be sorted by alphabet, and keep `self` in the first.
- test: Add `navi test --all-dirs` to test all sub-dir, and default test current dir.
- test: Improve `assert` results and use `""` to wrap them for a better read.
- build: We use Navi to write our internal CI build and publish script now.


## [v0.9.1](https://github.com/navi-language/navi/releases/tag/v0.9.1)

### Language

- Add to support error handling, see [Error](https://navi-lang.org/learn#error) doc.
  ```rs
  fn main() throws {
    let file = try fs.open("file.txt");
    // ...
  }
  ```
- Add **Static Method** support, and rewrite all stdlib.

  ```rs
  struct User {}

  impl User {
    fn new() -> User {
      // ...
    }
  }
  ```

- The first argument on the **Instance Method** now must have a `self` parameter.

  ```rs
  struct User {}

  impl User {
    // Before
    fn to_string() {
      // ...
    }

    // After
    fn to_string(self) {
      // ...
    }
  }
  ```

- Add new serialization support for `json`, `yaml` module.

  ```rs
  use std.json;

  struct User {
    name: string
    ##[serde(rename = "_age")]
    age: int
  }

  let user = json.parse::<User>(`{"name":"Navi","_age":1}`);
  assert_eq user.name, "Navi";

  let user = User { name: "Navi", age: 1 };
  assert_eq json.to_string(user), `{"name":"Navi","_age":1}`;
  ```

  - Add also support to deserialize to the `any` type.

  ```rs
  let a = json.parse::<any>("1");
  assert_eq a.(int), 1;

  let a = json.parse::<any>(`"hello"`);
  assert_eq a.(string), "hello";
  ```

- Add **Raw String** syntax: `` r`this is string` `` for better use for the regular expression.

  ```rs
  use std.regex.{Regex};

  // Before
  let re = Regex.new("[\\w\\d]");

  // After
  let re = Regex.new(r`[\w\d]`);
  ```

- Improve the `use` syntax to support `as` and import multiple items.

  ```rs
  // Before
  use std.fs;
  use std.fs.File;


  // After
  use std.fs.{self, File as BaseFile, write};
  ```

- Add `type` keyword to define [Type Alias](https://navi-lang.org/learn#type-alias).

  ```rs
  type Key = string;
  type Value = int;

  type MyInfo = <Key, Value>;

  let info: MyInfo = {
      "foo": 1,
      "bar": 2,
  };
  ```

- Improve syntax to assign an array, or map without type annotation, if the left side has a known type.

  ```rs
  let a: [int] = {1, 2, 3};
  let b: <string, int> = { "foo": 1, "bar": 2 };

  struct Info {
    headers: <string, string>
  }

  let info: Info = {
    headers: { "Content-Type": "application/json" }
  };
  ```

### Stdlib

- Rewrite all stdlib to use **Static Method**, **Error Handling**, and the new **Serialization** support.
- Removed `to_json`, `to_yaml` method, use `json.to_string`, `yaml.to_stirng` instead.
- Add `File.open`, `File.create` and `fs.write`, `fs.write_string`.
- Add `replace_with`, `replace_all_with`, `captures` to `regex.Regex`.
- Rename `match`, `match_all` to `find` and `find_all` for `regex.Regex` to avoid keywords.
- Add `utc`, `to_offset` method to `time.DateTime`.
- Add `step` method to `Range` type.
- Add `bytes` method to Buffer.
- Add `set_file` method to `multipart.Form` to support file upload, see [Multipart](https://navi-lang.org/stdlib/std_net_http_multipart#Form#set_file) doc.
- Rename `to_int`, `to_float` into `parse_int`, `parse_float` for string.

### Tools

- Publish [Navi Learn](https://navi-lang.org/learn), [Navi Stdlib](https://navi-lang.org/stdlib) docs on the website.
  - And now use Navi instead of TypeScript to write [scripts](https://github.com/navi-language/website/tree/main/script) for website docs generated.
  - All stdlib docs have been generated by `navi doc --stdlib` command.
  - Add [Navi Stream](https://navi-lang.org/navi-stream/) doc.
- Add **Outline** display support for LSP and VS Code extension.
- Add **Inlay Hints** support for LSP and VS Code extension.
- Add new syntax support for `navi fmt`.
- Add `navi doc` command to generate documentation for Navi files.
- Add `navi doc --stdlib` command to generate documentation for Navi's standard library.
- Add `navi test --doc` command to test the Markdown code blocks in Navi files.


## [v0.9.0](https://github.com/navi-language/navi/releases/tag/v0.9.0)

### Language

- Add `interface` support.
- Add `navi fmt` to format code, and install the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=huacnlee.navi).
- Add `loop` statement to loop forever.
- Add getter, and setter to built-in type.
- Add dotenv support, now will auto load `.env` file in the current directory as environment variables.
- Add `if let` statement.
- Add `main` function, now `navi run` will run the `main` function in `main.nv` file in default.
- Add [httpbin](https://httpbin.org/) feature into `testharness` to speedup HTTP test.

### Stdlib

- Add `resize`, `truncate`, `split_off`, `chunks` method to array.
- Add `weekday` to `std.time`.
- Add `std.process` with `exit`, `abort`, `pid`, `exec`, `run`, `args` function.
- Add `std.json`, `std.yaml`, `std.querystring` modules for JSON, YAML, QueryString parse, and stringify.
- Add `std.value` module to common value type.
- Add `basic_auth` method to HTTP `Request`.
- Add `chunk` method to HTTP `Response`.
- Add `multipart`, `form`, `timeout` to `http.Request`.
- Add `read`, `read_string` to `fs.File`, and `read`, `read_string` to `fs` module.
- Add `std.io.stdin`, `std.io.stdout`, `std.io.stderr`.
- Add `join` to `std.url`.
- Add `std.env.vars` to get all vars.

### Breaking Changes

- Rewrite string interpolation from `{1 + 2}` to `${1 + 2}` like JavaScript.
- Kw Arguments now use `:` instead of `=`, e.g.: `fn(a: 1, b: 2)`, no longer allowed to be passed positionally.
- Most struct get method in stdlib now is getter, e.g.: `host` instead of `host()` for `url.URL`.
- Rename `fs.read_string` to `fs.read_to_string`.
- Rename `io.from_bytes` to `io.new_bytes_from_array`.
- Move `cwd`, `chdir` from `std.path` to `std.env`.

### Examples

#### Interface

Like Go, you can define an interface in the following way:

```rs
interface Readable {
    fn read(): string
}

fn read(r: Readable): string {
    return r.read()
}

struct File {
    path: string
}

impl File {
    fn read(): string {
        return "read file"
    }
}

struct Body {
    content: string
}

impl Body {
    fn read(): string {
        return "read body"
    }
}

fn main() {
    file := File{path: "file"}
    body := Body{content: "body"}
    println(read(file))
    println(read(body))
}
```

#### If let

```rs
use std.io;

fn main() {
    let name: string? = "Navi";

    if let name = name {
        io.println("name is ${name}")
    } else {
        io.println("name is nil");
    }
}
```


## [v0.8.6](https://github.com/navi-language/navi/releases/tag/v0.8.6)

### What's Changed

- Add Optional Type and Optional Chaining.
  - All Stdlib API will return an optional type if it can be nil, like Rust.
  - Now all Object Types can't be nil, but you can use `?` to make it optional.
- Done with the Keywords Arguments support.
- Add `sub` for `std.time.DateTime` with return a `Duration`.
- Add `std.net.http` with HTTP request methods and `Headers`, `Request`, `Response` types.
- Add `std.net.tcp_conn`, `std.net.tcp_listener`, `std.net.ip_addr` this is still in development.
- Add `std.io.bytes` to the storage bytes array, move `std.buffer` to `std.io.buffer` and base on `std.io.bytes`.
    - Now all `bytes` methods will return `std.io.Bytes` type.
    - Refactor Stdlib API, `std.io.bytes.new` to `std.io.new_bytes`, `std.io.buffer.new` to `std.io.new_buffer`.

### Optional Type

Navi's optional type is similar to Rust's optional type, but it has some differences.

```rs
let a: int? = 1;
let b: int? = nil;

struct User {
    name: string,
    age: int?,
}

let use: User? = User {
    name: "John",
    age: 20,
};

assert_eq user?.name, "John";
assert_eq user?.age!, 20;

// unwrap
let user: User = user!;
assert_eq user.name, "John";
```

### Keywords Arguments

All optional argument values can be called with keywords argument syntax.

```rs
fn hello(name: string, city: string?, done: book?): string {
}

foo("Jason Lee", "Chengdu", true);
foo("Jason Lee", city = "Chengdu", done = true);
foo("Jason Lee", done = true, city = "Chengdu");
foo("Jason Lee", done = true);
```

### Other Changes

- Improve test results to show the test file path.
- Move `std.path.glob` to `std.fs.glob`.


## [v0.8.4](https://github.com/navi-language/navi/releases/tag/v0.8.4)

### Language

- Add `closure` statement support.

  ```rs
  let sub = fn(a: int, b: int): int {
    return a - b;
  };
  ```
  
- Improve the internal objects to map string interpolation call to `to_string` method.
- Fix to assign map element by key: `items["foo"] = 1`.
- Fix comparing object and nil.

### Test

- Add `bench` for write benchmark tests, and `navi bench` command.
- Allows `navi test` to run all tests in the current folder.
- Add `tests` and `benches` statements for wrapper test cases.
- Add `assert_eq`, `assert_ne` statements for tests.
- Improve the test result, and only show diff when it has multiple lines/

### Stdlib

- Add `std.time` and `std.time.DateTime`, `std.time.Duration`.
- Add `std.regex` and `std.regex.Match`, with `match`, `is_match`, `replace`, `replace_all` methods.
- Add `std.crypto` with `hash`, `hmac` and `md5`, `sha1`, `sha256`, `sha512` algorithms.
- Add `std.buffer`.
- Add `std.rand` with `rand.int`, `rand.float`, `rand.bytes` methods.
- Add module `std.base64` with `encode`, `decode`, `urlsafe_encode`, `urlsafe_decode` methods.
- Add `std.url` and `std.url.URL`.
- Add math functions to `int` and `float`.
- Add `std.path` with `extension`, `join`, `base`, `parent`, and `exists` methods...
- Add `std.fs` with `open`, `create`, `create_dir`, `create_dir_all`, `remove_file`, `remove_dir`, `remove_dir_all`, `glob` methods, now we can read and write file.
- Add `std.env` to read & write env variables.
- Add `keys`, `values` method to `std.collection.Map`.
- Add `len`, `bytes`, `contains`, `to_lowercase`, `to_uppercase`, `substring`, `split`, `replace`, `starts_with`, `ends_with`, `trim`, `repeat`, `strip_prefix`, `strip_suffix` ... method to `string`.
- Add `to_int`, `to_float` to `string`.
- Add `unique`, `reverse`, `sort` methods for `array`.