[[toc]]

## Introduction

Navi (/ˈnævi/) is a high-performance programming and stream computing language developed in Rust, originally designed for complex and high-performance computing tasks. It is also suited as a glue language embedded within heterogeneous services in financial systems.

In addition to its capabilities as a statically typed, compiled language, Navi offers the convenience of script-like execution. It can compile source code into Bytecode (without JIT) or Machine Code (with JIT), providing a flexible development workflow. Theoretically, Navi delivers competitive performance on par with Go, Rust, and C.

### Language Design Philosophy

- **Simple and Clean Syntax**

  Designed with a straightforward and clean syntax.

- **Modern Optional-Type and Error-Handling Design**

  With a modern design of optional types and error handling, Navi allows developers to gracefully manage exceptional cases and abnormal data.

- **No NULL Pointer Panic, Safe Runtime**

  No NULL pointer exceptions. Once your code compiles, you can expect consistent and reliable execution.

- **Scripted or Compiled Execution**

  Supports script-like execution, but offers the same performance comparable to compiled languages like Go.

### Functionalities

- **Dual-Domain Programming**

  Serves as a dual-purpose language, functioning as both a general-purpose programming language and a domain-specific language optimized for incremental computation.

- **High Performance**

  As a statically typed, compiled language, which is comparable to Go, Rust, and C.

- **Cross-platform**

  Running on Linux, Windows, macOS, and through WebAssembly (WASM), it extends its reach to iOS, Android, and Web Browsers.

- **Native Cloud Support (WIP)**

  With its standard library, Navi enables seamless manipulation of cloud computing resources as if they were local.

- **Native Financial Support (WIP)**

  Navi is equipped with native support for incremental financial data computation, making it ideal for real-time calculation and analysis of stock market data.
  It boasts a rich set of scientific computing capabilities, including built-in functions for technical stock market indicators, and standard library support for
  LongPort OpenAPI, significantly reducing development costs for programmatic trading.

## Standard Library

The [Navi Standard Library](/stdlib/) has its own documentation.

## Getting Started

Write a `main.nv`, `.nv` is the file extension of the Navi language.

```nv
use std.io;

fn main() throws {
    let name = "World";
    let message = `Hello ${name}!\n`;
    io.println(message);
}
```

Output:

```shell
$ navi run
Hello World!
```

> NOTE: If the file name is `main.nv` and it have `main` function. The `navi run` will use it as the program entry.
> You also can execute with `navi run main.nv`.

This code sample demonstrates the basic syntax of Navi.

- The `use` keyword is used to import the `io` module from the standard library.
- The `//` is used to comment a line.
- The `fn` keyword is used to define a function.
- The `main` function is the entry point of the program, the `main` function must have `throws` keyword, and it can throw an error.
- The `throws` keyword is used to declare a function can throw an error.
- The `let` keyword is used to declare a variable.
- The `name` variable is a string type, or you can use `let name: string = "World";` to declare it.
- The `message` variable is defined by a string interpolation (Like JavaScript) by using "``", and the `${name}` is a variable reference.
- The `io.println` function is used to print a string to the console.
- Use `;` to end a statement.
- Finally, the Code style uses 4 spaces for indentation.\

## Comments

Navi supports 2 types of comments (Like Rust).

The `//` started is a normal comment, and it will be ignored by the compiler.

For example:

```nv,no_run
// This is a normal comment.
fn say(name: string): string {
    // This is a normal comment.
    // This is the second line of normal comment.
    return `Hello ${name}!`;
}
```

There is no multi-line comment in Navi. If you want write a multi-line comment, just use `//` for each line.

## Doc Comments

A doc comment is started with `///`, and it will be parsed by the compiler and generate documentation. You can write Markdown in it.

For example:

````nv,no_run
/// A struct doc comment.
struct User {
    /// The user's name.
    name: string,
}

impl User {
  /// This is a doc comment for a function.
  ///
  /// ## Args
  ///
  /// - name: The name of the person to say hello to.
  ///
  /// ```nv
  /// let user = User { name: "Navi" };
  /// assert_eq user.say(), "Hello Navi!";
  /// ```
  fn say(self): string {
      return `Hello ${self.name}!`;
  }
}
````

### Doctest

You can write Markdown Code Block in your doc comment, use `navi test --doc` to run the doc tests.

Like regular tests, doc tests use the `assert`, `assert_eq`, and `assert_ne` keywords for assertion.

For example:

````nv,no_run
/// This is a doc comment for a function.
///
/// ```nv
/// let s = say("World");
/// assert_eq s, "Hello";
/// ```
fn say(name: string): string {
    return `Hello ${name}!`;
}
````

Then you can run `navi test --doc` to run the doc test.

```shell
$ navi test --doc
test doc `say` . ok
thread 'main' at 'assertion failed: s == "Hello"', main:9

   left: Hello World!
  right: Hello
```

This will parse the Codeblock in the doc comment and run it.

### Annotation for doctest

Code blocks can be annotated with attributes that help `navi test` do the right thing when testing your code:

- `ignore`: Ignore doc test (No compile and run).
- `should_panic`: This code should panic or assert failed.
- `no_run`: This code should passed compile but not run.
- `compile_fail`: This code block should fail to compile.

#### For example:

Expect to ignore (No compile and run)

````nv
/// ```nv,ignore
/// fn foo() {
/// ```
````

Expect to **panic** or **assert failed**

````nv
/// ```nv,should_panic
/// assert_eq 1 == 2;
/// ```
````

Expect to **passed compile** but **not run**

````nv
/// ```nv,no_run
/// loop { };
/// ```
````

Expect to **compile failed**

````nv
/// ```nv,compile_fail
/// a = 1
/// ```
````

## Values {#value}

### Primitive Types

