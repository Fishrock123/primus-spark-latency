
module.exports = {
  server: function (primus, options) {
    primus.Spark.writable('latency', 0)

    primus.transform('incoming', function (packet) {
      if (packet.data._latency) {
        this.latency = packet.data._latency
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
