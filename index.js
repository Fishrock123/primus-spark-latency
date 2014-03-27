
module.exports = {
  server: function (primus, options) {
    primus.Spark.writable('latency', 0)

    primus.transform('incoming', function (packet) {
      var latency = packet.data._latency
      if (latency && typeof latency == 'number') {
        this.latency = latency
        return false
      }
    })
  },

  client: function (primus, options) {
    primus.on('incoming::pong', sendLatency)
    primus.on('incoming::open', sendLatency)

    function sendLatency() {
      this.write({ _latency: this.latency })
    }
  }
}