| Type     | Rust Equivalent | Description              | Example               |
| -------- | --------------- | ------------------------ | --------------------- |
| [int]    | i64             | A signed integer type    | `1`, `-29`, `0`       |
| [bool]   | bool            | A boolean type.          | `true`, `false`       |
| [float]  | f64             | A floating point type    | `1.0`, `-29.0`, `0.0` |
| [string] | str             | A immutable UTF-8 string | `"Hello, 世界"`       |

::: info
💡 Navi only have [int] and [float] types, all `int` are stored as _int64_, and all `float` are stored as _float64_ in internal.

There is no int8, uint8, int16, uint16, int32, uint32, float32, and etc.
:::

### Primitive Values

| Name               | Description                    |
| ------------------ | ------------------------------ |
| `true` and `false` | [bool] values                  |
| `nil`              | Set an [optional] value to nil |

### Integer {#int}

In Navi, the `int` type is a signed integer type, and it is 64-bit on all platforms. This means it can hold values from `-9223372036854775808` to `9223372036854775807`.

We don't have `uint` type or other integer types.

```nv
let n = 246;
let n1 = -100;
```

### Float {#float}

Navi has a `float` type (53 bits of precision), and it is 64-bit on all platforms.

```nv
let v = 3.14;
let v1 = -2.0;
let v2 = 0.0;
let v3 = 10.23e+10;
let v4 = 2.0e+2;
```

### Bool {#bool}

Navi has a `bool` type, and it has two values: `true` and `false`.

```nv, no_run
use std.io;

let passed = true;
if (passed) {
    io.println("Passed!");
} else {
    io.println("Failed!");
}

let passed = false;
```

### String {#string}

String is a UTF-8 string type, and it is immutable in Navi, all string literals are immutable.

```nv,no_run
use std.io;

fn main() throws {
    let message = "Hello, World 🎉!";

    io.println(message);
    io.println(`chars len: ${message.len()}`);
    io.println(`bytes len: ${message.bytes().len()}`);
}
```

Output:

```shell
$ navi run
Hello, World 🎉!
chars len: 15
bytes len: 18
```

#### Escape Sequences

| Escape Sequences | Description     |
| ---------------- | --------------- |
| `\n`             | Newline         |
| `\r`             | Carriage return |
| `\t`             | Tab             |
| `\\`             | Backslash       |
| `\"`             | Double quote    |
| `\'`             | Single quote    |

If you use `\` in a string outside of an escape sequence, it will be ignored.

```nv,no_run
use std.io;

fn main() throws {
    io.println("\"Hello, \nWorld!\"");
    io.println("Hello, \\nWorld!");
    io.println("Unknown escape sequence: \a");
}
```

Output:

```shell
$ navi run
"Hello,
World!"
Hello, \nWorld!
Unknown escape sequence: a
```

### String Interpolation

String interpolation is a way to construct a new String value from a mix of constants, variables, literals, and expressions by including their values inside a [string] literal.

Navi's string interpolation is similar to JavaScript's template literals.

```nv
let name = "World";
let hello = `Hello, ${name}!`;

// You can write multi-line string interpolation.
let hello = `
Hello, ${name}!
`;
```

#### ToString interface

The `ToString` interface is a built-in interface, and it has a `to_string` method, you can use it to convert a value to a string.

If you use any type that implements the `ToString` interface in string interpolation, it will call the `to_string` method to convert the value to a string.

For example:

```nv
struct User {
    name: string
}

impl User {
    fn to_string(self): string {
        return self.name;
    }
}

let user = User { name: "Navi" };
let message = `Hello, ${user}!`;
assert_eq message, "Hello, Navi!";
```

### Assignment

Use the `let` keyword to declare a variable to an identifier, the variable is mutable.

> TODO: We will have a `const` keyword for immutable in the future.

```nv,no_run
// main.nv
use std.io;

let name = "World";
let pi = 3.14;
let passed = true;

fn main() throws {
    name = "Navi";
    pi = 3.1415926;
    passed = false;
    let message = `Hello ${name}, pi: ${pi}, passed: ${passed}!`;
    io.println(message);
}
```

Output:

```shell
Hello Navi, pi: 3.1415926, passed: false!
```

You can declare a variable with a type.

```nv
let name: string = "World";
let pi: float = 3.14;
let passed: bool = true;
```

Variables must be initialized:

```nv,compile_fail
use std.io;

fn main() throws {
    // This will cause a compile error.
    let name: string;

    name = "Navi";
    io.println(`Hello ${name}!`);
}
```

Output:

```shell
  ┌─ main.nv:4:21
  │
4 │     let name: string;
  │                     ^ unrecognized token: ;, expected tokens: ",", "=", "?"
```

If we changed to give a default value, then it will be ok.

```nv, no_run
let name: string = "";
```

### Type Casting

Use `as` to cast a value to a type.

You can cast a value from [int] to [float], or from [float] to [int].

| FROM  | TO    |
| ----- | ----- |
| int   | float |
| float | int   |
| bool  | int   |

```nv
test "cast" {
    let n = 100 as float;
    assert_eq n, 100.0;

    let n = 3.1415 as int;
    assert_eq n, 3;

    let n = true as int;
    assert_eq n, 1;
    let n = false as int;
    assert_eq n, 0;
}
```

There follow are invalid type casting:

```nv,compile_fail
let n = 300 as string; // unable cast type `int` to `string`
let n = 3.1415 as string; // unable cast type `float` to `string`
let n = "10" as int; // unable cast type `string` to `int`
let n = "10" as float; // unable cast type `string` to `float`
let n = 0 as bool; // unable cast type `int` to `bool`
let n = true as float; // unable cast type `bool` to `float`
```

### Type Conversion

Use `parse_int`, `parse_float` to convert a `string` to a `int` or `float`, the return value is a optional type. If the string value is invalid, it will return `nil`.

And use `to_string` to convert all [Primitive Types] to a `string`, this always success.

```nv
test "parse_int" {
    let n = "100".parse_int();
    assert_eq n, 100;

    let n = "abc100".parse_int();
    assert_eq n, nil;

    let n = "100abc".parse_int();
    assert_eq n, nil;

    let n = 3.1415 as int;
    assert_eq n, 3;

    let n = true as int;
    assert_eq n, 1;

    let n = false as int;
    assert_eq n, 0;
}

