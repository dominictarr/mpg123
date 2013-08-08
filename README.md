# mpg123

Play mp3s by shelling out to `mpg123`

## Install mpg123 command line audio player
### Ubuntu/Debian
```
sudo apt-get install mpg123
```
### Arch Linux
```
sudo pacman -Sy mpg123
```
### OSX
```
brew install mpg123
```
## Install mpg123 in nodejs
```
npm install mpg123
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
