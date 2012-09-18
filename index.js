var spawn        = require('child_process').spawn
var EventEmitter = require('events').EventEmitter
var inherits     = require('util').inherits
var es           = require('event-stream')
var through      = require('through')

inherits(MpgPlayer, EventEmitter)

module.exports = MpgPlayer
function MpgPlayer() {
  var self = this
  this.child = spawn('mpg123', ['-R'])
  this.stream = this.child.stdin,
  this.child.stdout
    .pipe(es.split())
    .pipe(through(function (data) {
      var line = data.split(' ')
      var type = line.shift()


      if('@P' === type) {
        var event = ['end', 'pause', 'resume', 'stop'][+line.shift()]
        self.emit(event)
      }
      else
      if('@E' == type) {
        var err = new Error(line.join(' '))
        err.type = 'mpg-player'
        self.emit('error', err)
      }
      else
      if('@F' == type) {
        line.unshift('frame')
        self.emit.apply(self, line)
      }
      
    }))

}

var p = MpgPlayer.prototype

p._cmd = function () {
  var args = [].slice.call(arguments)
  this.stream.write(args.join(' ') + '\n')
  return this
}

p.play = function (file) {
  return this._cmd('LOAD', file)
}
p.pause = function () {
  return this._cmd('PAUSE')
}
p.stop = function () {
  return this._cmd('STOP')
}
p.gain = function (vol) {
  vol = Math.min(Math.max(Math.round(vol), 0), 100)
  return this._cmd('GAIN', vol)
}

p.close = function () {
  this.child.kill()
}


if(!module.parent) {
  new MpgPlayer()
    .play(process.argv[2])
}
