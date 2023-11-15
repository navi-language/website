[[toc]]

## Introduction

Navi (/ˈnævi/) is a high-performance programming and stream computing language developed in Rust, originally designed for complex and high-performance computing tasks. It is also suited as a glue language embedded within heterogeneous services in financial systems.

In addition to its capabilities as a statically-typed, compiled language, Navi offers the convenience of script-like execution. It can compile source code into Bytecode (without JIT) or Machine Code (with JIT), providing a flexible development workflow. Theoretically, Navi delivering competitive performance on par with Go, Rust, and C.

### Language Design Philosophy

- **Simple and Clean Syntax**

  Designed with a straightforward and clean syntax.

- **No Implicit Type Conversion**

  The language enforces explicit type conversion to prevent unexpected behavior and errors, ensuring that data types are managed with intention and clarity.

- **Modern Optional Type and Error Handling**

  With modern optional type and error handling, Navi allows developers to gracefully manage exceptional cases and abnormal data.

- **No NULL Pointer Panic, Safe Runtime**

  No NULL pointer exceptions. Once your code compiles, you can expect consistent and reliable execution.

- **Scripted or Compilied Execution**

  Supports script-like execution, but offering same performance comparable to compiled languages like Go.

### Functionalities

- **Dual-Domain Programming**

  Serves as a dual-purpose language, functioning as both a general-purpose programming language and a domain-specific language optimized for incremental computation.

- **High Performance**

  As a statically-typed, compiled language, which is comparable to Go, Rust, and C.

- **Cross-platform**

  Running on Linux, Windows, macOS, and through WebAssembly (WASM), it extends its reach to iOS, Android, and Web Browsers.

- **Native Cloud Support (WIP)**

  With its standard library, Navi enables seamless manipulation of cloud computing resources as if they were local.

- **Native Financial Support (WIP)**

  Navi is equipped with native support for incremental financial data computation, making it ideal for real-time calculation and analysis of stock market data.
  It boasts a rich set of scientific computing capabilities, includes built-in functions for technical stock market indicators, and standard library support for
  LongPort OpenAPI, significantly reducing development costs for programmatic trading.

## Standard Library

The [Navi Standard Library] has its own documentation.

## Hello World

Write a `main.nv`, `.nv` is the file extension of Navi language.

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

> NOTE: If the file name is `main.nv` and it have `main` function. The `navi run` will use it as program entry.
> You also can execute with `navi run main.nv`.

This code sample demonstrates the basic syntax of Navi.

- The `use` keyword is used to import the `io` module from the standard library.
- The `//` is used to comment a line.
- The `fn` keyword is used to define a function.
- The `main` function is the entry point of the program.
- The `let` keyword is used to declare a variable.
- The `name` variable is a string type, or you can use `let name: string = "World";` to declare it.
- The `message` variable is defaine by a string interpolation (Like JavaScript) by use "``", and the `${name}` is a variable reference.
- The `println` function is used to print a string to the console.
- Use `;` to end a statement.
- And finally, Code style is use 4 spaces for indentation.

## Comments

Navi supports 2 types of comments (Like Rust).

### Normal Comments

The `//` started is normal comment, and it will be ignored by the compiler.

For example:

```nv
// This is a normal comment.
fn say(name: string): string {
    // This is a normal comment.
    // This is second line of normal comment.
    return `Hello ${name}!`;
}
```

There no multi-line comment in Navi. If you wants write a multi-line comment, just use `//` for each line.

### Doc Comments

A doc comment is started with `///`, and it will be parsed by the compiler and generate documentation. You can write Markdown in it.

For example:

```nv
/// A struct doc comment.
struct User {
    /// The user's name.
    name: string,
}

impl User {
  /// This is doc comment for a function.
  ///
  /// ## Args
  ///
  /// - name: The name of the person to say hello to.
  fn say(): string {
      return `Hello ${self.name}!`;
  }
}
```

## Values

### Primitive Types

| Type   | Rust Equivalent | Description           | Example               |
| ------ | --------------- | --------------------- | --------------------- |
| int    | i64             | A signed integer type | `1`, `-29`, `0`       |
| string | String          | A UTF-8 string type.  | "Hello World"         |
| bool   | bool            | A boolean type.       | `true`, `false`       |
| float  | f64             | A floating point type | `1.0`, `-29.0`, `0.0` |

