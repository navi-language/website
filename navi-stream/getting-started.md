---
order: 2
---

# Getting Started

Navi Stream is a embed language in Navi, when you installed Navi, you can use Navi Stream.

## Quick Start

Create file named `macd.nvs`

::: info
Navi Stream file extension is `.nvs`, and Navi file extension is `.nv`.
:::

```nvs
use quote, ta;

param {
    Length1 = 12,
    Length2 = 26,
    Length3 = 9,
}

let fast_ma = ema(close, Length1);
let slow_ma = ema(close, Length2);
export let hist = fast_ma - slow_ma;
export let signal = ema(hist, Length3);
export let macd = (hist - signal) * 2;
```

Make a sample JSON data named `data.json`, you can download this sample file: https://raw.githubusercontent.com/navi-language/navi/main/examples/macd/data.json

Then you can use it in Navi file, `main.nv`:

```nv
// Import `macd.nvs` file as module
use macd;
use std.fs;
use std.json;

struct Candlestick {
    time: int,
    open: float,
    high: float,
    low: float,
    close: float,
    volume: float,
    turnover: float,
}

impl Candlestick {
    fn to_string(): string {
        return `{ time: ${self.time}, open: ${self.open}, high: ${self.high}, low: ${self.low}, close: ${self.close}, volume: ${self.volume}, turnover: ${self.turnover} }`;
    }
}

fn main() throws {
    let f = fs.open("data.json");
    let data = json.parse(f.read_to_string());

    let candlesticks = [Candlestick] {};

    for (let item in data.array()!) {
        candlesticks.push(Candlestick {
            time: item.get("time")?.int()!,
            open: item.get("open")?.float()!,
            high: item.get("high")?.float()!,
            low: item.get("low")?.float()!,
            close: item.get("close")?.float()!,
            volume: item.get("volume")?.int()! as float,
            turnover: item.get("turnover")?.int()! as float
        });
    }

    // Create a Navi Stream instance
    let t = macd.new();
    for (let candlestick in candlesticks) {
        // Execute Navi Stream
        t.execute(time: candlestick.time, close: candlestick.close);
        println(candlestick.to_string());
    }
}

```

Then run it:

```bash
$ navi run main.nv
{ time: 943920000, open: 29.5, high: 29.8, low: 26.01, close: 26.4, volume: 3040519, turnover: 8408718336 }
{ time: 946512000, open: 26.31, high: 26.9, low: 24.5, close: 24.75, volume: 736270, turnover: 1889136896 }
{ time: 949017600, open: 24.98, high: 27.85, low: 23.75, close: 25.04, volume: 1965104, turnover: 4966612480 }
...
```

## Execution Mode

🛎️ Before you start using Navi Stream, you must first understand the execution mode of Navi Stream. The biggest difference between Navi Stream and general programming languages is that Navi Stream is stateful, and each calculation will affect the result of the next calculation.

The following is an example of calculating the total volume, where the second parameter of the `sum` function, the number of periods, is `0`, which means from the first value:

```nvs
// total_volume.nvs
let sumvol = math.sum(quote.vol, 0);
```

Compile the indicator to get a `Program`, and then use the `Program::instantiate` method to instantiate an executable indicator.

Now we input the first K line, the period volume is `10`:

```nv
// total_volume.nv
use total_volume;
instance.set_candlestick(Candlestick { time: 1, volume: 10, .. });
instance.calculate(StepMode::Step);
```

We can get result of:

```json
{ "sumvol": 10 }
```

Then input the second K line, the period volume is `5`:

```rust
// total_volume.rs
instance.set_candlestick(Candlestick { time: 2, volume: 5, .. });
instance.calculate(StepMode::Step);
```

Result:

```json
{ "sumvol": 15 }
```

## Step Mode

### Auto

Base on the timestamp of the input K line, if the timestamp of the current K line and the previous K line are not equal, use the previous input parameters to recalculate the value used to step the state machine in `Step` mode, and then calculate the current result in `NoStep` mode.

### Step

Current calculation needs to step the state machine.

> If you are calculating historical data and you are sure that the timestamp of each input K line is different, you should use the `Step` mode, which will avoid the `AutoStep` mode from causing repeated calculations to improve performance.

### NoStep

Current calculation does not step the state machine.
