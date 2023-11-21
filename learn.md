[[toc]]

## Introduction

Navi (/ˈnævi/) is a high-performance programming and stream computing language developed in Rust, originally designed for complex and high-performance computing tasks. It is also suited as a glue language embedded within heterogeneous services in financial systems.

In addition to its capabilities as a statically typed, compiled language, Navi offers the convenience of script-like execution. It can compile source code into Bytecode (without JIT) or Machine Code (with JIT), providing a flexible development workflow. Theoretically, Navi delivers competitive performance on par with Go, Rust, and C.

### Language Design Philosophy

- **Simple and Clean Syntax**

  Designed with a straightforward and clean syntax.

- **No Implicit Type Conversion**

  The language enforces explicit type conversion to prevent unexpected behavior and errors, ensuring that data types are managed with intention and clarity.

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

The [Navi Standard Library] has its own documentation.

## Hello World

Write a `main.nv`, `.nv` is the file extension of the Navi language.

```nv
use std.io;

fn main() {
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
- The `main` function is the entry point of the program.
- The `let` keyword is used to declare a variable.
- The `name` variable is a string type, or you can use `let name: string = "World";` to declare it.
- The `message` variable is defined by a string interpolation (Like JavaScript) by using "``", and the `${name}` is a variable reference.
- The `println` function is used to print a string to the console.
- Use `;` to end a statement.
- Finally, the Code style uses 4 spaces for indentation.

## Comments

Navi supports 2 types of comments (Like Rust).

The `//` started is a normal comment, and it will be ignored by the compiler.

For example:

```nv
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

````nv
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
  fn say(): string {
      return `Hello ${self.name}!`;
  }
}
````

### Doctest

You can write Markdown Code Block in your doc comment, use `navi test --doc` to run the doc tests.

Like regular tests, doc tests use the `assert`, `assert_eq`, and `assert_ne` keywords for assertion.

For example:

````nv
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
/// ```nv, ignore
/// fn foo() {
/// ```
````

Expect to **panic** or **assert failed**

````nv
/// ```nv, should_panic
/// assert_eq 1 == 2;
/// ```
````

Expect to **passed compile** but **not run**

````nv
/// ```nv, no_run
/// loop { };
/// ```
````

Expect to **compile failed**

````nv
/// ```nv, compile_fail
/// a = 1
/// ```
````

## Values {#value}

### Primitive Types

| Type     | Rust Equivalent | Description           | Example               |
| -------- | --------------- | --------------------- | --------------------- |
| [int]    | i64             | A signed integer type | `1`, `-29`, `0`       |
| [string] | String          | A UTF-8 string type.  | "Hello World"         |
| [bool]   | bool            | A boolean type.       | `true`, `false`       |
| [float]  | f64             | A floating point type | `1.0`, `-29.0`, `0.0` |

In Navi we only have [int] (int64), and [float] (float64) types, there is no int8, uint8, int16, uint16, int32, uint32, float32, and etc.

### Primitive Values

| Name               | Description                            |
| ------------------ | -------------------------------------- |
| `true` and `false` | [bool] values                          |
| `nil`              | Use to set an [optional] value to null |

### String Literals {#string}

String is a UTF-8 string type, and it is immutable in Navi, all string literals are immutable.

```nv
use std.io;

fn main() {
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

```nv
use std.io;