test "to_float" {
    let n = "100".parse_float();
    assert_eq n, 100.0;

    let n = "3.1415".parse_float();
    assert_eq n, 3.1415;

    let n = "3.9abc".parse_float();
    assert_eq n, nil;

    let n = 3 as float;
    assert_eq n, 3.0;
}

test "to_string" {
    let n = 100.to_string();
    assert_eq n, "100";

    let n = 3.1415.to_string();
    assert_eq n, "3.1415";

    let n = true.to_string();
    assert_eq n, "true";

    let n = false.to_string();
    assert_eq n, "false";
}
```

## Testing

You can use the `test` keyword to declare a test function in any Navi file, it will be run when you execute `navi test`.

There are built-in `assert`, `assert_eq`, and `assert_ne` keyword for assertion.

```nv
use std.io;

fn say(name: string): string {
    return `Hello ${name}!`;
}

test "say" {
    let message = say("World");
    assert message == "Hello World!";
    assert_eq message, "Hello World!";
    assert_ne message, "";
}
```

Output:

```shell
$ navi test
test main.nv . ok
All 1 tests 1 passed finished in 0.03s
```

Like `navi run`, you can use `navi test main.nv` to run a specific file, if you don't pass a file name, it will run all files in the current directory (Like `navi test .`).

The code in the `test` block will be ignored by the compiler when you execute `navi run`.

### Test Declarations

You can use the `test` keyword to declare a test function, followed by a string literal as the test name, and then a block of code.

The `test` block can at anywhere in a Navi file, but it is recommended to put it at the end of the file.

```nv
use std.io;

fn say(name: string): string {
    return `Hello ${name}!`;
}

// Here is ok
test "say" {
    let message = say("World");
    assert message == "Hello World!";
    assert_eq message, "Hello World!";
    assert_ne message, "";
}

fn add(a: int, b: int): int {
    return a + b;
}

test "add" {
    let result = add(1, 2);
    assert result == 3;
    assert_eq result, 3;
    assert_ne result, 0;
}
```

Output:

```shell
$ navi test
test main.nv .. ok in 1ms
All 2 tests 2 passed finished in 0.02s.
```

### Test Failures

The test runner will print the error message when a test fails, and with an `exit 1` code to let CI know the test failed.

```nv
test "expect to fail" {
    assert true == false;
}

test "expect to fail with message" {
    assert_eq 1, 2, "1 != 2";
}
```

Output:

```shell
$ navi test
Testing
test main.nv .. fail in 708ms

  main expect to fail
    thread 'thread 1#' at 'assertion failed: true == false', main.nv:2

    stack backtrace:
      0: test#0()
        at main.nv:2

  main expect to fail with message
    thread 'thread 1#' at '1 != 2', main.nv:6

       left: 1
      right: 2

    stack backtrace:
      0: test#1()
        at main.nv:6

All 2 tests 0 passed, 2 failed finished in 0.79s.
```

## Variable

### Declarations

The syntax of variable declarations is:

```
[<declaration_mode>] :[<type>] <identifier> = <expression>
```

where:

- `declaration_mode` - is the variable mode, we can use `let`.
- `type` - used to declare the variable type, such as `int`, `string`, or a optional type `int?`, `string?`.
- `identifier` - variable name.
- `expression` - the value of the variable, can be any expression.

### Identifier

An identifier is a name used to identify a variable, function, struct, or any other user-defined item. An identifier starts with a letter or underscore `_`, followed by any number of letters, underscores, or digits.

It is recommended to use `snake_case` for identifiers, e.g. `my_var`, `my_function_name`.

They must not be a keyword. See [Keywords](#keywords) for a list of reserved keywords.

The following are valid identifiers:

```nv
let name = "World";
let _name = "World";
let name_ = "World";
let _name_ = "World";
let name1 = "World";
```

And they are invalid identifiers:

```nv,compile_fail
let 1name = "World";
let name-1 = "World";
// `use` is a keyword.
let use = "World";
```

### Variable Scope

Variables are scoped to the block in which they are declared. A block is a collection of statements enclosed by `{}`.

```nv,no_run
use std.io;

let name = "Name in global scope";

fn main() throws {
    let name = "World";
    io.println(`Hello ${name}!`);

    foo();
}

fn foo() {
    io.println(`Hello ${name}!`);
}
```

Output:

```shell
$ navi run
Hello World!
Hello Navi!
Hello World!
Hello Name in global scope!
```

## Operator

Like other programming languages, Navi has a set of operators for performing arithmetic and logical operations.

| Operator   | Relevant Types                       | Description                                                                      | Example      |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------------- | ------------ |
| `+`        | [int], [float]                       | Addition                                                                         | `1 + 2`      |
| `+=`       | [int], [float]                       | Addition                                                                         | `a += 1`     |
| `-`        | [int], [float]                       | Subtraction                                                                      | `1 - 2`      |
| `-=`       | [int], [float]                       | Subtraction                                                                      | `a -= 1`     |
| `*`        | [int], [float]                       | Multiplication                                                                   | `1 * 2`      |
| `*=`       | [int], [float]                       | Multiplication                                                                   | `a *= 1`     |
| `/`        | [int], [float]                       | Division.<br/>Can cause Division by Zero for integers.                           | `1 / 2`      |
| `/=`       | [int], [float]                       | Division                                                                         | `a /= 1`     |
| `%`        | [int], [float]                       | Modulo                                                                           | `1 % 2`      |
| `%=`       | [int], [float]                       | Modulo                                                                           | `a %= 1`     |
| `-a`       | [int], [float]                       | Negation                                                                         | `-1`         |
| `a?.`      | [optional]                           | Optional                                                                         | `user?.name` |
| `a \|\| 1` | [optional]                           | Unwrap [optional] value or use default value.<br/>                               | `a \|\| 0`   |
| `a \|\| b` | [bool]                               | If `a` is `true`, returns `true` without evaluating `b`. Otherwise, returns `b`. |              |
| `a && 1`   | [bool]                               |
| `a!`       | [optional]                           | Unwrap [optional] value or panic                                                 | `a!`         |
| `a == b`   | [int], [float], [bool], [string] ... | `a` equal to `b`                                                                 | `1 == 2`     |
| `a == nil` | [optional]                           | An [optional] value equal to nil                                                 | `a == nil`   |
| `a != b`   | [int], [float], [bool], [string] ... | `a` not equal to `b`                                                             | `1 != 2`     |
| `a != nil` | [optional]                           | An [optional] value not equal to nil                                             | `a != nil`   |

```nv
test "test" {
    assert 1 + 2 == 3;
    assert 1 - 2 == -1;
    assert 1 * 2 == 2;
    assert 1 / 2 == 0;
    assert 1 % 2 == 1;
    assert 1 == 1;
    assert 1 != 2;
    assert 1 < 2;
    assert 1 <= 2;
    assert 1 > 0;
    assert 1 >= 0;
    assert -1 == -1;

    let a: string? = nil;
    assert a?.len() == nil;
    let a: string? = "Hello";
    assert a?.len() == 5;
}

