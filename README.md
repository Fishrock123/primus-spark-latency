# primus-spark-latency [![Build Status](https://travis-ci.org/Fishrock123/primus-spark-latency.png)](https://travis-ci.org/Fishrock123/primus-spark-latency) [![NPM version](https://badge.fury.io/js/primus-spark-latency.png)](http://badge.fury.io/js/primus-spark-latency)

Adds a `latency` property to [primus](https://github.com/primus/primus) sparks server-side.

The property is set on connection, and on each subsequent ping.

## API

```js
var primus = require('primus')()
  , latency = require('primus-spark-latency')

primus.use('spark-latency', latency)
```

`spark.latency` - numeric value in milliseconds.


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
