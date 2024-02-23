---
title: sql
editLink: false
---

# sql

**Structs**

[Rows](#sql.Rows), [Transaction](#sql.Transaction), [Connection](#sql.Connection), [QueryResult](#sql.QueryResult), [Row](#sql.Row), [Statement](#sql.Statement)


------------------------

## Rows
 {#sql.Rows}

No documentation.

**Methods**

[next](#Rows#next), [scan](#Rows#scan)


---------------------------

### next {#Rows#next}

```nv
fn next(self): Row? throws
```

Return the next row of this result set.
Returns `nil` if there are no more rows.


### scan {#Rows#scan}

```nv
fn scan(self): [T] throws
```

Scan all rows and deserialize them into a `[T]`.
This is a convenience method for `rows.next().scan::<T>()`.
It will consume all rows in the result set.

```nv, no_run
use sql.Connection;

struct User {
    name: string,
    city: string,
    ###[serde(rename = "id")]
    stuff_no: int,
}

let conn = try Connection.connect("sqlite::memory:");
let users = try conn.query("SELECT * FROM users").scan::<User>();
// Now `users` is [User]
assert_eq users[0].name, "Jason Lee";
assert_eq users[0].city, "Chengdu";
assert_eq users[0].stuff_no, 100;
```




## Transaction
 {#sql.Transaction}

An in-progress database transaction or savepoint.

A transaction should end with a call to `commit` or `rollback`.

You must call `commit` or `rollback`, unless that the transaction will leak (The transaction will be rolled back on GC).

A savepoint is a special mark inside a transaction that allows all commands that are executed after it was established
to be rolled back, restoring the transaction state to what it was at the time of the savepoint.

**Methods**

[commit](#Transaction#commit), [execute](#Transaction#execute), [query](#Transaction#query), [query_one](#Transaction#query_one), [rollback](#Transaction#rollback)


---------------------------

### commit {#Transaction#commit}

```nv
fn commit(self) throws
```

Commits this transaction or savepoint.


### execute {#Transaction#execute}

```nv
fn execute(self, query: string, values: ..BindValue?): QueryResult throws
```

Execute the query and return the total number of rows affected.
See: `sql.Connection.execute`


### query {#Transaction#query}

```nv
fn query(self, query: string, values: ..BindValue?): Rows throws
```

Query and return a steam of rows.
Returns a `sql.Rows` for iterating the rows.

See: `sql.Connection.query`


### query_one {#Transaction#query_one}

```nv
fn query_one(self, query: string, values: ..BindValue?): Row? throws
```

Query and return the first row.

See: `sql.Connection.query_one`


### rollback {#Transaction#rollback}

```nv
fn rollback(self) throws
```

Aborts this transaction or savepoint.




## Connection
 {#sql.Connection}

No documentation.

**Methods**

[begin](#Connection#begin), [close](#Connection#close), [connect](#Connection.connect), [execute](#Connection#execute), [execute_many](#Connection#execute_many), [is_closed](#Connection#is_closed), [max_connections](#Connection#max_connections), [min_connections](#Connection#min_connections), [prepare](#Connection#prepare), [query](#Connection#query), [query_one](#Connection#query_one), [transaction](#Connection#transaction)


---------------------------

### connect {#Connection.connect}

```nv
fn connect(url: string, min_connections: int = 1, max_connections: int = 10): Connection throws
```

Connect to a database.

The `url` is in the format of `dialect://user:password@host:port/database`.

The dialect can be one of the following:

- `sqlite`
- `mysql`
- `postgres`

And make sure to close the connection when you don't need it anymore.

The `sqlite::memory:` URL is a special one that connects to an in-memory database with SQLite dialect.

#### Kw Args

- `min_connections`: The minimum number of connections to keep in the pool. Default is `1`.
- `max_connections`: The maximum number of connections to keep in the pool. Default is `10`.

```nv, no_run
use sql;

let conn = try! sql.connect("sqlite::memory:");
defer {
    conn.close();
}
```


### begin {#Connection#begin}

```nv
fn begin(self): Transaction throws
```

Begin a new transaction or establish a savepoint within the active transaction.

Returns a `sql.Transaction` for controlling and tracking the new transaction.

NOTE: You must call `commit` or `rollback` to finish it when you start a transaction.
If you forget to do this, the transaction will leak (The transaction will be rolled back on GC).

```nv, no_run
use sql;

let conn = try! sql.connect("sqlite::memory:");
let tx = try! conn.begin();
// To some work...
try! tx.commit();
// Or tx.rollback();
```


### close {#Connection#close}

```nv
fn close(self)
```

Close the connection.


### execute {#Connection#execute}

```nv
fn execute(self, query: string, values: ..BindValue?): QueryResult throws
```

Execute the query and return the total number of rows affected.

> This method only support execute 1 SQL statement.

For `INSERT`/`UPDATE`/`DELETE` without RETURNING.

- The first argument is the SQL statement.
- And the rest arguments are the values for the placeholders in the SQL statement.

```nv, no_run
use sql.Connection;

let conn = try! Connection.connect("sqlite::memory:");
let result = try! conn.execute("INSERT INTO users (id, name, city) VALUES (?, ?)", 100, "Jason Lee", "Chengdu");
```

> TIP: If you are use PostgreSQL, the `?` placeholder is not supported. You should use `$1`, `$2`, ...
> And the values should be in the same order as the placeholders.


### execute_many {#Connection#execute_many}

```nv
fn execute_many(self, query: string, values: ..BindValue?): [QueryResult] throws
```

Execute multiple queries in one batch. Each query must be separated by `;`.


### is_closed {#Connection#is_closed}

```nv
fn is_closed(self): bool
```

Check the connection is closed or not.
Returns `true` if the connection is closed.


### max_connections {#Connection#max_connections}

```nv
fn max_connections(self): int
```

Get max number of connections in the pool.


### min_connections {#Connection#min_connections}

```nv
fn min_connections(self): int
```

Get min number of connections in the pool.


### prepare {#Connection#prepare}

```nv
fn prepare(self, query: string): Statement throws
```

Prepare a sql statement.


### query {#Connection#query}

```nv
fn query(self, query: string, values: ..BindValue?): Rows throws
```

Query and return a steam of rows.

Returns a `sql.Rows` for iterating the rows.

```nv, no_run
use sql.Connection;

let conn = try! Connection.connect("sqlite::memory:");
let rows = try! conn.query("SELECT * FROM users WHERE status = ? OFFSET ? LIMIT ?", "active", 0, 100);
```

> TIP: If you are use PostgreSQL, the `?` placeholder is not supported. You should use `$1`, `$2`, ...
> And the values should be in the same order as the placeholders.


### query_one {#Connection#query_one}

```nv
fn query_one(self, query: string, values: ..BindValue?): Row? throws
```

Query and return the first row.

See: `sql.Connection.query`


### transaction {#Connection#transaction}

```nv
fn transaction(self, f: [(Transaction)]) throws
```

Wrap a transaction.

This will begin a new transaction and call the given function with the transaction.

If the function call is ok, it will COMMIT.
If any error is thrown, it will ROLLBACK.

```nv, no_run
use sql;

let conn = try! sql.connect("sqlite::memory:");
try conn.transaction(|tx| {
    try tx.execute("INSERT INTO users (name) VALUES ('Alice')");
    try tx.execute("INSERT INTO users (name) VALUES ('Bob')");
});
```




## QueryResult
 {#sql.QueryResult}

No documentation.

**Methods**

[last_insert_id](#QueryResult#last_insert_id), [rows_affected](#QueryResult#rows_affected), [to_string](#QueryResult#to_string)


---------------------------

### last_insert_id {#QueryResult#last_insert_id}

```nv
fn last_insert_id(self): int?
```

TODO


### rows_affected {#QueryResult#rows_affected}

```nv
fn rows_affected(self): int
```

TODO


### to_string {#QueryResult#to_string}

```nv
fn to_string(self): string
```

Impl `ToString`




## Row
 {#sql.Row}

No documentation.

**Methods**

[get](#Row#get), [len](#Row#len), [scan](#Row#scan)


---------------------------

### get {#Row#get}

```nv
fn get(self, col: int | string): T? throws
```

Return the value of a column index or name in this row.

The `col` is union type of `int` and `string`, that support use column index or column name to get value.

```nv, no_run
use sql.Connection;

let conn = try Connection.connect("sqlite::memory:");
let row = try conn.query("SELECT 1, 'hello'").next()!;
assert try row.get::<int?>(0) == 1;
assert try row.get::<string?>(1) == "hello";
```

#### PostgreSQL

- [PostgreSQL Data Types](https://www.postgresql.org/docs/9.5/datatype.html)

| Column Type                                             | Navi Type   | Description |
| ------------------------------------------------------- | ----------- | ----------- |
| `SMALLSERIAL`, `SERIAL`, `BIGSERIAL`                    | `int`       |             |
| `INTERVAL`                                              | NOT SUPPORT |             |
| `CHARACTER VARYING`, `VARCHAR`                          | `string`    |             |
| `TEXT`                                                  | `string`    |             |
| `VARCHAR[]`                                             | `[string]`  |             |
| `INT[]`, `BIGINT[]`                                     | `[int]`     |             |
| `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INTEGER`, `BIGINT` | `int`       |             |
| `DECIMAL`, `NUMERIC`                                    | TODO        |             |
| `REAL`, `DOUBLE`                                        | `float`     |             |
| `FLOAT[]`                                               | `[float]`   |             |
| `BIT`                                                   | `bool`      |             |
| `DATE`, `TIME`, `TIMESTAMP`, `TIMESTAMPTZ`              | `string`    |             |
| `JSON`                                                  | NOT SUPPORT |             |
| `ENUM`                                                  | `string`    |             |

#### MySQL

- [MySQL Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

| Column Type                                                                    | Navi Type   | Description |
| ------------------------------------------------------------------------------ | ----------- | ----------- |
| `CHAR`, `VARCHAR`                                                              | `string`    |             |
| `TEXT`                                                                         | `string`    |             |
| `BINARY`, `VARBINARY`                                                          | NOT SUPPORT |             |
| `ENUM`                                                                         | `string`    |             |
| `INTEGER`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `BIGINT`, `INT2`, `INT8` | `int`       |             |
| `DECIMAL`                                                                      | TODO        |             |
| `FLOAT`, `DOUBLE`                                                              | `float`     |             |
| `SET`                                                                          | `string`    |             |
| `BLOB`                                                                         | NOT SUPPORT |             |
| `BIT`                                                                          | `bool`      |             |
| `DATE`, `DATETIME`, `TIMESTAMP`, `TIME`, `TIMESTAMPTZ`                         | `string`    |             |
| `JSON`                                                                         | NOT SUPPORT |             |

#### SQLite

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

| Column Type                                                               | Navi Type   | Description |
| ------------------------------------------------------------------------- | ----------- | ----------- |
| `INT`, `INTEGER`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`            | `int`       |             |
| `UNSIGNED BIG INT`, `INT2`, `INT8`                                        | `int`       |             |
| `CHARACTER(20)`, `VARCHAR(255)`, `VARYING CHARACTER(255)`, `TEXT`, `CLOB` | `string`    |             |
| `NCHAR(55)`, `NATIVE CHARACTER(70)`, `NVARCHAR(100)`                      | `string`    |
| `REAL`, `DOUBLE`, `DOUBLE PRECISION`, `FLOAT`                             | `float`     |             |
| `BOOLEAN`                                                                 | `bool`      |             |
| `BLOB`                                                                    | NOT SUPPORT |             |
| `DATE`, `DATETIME`, `TIMESTAMP`                                           | `string`    |             |
| `DECIMAL`                                                                 | TODO        |             |


### len {#Row#len}

```nv
fn len(self): int
```

Return number of columns in this row.


### scan {#Row#scan}

```nv
fn scan(self): T throws
```

Scan the values of this row into the given variables.

See also: `get` method for more details about the supported types and how they are mapped.

```nv, no_run
struct User {
    name: string,
    city: string,
    ###[serde(rename = "id")]
    stuff_no: int,
}

let conn = try Connection.connect("sqlite::memory:");
let row = try conn.query_one("SELECT * FROM users LIMIT 1");
let user = try row.scan::<User>();
assert_eq user.name, "Jason Lee";
assert_eq user.city, "Chengdu";
assert_eq user.stuff_no, 1001;
```




## Statement
 {#sql.Statement}

An explicitly prepared statement.

Statements are prepared and cached by default, per connection.
This type allows you to look at that cache in-between the statement being prepared and it being executed.
This contains the expected columns to be returned and the expected parameter types (if available).

Statements can be re-used with any connection and on first-use it will be re-prepared and cached within the connection.

**Methods**

[execute](#Statement#execute), [query](#Statement#query), [query_one](#Statement#query_one), [sql](#Statement#sql)


---------------------------

### execute {#Statement#execute}

```nv
fn execute(self, values: ..BindValue?): QueryResult throws
```

Execute the statement with the given values to bind to the parameters.
Returns the `QueryResult`.

```nv, no_run
let stmt = try conn.prepare("UPDATE users SET name = ? WHERE id = ?");
let result = try stmt.execute("Alice", 1);
```


### query {#Statement#query}

```nv
fn query(self, values: ..BindValue?): Rows throws
```

Query the statement with the given values to bind to the parameters and return the resulting rows.

```nv, no_run
let stmt = try conn.prepare("SELECT * FROM users WHERE id = ?");
let rows = try stmt.query(1);
```


### query_one {#Statement#query_one}

```nv
fn query_one(self, values: ..BindValue?): Row? throws
```

Query and return the first row.

See: `sql.Statement.query`

```nv, no_run
let stmt = try conn.prepare("SELECT * FROM users WHERE id = ?");
let row = try stmt.query_one(1)!;
let name = row.get::<string>("name");
```


### sql {#Statement#sql}

```nv
fn sql(self): string
```

The SQL of the statement.






[next]: #Rows#next
[scan]: #Rows#scan
[commit]: #Transaction#commit
[execute]: #Transaction#execute
[query]: #Transaction#query
[query_one]: #Transaction#query_one
[rollback]: #Transaction#rollback
[connect]: #Connection.connect
[begin]: #Connection#begin
[close]: #Connection#close
[execute]: #Connection#execute
[execute_many]: #Connection#execute_many
[is_closed]: #Connection#is_closed
[max_connections]: #Connection#max_connections
[min_connections]: #Connection#min_connections
[prepare]: #Connection#prepare
[query]: #Connection#query
[query_one]: #Connection#query_one
[transaction]: #Connection#transaction
[last_insert_id]: #QueryResult#last_insert_id
[rows_affected]: #QueryResult#rows_affected
[to_string]: #QueryResult#to_string
[get]: #Row#get
[len]: #Row#len
[scan]: #Row#scan
[execute]: #Statement#execute
[query]: #Statement#query
[query_one]: #Statement#query_one
[sql]: #Statement#sql