test "test assignment" {
    let a = 1;
    a += 1;
    assert a == 2;

    a -= 1;
    assert a == 1;

    a *= 2;
    assert a == 2;

    a /= 2;
    assert a == 1;

    let a = 10;
    a %= 3;
    assert a == 1;
}
```

Output:

```shell
$ navi test
Testing .
test main.nv .. ok in 1ms
All 2 tests 2 passed finished in 0.02s.
```

## Array

Array is a collection of items, in Navi array is a mutable collection.

Use `[type] {}` to declare an array, every array must have a type, you can't create an array without a type.

```nv
struct Item {
    name: string
}

test "array" {
    let a: [int] = [int] { 1, 2, 3 };
    let b = [string] { "Rust", "Navi" };

    assert a.len() == 3;
    assert b.len() == 2;

    // get array item
    assert a[1] == 2;
    assert b[0] == "Rust";

    // set array item
    a[1] = 3;
    assert a[1] == 3;

    // Init a struct array
    let items = [Item] {
        Item { name: "foo" },
        Item { name: "bar" },
        Item { name: "baz" }
    };
    assert_eq items[2].name, "baz";


}
```

If you decalre the array type, then you can assigment a array without the type prefix.

```nv
let items: [string] = { "Rust", "Navi" };

fn receive_method(items: [string]) {
    // ...
}

receive_method({ "Rust", "Navi" });
```

### Get & Set Item

Use `[idx]`, `[idx]=` to get and set an item from the array, the index must be an [int] type.

```nv,should_panic
let a = [string] { "Rust", "Navi" };

a[0]; // "Rust"
a[1]; // "Navi"
a[2]; // panic: index out of bounds

a[0] = "Rust 1";
a[0]; // "Rust 1"
```

### Mutate Array

There are `push`, `pop`, `shift`, `unshift` ... methods in Array, you can use them to mutate an array.

```nv
test "push | pop" {
    let items = [string] {};
    items.push("foo");
    items.push("bar");

    assert_eq items.len(), 2;
    assert_eq items[0], "foo";
    assert_eq items[1], "bar";

    assert_eq items.pop(), "bar";
    assert_eq items.pop(), "foo";
    assert_eq items.pop(), nil;
}

test "shift | unshift" {
    let items = [string] {};
    items.unshift("foo");
    items.unshift("bar");

    assert_eq items.len(), 2;
    assert_eq items[0], "bar";
    assert_eq items[1], "foo";

    assert_eq items.shift(), "bar";
    assert_eq items.len(), 1;
    assert_eq items.shift(), "foo";
    assert_eq items.len(), 0;
    assert_eq items.shift(), nil;

    let items = [string] { "foo", "bar" };
    assert_eq items.shift(), "foo";
    assert_eq items.len(), 1;
    assert_eq items.shift(), "bar";
    assert_eq items.len(), 0;
    assert_eq items.shift(), nil;
}
```

### Nested Array

The array can be nested.

```nv
let items = [[string]] {
    [string] { "foo", "bar" },
    [string] { "baz", "qux" }
};
let numbers = [[int]] {
    [int] { 1, 2 },
    [int] { 3, 4 }
};
```

## Struct

The Navi struct is a collection of fields, and it is a [value] type, it's like a struct in Go and Rust.

### Declare a Struct

Use the `struct` keyword to declare a struct, and use `.` to access a field.

- The struct name must be an [identifier] with `CamelCase` style, e.g.: `User`, `UserGroup`, `UserGroupItem`.
- And the field name must be an [identifier], with `snake_case` style, e.g.: `user_name`, `user_group`, `user_group_item`.
- The filed type can be a type or an [optional] type.
- The field can have a default value, e.g.: `confirmed: bool = false`, and then you can create a struct instance without the `confirmed` field.

```nv
struct User {
    name: string,
    id: int,
    profile: Profile?,
    // default value is `false`
    confirmed: bool = false,
}

struct Profile {
    bio: string?,
    city: string?,
    tags: [string] = [string] {},
}
```

To create a struct instance, use `StructName { field: value }` syntax.

::: info
In the current version, you must assign `nil` to an [optional] field if you don't want to set a [value].

We will support [optional] field default value to `nil` in the future.
:::

```nv, ignore
test "user" {
    let user = User {
        name: "Jason Lee",
        id: 1,
        profile: {
            bio: nil,
            city: "Chengdu",
        },
    };

    assert_eq user.name, "Jason Lee";
    assert_eq user.confirmed, false;
    assert_eq user.profile?.bio, nil;
    assert_eq user.profile?.city, "Chengdu";
    assert_eq user.tags.len(), 0;
}
```

### Implement a Struct

Use `impl` to declare a struct method. The `self` is a keyword, it is a reference to the current struct instance.
Unlike Rust, you don't need to declare `self` as the first parameter.

```nv, ignore
impl User {
    fn new(name: string): User {
        return User {
            name: name,
            id: 0,
            profile: nil,
        };
    }

