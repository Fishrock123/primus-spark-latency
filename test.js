var Primus = require('primus')
  , latency = require('./')
  , http = require('http').Server
  , expect = require('expect.js')
  , opts = { transformer: 'websockets' }
  , primus, srv

// creates the client
function client(srv, primus, port) {
  var addr = srv.address()
  var url = 'http://' + addr.address + ':' + (port || addr.port)
  return new primus.Socket(url)
}

// creates the server
function server(srv, opts) {
  return Primus(srv, opts).use('spark-latency', latency)
}

describe('primus-spark-latency', function () {

  beforeEach(function beforeEach(done) {
    srv = http()
    primus = server(srv, opts)
    done()
  })

  afterEach(function afterEach(done) {
    primus.end()
    done()
  })

  it('Spark.latency should be a number', function (done) {
    srv.listen(function () {
      primus.on('connection', function (spark) {
        expect(spark.latency).to.be.a('number')
        done()
      })
      client(srv, primus)
    })
  })

  it('Spark.latency should be set on connection', function (done) {
    srv.listen(function () {
      primus.on('connection', function (spark) {
        spark.on('data', function (data) {
          expect(spark.latency).to.be.within(1, 30)
          done()
        })
      })
      client(srv, primus).on('open', function () {
        var that = this
        process.nextTick(function () {
          that.write({ data: "cats" })
        })
      })
    })
  })

  it('Spark.latency should only be able to be set as a number', function (done) {
    srv.listen(function () {
      primus.on('connection', function (spark) {
        spark.on('data', function (data) {
          expect(spark.latency).to.be.a('number')
          expect(spark.latency).to.be.within(1, 30)
          done()
        })
      })
      client(srv, primus).on('open', function () {
        var that = this
        process.nextTick(function () {
          that.write({ _latency: "doge" })
        })
      })
    })
  })
})
