---
order: 0
---

# Bool

Bool is a type of object that represents a boolean value.

## Create a bool

```nvs
let a = true;
let b = false;
```

## Methods

### to_string

Convert a bool to a string.

```nvs
let a = true;
a.to_string();
// "true"
```

### to_number

Convert a bool to a number.

```nvs
let a = true;
a.to_number();
// 1

a = false;
a.to_number();
// 0
```
