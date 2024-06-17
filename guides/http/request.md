# Send a HTTP request

The [std.net.http](/stdlib/std.net.http) mod provides a HTTP client to send a HTTP request to a server.

There have `request`, `get`, `post`, `put`, `delete`, `head`, `options`, `patch` functions to send a HTTP request.

## Send a GET request

```nv,no_run
use std.net.http;

struct Repo {
    id: int,
    name: string,
    full_name: string,
    // We can define the default value for the field.
    // here is means the private default value is false.
    private: bool = false,
    html_url: string,
    description: string,
}

const GITHUB_API = "https://api.github.com";

fn main() throws {
    let headers = http.Headers.new();
    headers.append("User-Agent", "Navi");
    headers.append("Accept", "application/vnd.github.v3+json");

    let res = try http.get(`${GITHUB_API}/repos/navi-language/navi`,
        headers:,
        query: {
            "t": "hello",
        },
    );

    if (res.status() != 200) {
        println("Failed to fetch repo", try res.text());
        return;
    }

    let repo = try res.json::<Repo>();
    println(`${repo.name} - ${repo.description}`);
}
```

In the above example, we send a GET request to the GitHub API to fetch the `navi-language/navi` repository information.

- We create a [Headers](/stdlib/std.net.http#std.net.http.Headers) object and set the `User-Agent` and `Accept` headers. The `User-Agent` header is required by GitHub API to identify the client. The `Accept` header is used to specify the media type of the response.
- If the request is successful, we parse the response JSON into a `Repo` struct and print the repository name and description. We use [json](/stdlib/std.net.http#Response#json) method on the Response type to parse the JSON response.
  > This is same as [json.parse](/stdlib/std.json#parse) method, but it is more convenient to use.
  >
  > ```nv, ignore
  > use std.json;
  > let repo = try json.parse::<Resp>(res.text())
  > ```
- If the request fails, we print the error message.
- The `query` argument is used to send query parameters with the request. In this example, we send a query parameter `t=hello` with the request.

After running the program, you should see the repository name and description printed on the console.

```txt
navi - https://github.com/navi-language/navi
```

::: warning NOTE

- As you see the `headers:` in the `get` function, it is a named argument. If the variable name is the same as the argument name, you can write in shortly like `headers:`, it is the same as `headers: headers`.
- The [Response#json](/stdlib/std.net.http#Response#json) method is a generic method, so you must specify the type by use `::<T>` syntax (This is the same as [json.parse](/stdlib/std.json#parse) method).
- The `res.text` and `res.json` methods can throw an error, so you should use the `try` keyword to handle the error.
- The response body is streamed, so you can't read it multiple times. The `text` and `json` methods are consuming the response body, so you can't call them multiple times.

:::

## Send a POST request

```nv,no_run
use std.net.http;
use std.json;

struct Repo {
    id: int,
    name: string,
    full_name: string,
    private: bool = false,
    html_url: string,
    description: string,
}

struct CreateRepo {
    org: string,
    repo: string,
    has_issues: bool,
}

fn main() throws {
    let headers = http.Headers.new();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer <your-github-token>");

    let payload = CreateRepo {
        org: "navi-language",
        repo: "new-repo",
        has_issues: true,
    };

    let body = try json.to_string(payload);

    let res = try http.post("https://api.github.com/repos", headers:, body:);
    if (res.status() != 201) {
        println("Failed to create repo", try res.text());
        return;
    }

    let repo = try res.json::<Repo>();
    println(`Repo ${repo.name} created successfully`);
    println(repo.html_url);
}
```

The `post` function is mostly the same as the `get` function, but it has an additional `body` argument to send the request body.

As you see in the above example, we send a POST request to create a new repository on GitHub API.

- We create a [Headers](/stdlib/std.net.http#std.net.http.Headers) object and set the `Content-Type` and `Authorization` headers. The `Content-Type` header is used to specify the media type of the request body. The `Authorization` header is used to authenticate the request. You need to replace `<your-github-token>` with your GitHub token.
- We create a JSON string for the request body. The body is a JSON object that contains the organization name, repository name, and whether the repository has issues enabled. In this example, we use the `CreateRepo` struct to represent the request body and convert it to a JSON string using the [json.to_string](/stdlib/std.json#to_string) function.

  - You can also just we a raw JSON string like:

    ```nv
    let body = `{"org": "navi-language", "repo": "new-repo", "has_issues": true}`;
    ```
