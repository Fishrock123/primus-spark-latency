var Primus = require('primus')
  , latency = require('./')
  , http = require('http').Server
  , expect = require('expect.js')
  , opts = { transformer: 'websockets' }
  , alt_opts = { transformer: 'websockets', use_clock_offset: true }
  , primus, srv

// creates the client
function client(srv, primus, opts, port) {
  var addr = srv.address()
  var url = 'http://' + addr.address + ':' + (port || addr.port)
  return new primus.Socket(url, opts)
}

// creates the server
function server(srv, opts) {
  return Primus(srv, opts).use('spark-latency', latency)
}

describe('primus-spark-latency', function () {

  beforeEach(function beforeEach(done) {
    srv = http()
    done()
  })

  afterEach(function afterEach(done) {
    primus.end()
    done()
  })

  describe('Spark.latency', function () {

    it('Should be a number', function (done) {
      primus = server(srv, opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          expect(spark.latency).to.be.a('number')
          done()
        })
        client(srv, primus, opts)
      })
    })

    it('Should be set on connection', function (done) {
      primus = server(srv, opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          spark.on('data', function (data) {
            expect(spark.latency).to.be.within(1, 30)
            done()
          })
        })
        client(srv, primus, opts).on('open', function () {
          var that = this
          process.nextTick(function () {
            that.write({ data: "cats" })
          })
        })
      })
    })

    it('Should be unable to be set by packets as non-numeric', function (done) {
      primus = server(srv, opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          spark.on('data', function (data) {
            expect(spark.latency).to.be.a('number')
            expect(spark.latency).to.be.within(1, 30)
            done()
          })
        })
        client(srv, primus, opts).on('open', function () {
          var that = this
          process.nextTick(function () {
            that.write({ _latency: "doge" })
          })
        })
      })
    })
  })

  describe('Spark.clock_offset', function () {

    it('Should be a number', function (done) {
      primus = server(srv, alt_opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          expect(spark.clock_offset).to.be.a('number')
          done()
        })
        client(srv, primus, alt_opts)
      })
    })

    it('Should be set on connection', function (done) {
      primus = server(srv, alt_opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          spark.on('data', function (data) {
            expect(spark.clock_offset).to.be.within(1, 50)
            done()
          })
        })
        client(srv, primus, alt_opts).on('open', function () {
          var that = this
          process.nextTick(function () {
            that.write({ _latency: that.latency, _clock: Date.now() - 15 })
            process.nextTick(function() {
              that.write({ data: "cats" })
            })
          })
        })
      })
    })

    it('Should be unable to be set by packets as non-numeric', function (done) {
      primus = server(srv, alt_opts)
      srv.listen(function () {
        primus.on('connection', function (spark) {
          spark.on('data', function (data) {
            expect(spark.clock_offset).to.be.a('number')
            done()
          })
        })
        client(srv, primus, alt_opts).on('open', function () {
          var that = this
          process.nextTick(function () {
            that.write({ _clock: "doge" })
          })
        })
      })
    })
  })

})
