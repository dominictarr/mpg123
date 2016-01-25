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

(Note: if the below details are still unclear, the package code is quite short and easy to understand if you're apprehensive about reading through it)

```js
var Mpg = require('mpg123');

var player = new Mpg();
```

### Commands

```player.play(uri)``` - plays audio from a source
```player.pause()``` - pauses the current track
```player.stop()``` - stops the current track
```player.volume(percent)``` - sets the volume from 0-100 (mpg123 by default starts at 100%)
```player.close()``` - kills the mpg123 process
```player._cmd(...)``` - sends a custom command to the mpg123 CLI

### Events

Usage: ```player.on('eventname', function(data){...})```

'end' (no data) - a song ended (or, because of mpg123, a pause was attempted without any song currently playing, or a song was stopped)
'pause' (no data) - a pause occurred
'resume' (no data) - the song started or resumed playing
'error' (error object) - mpg123 encountered an error (commonly having to do with bad source data)
'frame' (frame data) - indicates playback has progressed to a new frame of the song. The format of the data is as follows:
```data[0]``` - current frame number
```data[1]``` - number of frames remaining
```data[2]``` - current time in seconds (to 2 decimal places)
```data[3]``` - remaining time in seconds (to 2 decimal places)
'jump' (no data) - A jump occurred (always caused by the user, but allows for a callback hook)
'volume' (percentage, 0.0-100.0) -  the volume changed (serves as a callback hook for when changing the volume)

## License

MIT
