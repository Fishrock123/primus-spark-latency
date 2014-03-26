
module.exports = {
  server: function (primus, options) {
    primus.Spark.writable('latency', 0)

    primus.transform('incoming', function (packet) {
      if (packet.data.latency) {
        this.latency = packet.data.latency
        return false
      } else {
        return true
      }
    })

  },

  client: function (primus, options) {
    primus.on('incoming::pong', function () {
      primus.write({ latency: primus.latency })
    })

    primus.on('incoming::open', function () {
      primus.write({ latency: primus.latency })
    })
  }
}
