---
title: markdown
editLink: false
---

# markdown


**Module Functions**

[to_html](#to_html)

## to_html {#to_html}

```nv
fn to_html(raw: string, gfm: bool = true, html: bool = false): string throws
```

Convert Markdown to HTML.

### Kw Args

- `gfm` - Enable [GitHub Flavored Markdown](https://github.github.com/gfm/), default: `true`
- `html` - Enable raw HTML, default: `false`

```nv
use markdown;

let out = try! markdown.to_html("Hello **Markdown**!");
assert_eq out, "<p>Hello <strong>Markdown</strong>!</p>";
```


------------------------




[to_html]: #to_html