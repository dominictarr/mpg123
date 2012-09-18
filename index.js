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
        console.log(event, type, line)
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
//        console.log(line)
        self.emit.apply(self, line)
      }
//      else
      console.log(type, line)
      
    }))

  // must make sure the mpg321 process closes,
  // seems like it goes into an infinite loop or something.

  var close = this.close.bind(this)

  process.on('exit'  , close)
  process.on('SIGINT', close)

  // hmm, this is a problem
  // the child process doesn't get cleaned up if you just exit.
  // but using this will cou
  process.on('uncaughtException', function onErr (err) {
    if(err && 'mpg-player' === err.type) close()
    if(process.listeners('uncaughtException').length == 1) {
      close()
      process.removeListener('error', onErr)
        throw err
    }
  })

}

var p = MpgPlayer.prototype

p._cmd = function () {
  var args = [].slice.call(arguments)
  console.log('CMD', args)
  this.stream.write(args.join(' ') + '\n')
  return this
}

p.play = function (file) {
  return this._cmd('LOAD', file)
}
//no queue
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
  console.log('exit')
  this.child.kill()
}


if(!module.parent) {
  console.log(process.argv)
  new MpgPlayer()
    .play(process.argv[2])
}
