# mpg321

play mp3s by shelling out to `mpg123`.


## Ubuntu/Debian
```
sudo apt-get install mpg123
```

## OSX
```
brew install mpg123
```

## Usage

``` js
var Mpg = require('mpg123')

var player = new Mpg()
  .play(filename)
  .on('end', function () {
    //play the next song.
    player.play(nextTrack)
    //etc.
  })

```

## License

MIT