In Navi we only have int (int64), and float (float64) types, there is no int8, uint8, int16, uint16, int32, uint32, float32, and etc.

### Primitive Values

| Name | Description |
| `true` and `false` | `bool` values |
| `nil` | Use to set a optional value to null |

### String Literals

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
    io.println("Unknow escape sequence: \a");
}
```

Output:

```shell
$ navi run
"Hello,
World!"
Hello, \nWorld!
Unknow escape sequence: a
```

#### String Interpolation

String interpolation is a way to construct a new String value from a mix of constants, variables, literals, and expressions by including their values inside a string literal.

Navi's string interpolation is similar to JavaScript's template literals.

```nv
let hello = `Hello, ${name}!`;

// You can write multi-line string interpolation.
let hello = `
Hello, ${name}!
`;
```

### Assignment

Use `let` keyword to declare a variable to an identifier, the variable is mutable.

> TODO: We will have `const` keyword for inmutable in the future.

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

You can use `test` keyword to declare a test function in any Navi file, it will be run when you execute `navi test`.

There have built-in `assert`, `assert_eq`, and `assert_ne` keyword for assertion.

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

The code in `test` block will be ignored by the compiler when you execute `navi run`.

### Test Declarations

You can use `test` keyword to declare a test function, followed by a string literal as the test name, and then a block of code.

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

Test runner will print the error message when a test failed, and with a `exit 1` code to let CI know the test failed.

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

## Variables

### Identifiers

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

## Integers

In Navi, the `int` type is a signed integer type, and it is 64-bit on all platforms. This means it can hold values from `-9223372036854775808` to `9223372036854775807`.

We don't have `uint` type or other integer types.

```nv
let n = 246;
let n1 = -100;
```

## Floats

Navi has a `float` type (53 bits of precision), and it is 64-bit on all platforms.

```nv
let v = 3.14;
let v1 = -2.0;
let v2 = 0.0;
let v3 = 10.23e+10;
let v4 = 2.0e+2;
```

## Operators

Like other programming languages, Navi has a set of operators for performing arithmetic and logical operations.

| Operator   | Relevant Types                                    | Description                                                                      | Example      |
| ---------- | ------------------------------------------------- | -------------------------------------------------------------------------------- | ------------ |
| `+`        | [int](#integers), [float](#floats)                | Addition                                                                         | `1 + 2`      |
| `+=`       | [int](#integers), [float](#floats)                | Addition                                                                         | `a += 1`     |
| `-`        | [int](#integers), [float](#floats)                | Subtraction                                                                      | `1 - 2`      |
| `-=`       | [int](#integers), [float](#floats)                | Subtraction                                                                      | `a -= 1`     |
| `*`        | [int](#integers), [float](#floats)                | Multiplication                                                                   | `1 * 2`      |
| `*=`       | [int](#integers), [float](#floats)                | Multiplication                                                                   | `a *= 1`     |
| `/`        | [int](#integers), [float](#floats)                | Division.<br/>Can cause Division by Zero for integers.                           | `1 / 2`      |
| `/=`       | [int](#integers), [float](#floats)                | Division                                                                         | `a /= 1`     |
| `%`        | [int](#integers), [float](#floats)                | Modulo                                                                           | `1 % 2`      |
| `%=`       | [int](#integers), [float](#floats)                | Modulo                                                                           | `a %= 1`     |
| `-a`       | [int](#integers), [float](#floats)                | Negation                                                                         | `-1`         |
| `a?.`      | [optional](#optional)                             | Optional                                                                         | `user?.name` |
| `a \|\| 1` | [optional](#optional)                             | Unwrap optional value or use default value.<br/>                                 | `a \|\| 0`   |
| `a \|\| b` | [bool](#bool)                                     | If `a` is `true`, returns `true` without evaluating `b`. Otherwise, returns `b`. |              |
| `a && 1`   | [bool](#bool)                                     |
| `a!`       | [optional](#optional)                             | Unwrap optional value or panic                                                   | `a!`         |
| `a == b`   | [int](#integers), [float](#floats), [bool](#bool) | Equal to                                                                         | `1 == 2`     |
| `a == nil` | [optional](#optional)                             | Equal to                                                                         | `a == nil`   |

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