    fn say(self): string {
        return `Hello ${self.name}!`;
    }
}
```

- `new` is a **Static Method**, and it can call by `User.new`.
- `say` is a **Instance Method**, and it can call by `user.say()`.

```nv, ignore
fn main() throws {
    let user = User.new("Sunli", 1);
    io.println(user.say());
}
```

## Interface

The Navi interface is a collection of methods, and it is a [value] type, it's like an interface in Go.

### Declare an Interface

Use the `interface` keyword to declare an interface, and use `.` to access a method.

- The interface name must be an [identifier] with `CamelCase` style, e.g.: `ToString`, `Reader`, `Writer`.
- And the method name must be an [identifier], with `snake_case` style, e.g.: `to_string`, `read`, `write`.
- The first argument of the method must be `self`, it is a reference to the current struct instance.

```nv
interface ToString {
    fn to_string(self): string;
}

interface Reader {
    fn read(self): string;
}

fn read_all(reader: Reader): ToString {
    let s = reader.read();
    // Navi's string has a `to_string` method.
    return s;
}
```

### Implement an Interface

If any struct has all methods of an interface, it will implement the interface.

```nv
interface ToString {
    fn to_string(self): string;
}

interface Reader {
    fn read(self): string;
}

struct User {
    name: string
}

impl User {
    fn to_string(self): string {
        return `${self.name}`;
    }

    fn read(self): string {
        return `Hello ${self.name}!`;
    }
}
```

Now we can use a `User` type as a `ToString` or a `Reader` interface.

```nv, ignore
fn foo(item: ToString) {
    io.println(item.to_string());
}

fn read_info(item: Reader) {
    io.println(item.read());
}

fn main() throws {
    let user = User {
        name: "Sunli",
    };

    foo(user);
    read_info(user);
}
```

### Type Assertion

Use `.(type)` to assert an interfacce to a type.

```nv, compile_fail
interface ToString {
    fn to_string(): string;
}

struct User {
}

impl User {
    fn to_string(): string {
        return "User";
    }
}

let a: ToString = "hello";
// Cast a from interface to string.
let b = a.(string);
// now b is a `string`.

let user: ToString = User {};
// Cast user from interface to User.
let user = user.(User);
// now use is `User`.
let user = user.(string); // panic: User can't cast to string.
```

## Switch

The `switch` statement is used to execute one of many blocks of code.

```nv,no_run
use std.io;

fn get_message(n: int): string {
    let message = "";

    switch (n) {
        case 1:
            message = "One";
        case 2:
            message = "Two";
        default:
            message = "Other";
    }

    return message;
}

fn main() throws {
    io.println(get_message(1));
    io.println(get_message(2));
    io.println(get_message(3));
}
```

Output:

```shell
$ navi run
One
Two
Other
```

Use the `switch` keyword to declare a switch statement, the condition must have `()` and return a value. And use `case` and `default` to declare a case.
The `default` case is optional, which means if the condition does not match any case, it will execute the `default` case.

You can also use `{}` to declare a [block] in case of more complex logic.

```nv
fn get_message(n: int): string {
    let message = "";
    switch (n) {
        case 1:
            message = "One";
        case 2:
            message = "Two";
        default:
            message = "Other";
    }

    return message;
}
```

### Type switch

The `switch` can also used to assert the dynamic type of an interface variable. Use `let t = val.(type)` to assert the type of `val` in the switch condition.

```nv
fn type_name(val: any): string {
    switch (let t = val.(type)) {
    case int:
        return "int";
    case string:
        return "string";
    case float:
        return "float";
    case bool:
        return "bool";
    case <string, int>:
        return "map";
    default:
        return "unknown";
    }
}

test "type_name" {
    assert_eq type_name(1), "int";
    assert_eq type_name("hello"), "string";
    assert_eq type_name(3.14), "float";
    assert_eq type_name(true), "bool";
    assert_eq type_name(<string, int> {}), "map";
    assert_eq type_name([int] {}), "unknown";
}
```

## While

A while loop is used to repeatedly execute an expression until some condition is no longer true.

Use the `while` keyword to declare a while loop, the condition is an [expression] in `()` that returns a [bool] value.

```nv,no_run
use std.io;

fn main() throws {
    let n = 0;
    while (n < 5) {
        io.println(`${n}`);
        n += 1;
    }
}
```

Output:

```shell
$ navi run
0
1
2
3
4
```

Use the `break` keyword to exit a while loop.

```nv,no_run
use std.io;

fn main() throws {
    let n = 0;
    while (true) {
        io.println(`${n}`);
        n += 1;
        if (n == 2) {
            break;
        }
    }
}
```

Output:

```shell
$ navi run
0
1
```

Use `continue` to jump back to the beginning of the loop.

```nv,no_run
use std.io;

fn main() throws {
    let n = 0;
    while (n < 5) {
        n += 1;
        if (n % 2 == 0) {
            continue;
        }
        io.println(`${n}`);
    }
}
```

Output:

```shell
$ navi run
1
3
5
```

## For

For loops are used to iterate over a range, an array, or a map.

Like `while` loop, you can use `break` and `continue` to control the loop.

### Iter a Range {#range}

The range `start..end` contains all values with `start <= x < end`. It is empty if `start >= end`.

The `for (let i in start..end)` statement is used to iterate over a `range`.

```nv,no_run
use std.io;

fn main() throws {
    for (let n in 0..5) {
        if (n % 2 == 0) {
            continue;
        }
        io.println(`n: ${n}`);
    }
}
```

Output:

```shell
$ navi run
n: 1
n: 3
```

Use `step` method to crate a new range with a step.

```nv
let items = [int] {};
for (let i in (1..10).step(2)) {
    items.push(i);
}
assert_eq items, [int] { 1, 3, 5, 7, 9 };
```

### Iter an Array

The `for (let item in array)` statement is used to iterate over an [array].

```nv,no_run
use std.io;

