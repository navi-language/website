---
order: 2
---

# 字符串

我们可以使用双引号 `"` 和反引号 `` ` `` 来创建字符串字面量。

```nvs
let a = "你好世界";
let b: string = `hello world`;
```

## 字符串插值

我们可以使用 `${}` 来将一个表达式插入到字符串中，你必须使用反引号 `` ` `` 来创建一个字符串字面量。

```nvs
let a = 100;
let b = `你好 ${a + 2}`;
// b = "你好 102"
```

## 方法

### to_number

将字符串转换为数字。

```nvs
let a = "100";
a.to_number();
// 100

let b = "3.1415";
b.to_number();
// 3.1415
```

### to_lowercase

将字符串转换为小写。

```nvs
let a = "你好世界";
a.to_lowercase();
// "你好世界"
```

### to_uppercase

将字符串转换为大写。

```nvs
let a = "你好世界";
a.to_uppercase();
// "你好世界"
```

### substring

从字符串中获取一个子字符串。

```nvs
let a = "Hello World";
a.substring(0, 5);
// "Hello"
```

### replace

替换字符串中的所有匹配子字符串。

```nvs
let a = "Hello World";
let b = a.replace("Hello", "Hi");
// b is "Hi World"

a = "Hello World";
b = a.replace("l", "L");
// b is "HeLLo WorLd"
```

### len

返回字符串中的字符数。

```nvs
let a = "你好 Navi Stream 🌈";
a.len();
// 9
```

### contains

检查字符串是否包含子字符串。

```nvs
let a = "Hello World";
a.contains("Hello");
// true

a.contains("hello");
// false
```

### starts_with

检查字符串是否以子字符串开头。

```nvs
let a = "Hello World";
a.starts_with("Hello");
// true

a.starts_with("foo");
// false
```

### ends_with

检查字符串是否以子字符串结尾。

```nvs
let a = "Hello World";
a.ends_with("World");

a.ends_with("foo");
// false
```

### split

分割字符串为一个字符串列表。

```nvs
let a = "Hello World";
let b = a.split(" ");
// b is ["Hello", "World"]

b.len()
// 2
```

### trim

删除字符串两端的空白字符。

```nvs
let a = " Hello World ";
let b = a.trim();
// b is "Hello World"
```

### trim_start

删除字符串开头的空白字符。

```nvs
let a = " Hello World ";
let b = a.trim_start();
// b is "Hello World "
```

### trim_end

删除字符串末尾的空白字符。

```nvs
let a = " Hello World ";
let b = a.trim_end();
// b is " Hello World"
```