fn main() {
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

#### String Interpolation

String interpolation is a way to construct a new String value from a mix of constants, variables, literals, and expressions by including their values inside a [string] literal.

Navi's string interpolation is similar to JavaScript's template literals.

```nv
let hello = `Hello, ${name}!`;

// You can write multi-line string interpolation.
let hello = `
Hello, ${name}!
`;
```

### Assignment

Use the `let` keyword to declare a variable to an identifier, the variable is mutable.

> TODO: We will have a `const` keyword for immutable in the future.

```nv
# main.nv
use std.io;

let name = "World";
let pi = 3.14;
let passed = true;

fn main() {
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

```nv
use std.io;

fn main() {
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

```nv
let 1name = "World";
let name-1 = "World";
// `use` is a keyword.
let use = "World";
```

### Variable Scope

Variables are scoped to the block in which they are declared. A block is a collection of statements enclosed by `{}`.

```nv
use std.io;

let name = "Name in global scope";

fn main() {
    let name = "World";
    io.println(`Hello ${name}!`);

    {
        let name = "Navi";
        io.println(`Hello ${name}!`);
    }

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

## Integer {#int}

In Navi, the `int` type is a signed integer type, and it is 64-bit on all platforms. This means it can hold values from `-9223372036854775808` to `9223372036854775807`.

We don't have `uint` type or other integer types.

```nv
let n = 246;
let n1 = -100;
```

## Float {#float}

Navi has a `float` type (53 bits of precision), and it is 64-bit on all platforms.

```nv
let v = 3.14;
let v1 = -2.0;
let v2 = 0.0;
let v3 = 10.23e+10;
let v4 = 2.0e+2;
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

### Get & Set Item

Use `[idx]`, `[idx]=` to get and set an item from the array, the index must be an [int] type.

```nv
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

```nv
struct User {
    name: string,
    id: int,
    profile: Profile?,
}

struct Profile {
    bio: string?,
    city: string?,
}
```

To create a struct instance, use `StructName { field: value }` syntax.

::: info
In the current version, you must assign `nil` to an [optional] field if you don't want to set a [value].

We will support [optional] field default value to `nil` in the future.
:::

```nv
let user = User {
    name: "Jason Lee",
    id: 1,
    profile: Profile {
        bio: nil,
        city: "Chengdu",
    },
};

test "user" {
    assert_eq user.name, "Jason Lee";
    assert_eq user.profile?.bio, nil;
    assert_eq user.profile?.city, "Chengdu";
}
```

### Implement a Struct

Use `impl` to declare a struct method. The `self` is a keyword, it is a reference to the current struct instance.
Unlike Rust, you don't need to declare `self` as the first parameter.

```nv
impl User {
    fn say(): string {
        return `Hello ${self.name}!`;
    }
}
```

::: warning
In Navi, we can't define a struct function, e.g. `User.new`, `User.create`, `User.delete`, and etc.

There just have struct instance method, `user.say()`, `user.save()`, `user.delete()`, and etc.
:::

For example:

You can define a `new_user` function in the module level, and use it to create a new struct instance.

```nv
fn new_user(name: string, id: int): User {
    return User {
        name: name,
        id: id,
        profile: nil,
    };
}

fn main() {
    let user = new_user("Sunli", 1);
    io.println(user.say());
}
```

## Block

Blocks are a collection of statements enclosed by `{}` for limiting the scope of variables and for grouping statements.

```nv
test "access variable after block scope" {
    {
        let n = 1;
    }
    // This will cause a compile error.
    assert n == 1;
}
```

Output:

```
  ┌─ main.nv:6:12
  │
6 │     assert n == 1;
  │            ^ variable `n` not exists
```

See also:

- [While]
- [Loop]

### Shadowing

[Identifiers] are never allowed to "hide" other identifiers by using the same name:

```nv
test "shadowing blocks 1" {
    let a = 1;
    {
        let a = 2;
        assert_eq a, 2;
    }
    assert_eq a, 1;
}

test "shadowing blocks 2" {
    {
        let a = 1;
        assert_eq a, 1;
    }
    {
        let a = 2;
        assert_eq a, 2;
    }
}
```

## Switch

The `switch` statement is used to execute one of many blocks of code.

```nv
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

fn main() {
    iop.println(get_message(1));
    iop.println(get_message(2));
    iop.println(get_message(3));
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
        case 1: {
            message = "One";
        }
        case 2: {
            message = "Two";
        }
        default: {
            message = "Other";
        }
    }

    return message;
}
```

## While

A while loop is used to repeatedly execute an expression until some condition is no longer true.

Use the `while` keyword to declare a while loop, the condition is an [expression] in `()` that returns a [bool] value.

```nv
use std.io;

fn main() {
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

```nv
use std.io;

fn main() {
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

```nv
use std.io;

fn main() {
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

### Iter a Range

The `for (let ...)` statement is used to iterate over a [range].

```nv
use std.io;

fn main() {
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

### Iter an Array

The `for (let ...)` statement is used to iterate over an [array].

```nv
use std.io;

fn main() {
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

### Iter Key, Value Pairs from a Map

The `for (let ...)` statement is used to iterate over a [map].

```nv
use std.io;

fn main() {
    let items = <string, string> {
        "title": "Navi",
        "url": "https://navi-lang.org"
    };

    for (let key, value in items) {
        io.println(`${key}: ${value}`);
    }
}
```

Output:

```shell
$ navi run
title: Navi
url: https://navi-lang.org
```

## If

Like most programming languages, Navi has the `if` statement for conditional execution.

```nv
use std.io;

fn main() {
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

```nv
use std.io;

fn get_a(a: string?) {
    if (let a = a) {
        io.println(a);
    } else {
        io.println("a is nil");
    }
}

fn main() {
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

```nv
use std.io;

fn add(a: int, b: int, mode: string = "+"): string {
    let result = a + b;
    return `${a} + ${b} = ${result}`;
}

struct User {
    name: string,
}

impl User {
    fn say(): string {
        return `Hello ${self.name}!`;
    }
}

fn main() {
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

```nv
use std.io;

fn add(a: int, b: int?): string {
    // unwrap b or default to 0
    let b = b || 0;

    let result = a + b;
    return `${a} + ${b} = ${result}`;
}

fn main() {
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

```nv
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

fn main() {
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

::: warning
To keep your code safe, when you use `!`, you must be sure it is not `nil`.

If not, don't use it, the [value || default](#unwrap-or-default) is a better way to get a [value] from an [optional] value.
:::

```nv
use std.io;

fn main() {
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

TODO

## Casting

TODO

## Use

The `use` keyword is used to import a module from the standard library or a file.

```nv
use std.io;
use std.url;

fn main() {
    let my_url = url.parse("https://navi-lang.org");
    io.println(my_url.host);
}
```

When you import, the last part of the module name is the name of the module, e.g.: `use std.io` to `io`, `std.url` to `url`, `std.net.http` to `http`.

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

```nv
use models;
use models.profile;
use utils;
```

## Spawn

Navi has a `spawn` keyword for spawn a coroutine, it is similar to Go's `go` keyword.

```nv
fn main() {
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

| Keyword     | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| `let`       | Declare a variable.                                                                        |
| `nil`       | An [optional] value of nil.                                                                |
| `true`      | true                                                                                       |
| `false`     | false                                                                                      |
| `for`       | [for] loop                                                                                 |
| `in`        | key use in [for] loop                                                                      |
| `while`     | [while] loop                                                                               |
| `loop`      | an infinite [loop]                                                                         |
| `continue`  | `continue` can be used in a loop to jump back to the beginning of the loop.                |
| `break`     | `break` is used to exit a loop before iteration completes naturally.                       |
| `if`        | [if] statement                                                                             |
| `else`      | `else` can be used to provide an alternate branch for [if], [switch], [while] expressions. |
| `fn`        | Declare a function.                                                                        |
| `return`    | Return a value from a function.                                                            |
| `use`       | [use] a module from the standard library or a file.                                        |
| `as`        | Convert a value to a type.                                                                 |
| `switch`    | [switch] statement                                                                         |
| `case`      | `case` for `switch` statement.                                                             |
| `default`   | `default` case for `switch` statement.                                                     |
| `struct`    | Define a struct.                                                                           |
| `spawn`     | [Spawn] a coroutine.                                                                       |
| `select`    | Use to select a [channel].                                                                 |
| `assert`    | assert                                                                                     |
| `assert_eq` | assert equal                                                                               |
| `assert_ne` | assert not equal                                                                           |
| `impl`      | Declare a struct implementation.                                                           |
| `self`      | A reference to the current struct instance.                                                |
| `test`      | Test function                                                                              |
| `bench`     | Benchmark function                                                                         |
| `tests`     | Test group                                                                                 |
| `benches`   | Benchmark group                                                                            |
| `interface` | Define a [interface]                                                                       |
| `is`        |                                                                                            |
| ---         | Reserved for future use                                                                    |
| `pub`       | TODO                                                                                       |
| `error`     | TODO                                                                                       |
| `private`   | TODO                                                                                       |
| `mod`       | TODO                                                                                       |

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

```

```