fn main() throws {
    let items = [string] { "foo", "bar", "baz" };
    for (let item in items) {
        io.println(item);
    }
}
```

Output:

```shell
$ navi run
foo
bar
baz
```

### Iter a Map

The `for (let k, v in map)` statement is used to iterate over a [map].

```nv
let items = <string, string> {
    "title": "Navi",
    "url": "https://navi-lang.org"
};

let result = [string] {};
for (let k, v in items) {
    result.push(`${k}: ${v}`);
}
assert_eq result.join(", "), "title: Navi, url: https://navi-lang.org";
```

Output:

```shell
$ navi run
title: Navi
url: https://navi-lang.org
```

## If

Like most programming languages, Navi has the `if` statement for conditional execution.

```nv,no_run
use std.io;

fn main() throws {
    let n = 1;
    if (n == 1) {
        io.println("One");
    } else if (n == 2) {
        io.println("Two");
    } else if (n == 3) {
        io.println("Three");
    } else {
        io.println("Other");
    }
}
```

### If let

The `if let` statement is used to match an [optional] value.

```nv,no_run
use std.io;

fn get_a(a: string?) {
    if (let a = a) {
        io.println(a);
    } else {
        io.println("a is nil");
    }
}

fn main() throws {
    get_a("foo");
    get_a(nil);
}
```

Output:

```shell
$ navi run
foo
a is nil
```

## Function

Use `fn` keyword to declare a function, the function name must be an [identifier], and the function body must be a [block].

::: info
Navi recommends using `snake_case` for the function name, e.g.: `send_message`, `get_user`, `get_user_by_id`.

And the argument name also uses `snake_case`, e.g.: `title`, `user_id`.
:::

You can define a function in the module level, or in a struct `impl` block.

- The function name must be an [identifier].
- The arguments can be [normal arguments] or [keyword arguments].

```nv,no_run
use std.io;

fn add(a: int, b: int, mode: string = "+"): string {
    let result = a + b;
    return `${a} + ${b} = ${result}`;
}

struct User {
    name: string,
}

impl User {
    fn say(self): string {
        return `Hello ${self.name}!`;
    }
}

fn main() throws {
    io.println(add(1, 2));
    let user = User { name: "Navi" };
    io.println(user.say());
}
```

Output:

```shell
$ navi run
a + b = 3
Hello Navi!
```

### Normal Arguments

Normal arguments are arguments that are passed by position.

Use `name: type` to declare a normal argument, you can put a normal argument after the keyword argument.

```nv
fn add(a: int, b: int, mode: string = "+"): string {
    let result = a + b;
    return `${a} + ${b} = ${result}`;
}
```

To define an [optional] type for an argument, we use `?` after the type, e.g.: `b: int?`.

```nv,no_run
use std.io;

fn add(a: int, b: int?): string {
    // unwrap b or default to 0
    let b = b || 0;

    let result = a + b;
    return `${a} + ${b} = ${result}`;
}

fn main() throws {
    io.println(add(1, 2));
    io.println(add(1, nil));
}
```

Output:

```shell
$ navi run
1 + 2 = 3
1 + 0 = 1
```

### Keyword Arguments

Keyword arguments are arguments that are passed by name. They are useful when a function has many arguments or default arguments.

Use `name: value = default` to declare a keyword argument, the keyword argument must be after normal arguments.

```nv,no_run
use std.io;

fn add(a: int, b: int, mode: string = "+", debug: bool = false): string {
    if (debug) {
        return `a: ${a}, b: ${b}, mode: ${mode}`;
    }

    let result: int = 0;

    if (mode == "-") {
        result = a + b;
    } else {
        result = a - b;
    }

    return `${a} ${mode} ${b} = ${result}`;
}

fn main() throws {
    io.println(add(1, 2));
    io.println(add(1, 2, mode: "+"));
    io.println(add(1, 2, mode: "-"));
    io.println(add(1, 2, mode: "-", debug: true));
    io.println(add(1, 2, debug: true, mode: "+"));
    io.println(add(1, 2, debug: true));
}
```

Output:

```shell
$ navi run
1 + 2 = -1
1 + 2 = -1
1 - 2 = 3
a: 1, b: 2, mode: -
a: 1, b: 2, mode: +
a: 1, b: 2, mode: +
```

## Optional

Navi provides a modern optional type, which is similar to Rust's `Option` type, to give us a safe way to handle `nil` value, we can avoid the `null pointer exception` in runtime.

Use `type?` to declare an optional type, e.g.: `string?`, `int?`, `float?`, `bool?`, `User?` ...

```nv
// a normal string
let name: string = "Navi";

// an optional string
let optional_name: string? = "Navi";
let optional_name: string? = nil;
```

Now the `optional_name` is an [optional] type, it can be a [string] or `nil`.

### Unwrap Optional

The `!` operator is used to unwrap an [optional] value, if the value is `nil`, it will panic.
It is useful when you want to get a [value] from an [optional] value and you are sure it is not `nil`.

::: warning NOTE
To keep your code safe, when you use `!`, you must be sure it is not `nil`.

If not, don't use it, the [value || default](#unwrap-or-default) is a better way to get a [value] from an [optional] value.
:::

```nv,should_panic
use std.io;

fn main() throws {
    let name: string? = "Navi";
    // This is ok.
    io.println(name!);

    let name: string? = nil;
    // This will cause a panic.
    io.println(name!);
}
```

### Unwrap or Default

The `||` operator is used to unwrap an [optional] value, if the value is `nil`, it will return the default value.

Right side of `||` can be a [value] or an [expression] that returns a [value], if the left side is not nill, the right side will not be evaluated.

```nv
use std.io;

