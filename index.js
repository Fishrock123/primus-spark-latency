
module.exports = {
  server: function (primus, options) {
    primus.Spark.writable('latency', 0)

    if (options.use_clock_offset) primus.Spark.writable('clock_offset', 0)

    primus.transform('incoming', options.use_clock_offset ? setBoth : setLatency)

    function setLatency(packet) {
      var latency = packet.data._latency
      if (latency && typeof latency == 'number') {
        this.latency = latency
        return false
      }
    }

    function setBoth(packet) {
      var latency      = packet.data._latency
        , client_clock = packet.data._clock
        , cont = true

      if (latency && typeof latency == 'number') {
        this.latency = latency
        cont = false
      }

      if (client_clock && typeof client_clock == 'number') {
        this.clock_offset = Date.now() - client_clock - Math.floor(this.latency / 2)
        cont = false
      }

      return cont
    }
  },

  client: function (primus, options) {
    primus.on('incoming::pong', options.use_clock_offset ? sendBoth : sendLatency)
    primus.on('incoming::open', options.use_clock_offset ? sendBoth : sendLatency)

    function sendLatency() {
      this.write({ _latency: this.latency })
    }

    function sendBoth() {
      this.write({ _latency: this.latency, _clock: Date.now() })
    }
  }
}
