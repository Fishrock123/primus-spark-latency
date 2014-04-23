# primus-spark-latency [![Build Status](https://travis-ci.org/Fishrock123/primus-spark-latency.svg)](https://travis-ci.org/Fishrock123/primus-spark-latency) [![NPM version](https://badge.fury.io/js/primus-spark-latency.svg)](http://badge.fury.io/js/primus-spark-latency)

Adds a `latency` property to [primus](https://github.com/primus/primus) sparks server-side.

The property is set on connection, and on each subsequent ping.

## API

### spark.latency

Numeric value (ms) of client latency.

```js
var primus  = require('primus')()
  , latency = require('primus-spark-latency')

primus.use('spark-latency', latency)
```


### spark.clock_offset (optional)

###### Note: This was released in 0.1.1 / 56e6ea5, but was undocumented - See #1

Numeric distance (ms) of the client's clock from the server clock.

Disabled unless `Primus.options.use_clock_offset` is `true`.
Must be enabled on both the server and browser.

#### Server
```js
var primus  = require('primus')({ use_clock_offset: true })
  , latency = require('primus-spark-latency')

primus.use('spark-latency', latency)
```

#### Browser
```js
primus = new Primus(url, { use_clock_offset: true })
```


## License

The MIT License (MIT)

Copyright (c) 2014 Jeremiah `Fishrock123` Senkpiel <fishrock123@rocketmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