test "unwrap or default" {
    let name: string? = "Navi";
    let result = name || "";
    // result is a string type
    assert_eq result, "Navi";

    let name: string? = nil;
    let result = name || "";
    // result is a string type
    assert_eq result, "";
}
```

## Error

The `throws` keyword on a function to describe that the function can be thrown an error.

::: warning NOTE
All function that signature is `throws` must use `try`, `try?` or `try!` keyword before it when you call it.
:::

| Keyword   | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `throws`  | The function can throw an error.                             |
| `try`     | The error will be thrown, if the function throws an error.   |
| `try?`    | If error is thrown, the `try?` will return `nil`.            |
| `try!`    | If error is thrown, the `try!` will panic.                   |
| `throw`   | Throw an error.                                              |
| `do`      | The `do` block is used to handle an error.                   |
| `catch`   | The `catch` block is used to match an error interface.       |
| `finally` | The `finally` block is optional, it will always be executed. |

### Error Type

By default, `throw` can throw with a [string] or a custom error type that implement the `error` interface.

::: info TIP
Because Navi has implemented the `error` interface for [string], so you can throw a [string] directly.
:::

```nv
interface error {
    fn error(self): string;
}
```

So you can just throw [string]:

```nv, ignore
throw "error message";
```

Or implement the `error` interface for a custom error type:

```nv, ignore
struct MyError {
    message: string
}

impl MyError {
    // Implement the `error` method for `MyError` struct, then `MyError` can be used as an `error` interface.
    fn error(self): string {
        return self.message;
    }
}
```

We can use `throws` to declare an error type, or keep it empty to use default error.

```nv, ignore
fn hello(name: string): string throws {
    if (name == "Navi") {
        throw "name can't be Navi";
    }
    return `Hello ${name}!`;
}

fn hello_with_custom_error(name: string): string throws MyError {
    if (name == "Navi") {
        throw MyError { message: "name can't be Navi" };
    }
    return `Hello ${name}!`;
}
```

For example:

```nv,no_run
use std.io;

fn hello(name: string): string throws {
    if (name == "Navi") {
        throw "name can't be Navi";
    }
    return `Hello ${name}!`;
}

fn main() throws {
    let result = try? hello("Navi");
    io.println(`${result}`);
}
```

### Catch Error

Use `do ... catch` statement to catch an error.

- The `do` block, you must use `try` keyword before the all functions that can throw an error.
- The `catch` block use to match an error interface, it can have multiple `catch` blocks to match different error types.
- And the `finally` block is optional, it will always be executed.

Every types that implement the `error` method can be used as an `error` interface.

```nv,ignore
use std.io;

struct MyError {
    message: string
}

impl MyError {
    // Implement the `error` method for `MyError` struct, then `MyError` can be used as an error interface.
    fn error(): string {
        return self.message;
    }
}

fn hello(name: string): string throws {
    if (name == "Navi") {
        throw "name can't be Navi";
    }
    return `Hello ${name}!`;
}

do {
    let result = try hello("Navi");
    io.println(result);
    let result1 = try hello("Sunli");
} catch (e) {
    io.println(e.error());
} catch (e: MyError) {
    // ...
} finally {
    // This block always be executed.
}
```

### Handle Error

#### try

If the function throws an error, the `try` will throw the error.

```nv, no_run
fn hello(name: string): string throws {
    if (name == "Navi") {
        throw "name can't be Navi";
    }
    return `Hello ${name}!`;
}

fn main() throws {
    let result = try hello("Navi");
    // if error is thrown, the `try` will throw the error.
}
```

#### try?

If the function throws an error, the `try?` will return `nil`.

```nv, ignore
let result = try? hello("Navi");
assert_eq result, nil;

let result = try? hello("Sunli");
assert_eq result, "Hello Sunli!";
```

#### try!

If the function throws an error, the `try!` will panic.

```nv, ignore
let result = try! hello("Navi");
// This will cause a panic. It same as:
```

## Use

The `use` keyword is used to import a module from the standard library or a file.

```nv
use std.io;
use std.url.URL;

fn main() throws {
    let url = try URL.parse("https://navi-lang.org");
    assert_eq url.host, "navi-lang.org";
}
```

When you import, the last part of the module name is the name of the module, e.g.: `use std.io` to `io`, `std.url.URL` to `URL`, `std.net.http` to `http`.

### Alias

Sometime we may want to use a different name for a module, we can use `as` to import a module with an alias.

```nv
use std.url.URL as BaseURL;

let url = try! BaseURL.parse("https://navi-lang.org");
assert_eq url.host, "navi-lang.org";
```

### Use multiple modules

We can use multiple modules by once `use`.

```nv
use std.{io, url.URL};

fn main() throws {
    let url = try URL.parse("https://navi-lang.org");
    assert_eq url.host, "navi-lang.org";
}
```

### Import a Module from local

In Navi a folder in the current directory is a module, and the module name is the folder name.

For example, we have a struct:

```shell
$ tree
main.nv
models
|── profile
|   |── a.nv
|   └── b.nv
└── user.nv
utils
|── string.nv
└── url.nv
```

Now you can import them in `main.nv`:

```nv,ignore
use models;
use models.profile;
use utils;
```

## Module System

In Navi a folder in the current directory is a module, and the module name is the folder name.

- The root directory as the `main` module, and use `main.nv` as the entry file by default.
- The any sub-directory as a sub-module, and `use` the directory name as the module name.
- The root directory can have multiple entry files, and you can use `navi run filename.nv` to run it in directly.
- The `pub` keyword is used to export a `struct`, `struct field`, `interface`, `function`, `type`, `enum`, `const`, `let`, then the other modules can use it.

For example, we have a project like this:

```shell
$ tree
main.nv
utils.nv
models
|── user_profile.nv
|── user_profile
|   |── profile_a.nv
|   └── profile_b.nv
config
|── config_a.nv
└── config_b.nv
```

In this case:

- `main.nv` file is a module named `main` and Navi use `main.nv` as the entry file by default.
- `utils.nv` file is a module named `utils`, we can use it in `main.nv` by `use utils`.
- `models` directory is a module named `models`.
- `models/user_profile.nv` will be compiled to `models` module.
- `models/user_profile` directory is a module named `models.user_profile`.
- `modles/user_profile/*.nv` files will be compiled to `models.user_profile` module, they are same like one file.
- `config` directory is a module named `config`.
- `config/*.nv` files will be compiled to `config` module, they are same like one file.

::: warning NOTE
If your project have multiple sub-modules, you need to link them by `use` keyword to let the Navi compiler know the module dependency.

Only the used modules will be compiled, this means `navi test` or other commands will not found the sub-directory modules if you don't use them.
:::

For example, in `main.nv`:

```nv, ignore
use utils;
use models;
use config;

fn main() throws {
}
```

## Type alias

Use `type` keyword to create a type alias.

```nv
type Key = string;
type Value = int;

type MyInfo = <Key, Value>;

let info: MyInfo = {
    "foo": 1,
    "bar": 2,
};

assert_eq info["foo"], 1;
assert_eq info["bar"], 2;
```

## Defer

The `defer` keyword used to execute a block of code when the current function returns.

This is most like Go's `defer` keyword. It is useful when you want to do some clean up work, e.g.: close a file, close a database connection, etc.

```nv, no_run
use std.io;

fn main() throws {
    defer {
        io.println("defer 1");
    }
    defer {
        io.println("defer 2");
    }
    io.println("Hello");
}
```

Output:

```shell
$ navi run
Hello
defer 2
defer 1
```

## Spawn

Navi has a `spawn` keyword for spawn a coroutine, it is similar to Go's `go` keyword.

```nv,no_run
use std.io;

fn main() throws {
    spawn {
        io.println("Hello");
    }
    io.println("World");
}
```

Unlike Go, Navi is a single-thread language, so the `spawn` is to make code run concurrently, not parallelism.

![Difference in execution](https://github.com/navi-language/navi/assets/5518/66bba4f1-6147-4c36-ab42-438408ee994d)

> Graph from [Concurrency is NOT Parallelism]

See also:

- [Concurrency is NOT Parallelism]

## Channel

TODO

## Keywords

The following are reserved keywords in Navi, they can't be used as [identifier].

| Keyword                     | Description                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `as`                        | Convert a value to a type.                                                                 |
| `assert_eq`                 | assert equal                                                                               |
| `assert_ne`                 | assert not equal                                                                           |
| `assert`                    | assert                                                                                     |
| `bench`                     | Benchmark function                                                                         |
| `benches`                   | Benchmark group                                                                            |
| `break`                     | `break` is used to exit a loop before iteration completes naturally.                       |
| `case`                      | `case` for `switch` statement.                                                             |
| `catch`                     | Use `catch` to catch an error.                                                             |
| `continue`                  | `continue` can be used in a loop to jump back to the beginning of the loop.                |
| `default`                   | `default` case for `switch` statement.                                                     |
| `defer`                     | Execute a block of code when the current function returns.                                 |
| `do`                        | Use `do` to handle an error.                                                               |
| `else`                      | `else` can be used to provide an alternate branch for [if], [switch], [while] expressions. |
| `enum`                      | Define an enum.                                                                            |
| `false`                     | false                                                                                      |
| `finally`                   | Use `finally` to execute a block of code after `try` and `catch` blocks.                   |
| `fn`                        | Declare a function.                                                                        |
| `for`                       | [for] loop                                                                                 |
| `if`                        | [if] statement                                                                             |
| `impl`                      | Declare a struct implementation.                                                           |
| `in`                        | key use in [for] loop                                                                      |
| `interface`                 | Define a [interface]                                                                       |
| `let`                       | Declare a variable.                                                                        |
| `loop`                      | an infinite [loop]                                                                         |
| `nil`                       | An [optional] value of nil.                                                                |
| `panic`                     | Panic an error.                                                                            |
| `pub`                       | Mark a function, struct, interface or enum as public.                                      |
| `return`                    | Return a value from a function.                                                            |
| `select`                    | Use to select a [channel].                                                                 |
| `self`                      | A reference to the current struct instance.                                                |
| `spawn`                     | [Spawn] a coroutine.                                                                       |
| `struct`                    | Define a struct.                                                                           |
| `switch`                    | [switch] statement                                                                         |
| `test`                      | Test function                                                                              |
| `tests`                     | Test group                                                                                 |
| `throw`                     | Throw an error.                                                                            |
| `throws`                    | Declare a function can throw an [error].                                                   |
| `true`                      | true                                                                                       |
| `try`<br/>`try?`<br/>`try!` | Use `try` to handle an error.                                                              |
| `type`                      | Create a type alias.                                                                       |
| `use`                       | [use] a module from the standard library or a file.                                        |
| `while`                     | [while] loop                                                                               |

[Primitive Types]: #primitive-types
[Use]: #use
[Intergers]: #int
[int]: #int
[string]: #string
[Floats]: #float
[float]: #float
[optional]: #optional
[bool]: #bool
[String interpolation]: #string-interpolation
[identifier]: #identifier
[identifiers]: #identifier
[values]: #value
[value]: #value
[block]: #block
[expression]: #expression
[normal arguments]: #normal-arguments
[Keyword Arguments]: #keyword-arguments
[Kw Argument]: #keyword-arguments
[while]: #while
[loop]: #loop
[for]: #for
[switch]: #switch
[if]: #if
[channel]: #channel
[spawn]: #spawn
[unwrap || default]: #unwrap-or-default
[Unwrap or Default]: #unwrap-or-default
[Concurrency is NOT Parallelism]: https://ics.uci.edu/~rickl/courses/ics-h197/2014-fq-h197/talk-Wu-Concurrency-is-NOT-parallelism.pdf
[Error]: #error
[Type Alias]: #type-alias
[Defer]: #defer
