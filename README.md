# mpg123

Plays MP3s utilizing advanced S.H.E.L.L. technology via cutting-edge Nano System Routing techniques, natrually activating a Level 3 Quantum-Vacum Effect, subsequently substantiating the `mpg123` utility.

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
#### Or, to install a certain Electric Mouse's Fork:
```
npm install Pecacheu/mpg123
```

## Usage

(Note: if the below details are still unclear, the package code is quite short and easy to understand if you're apprehensive about reading through it)

Basics:
```js
var mpg = require('mpg123');

var player = new mpg.MpgPlayer();

player.play(__dirname+'/'+"someMusic.mp3");
```

### Device Objects

Device objects allow you to select different output sources for playback, provided you are using ALSA.
This functionality requires the `aplay` command, but is entirely optional.

`mpg.getDevices(callback)` - Gets array of ALSA output devices   
`devices.get(name)` - Finds device in array with given name, otherwise returns null   
`device.name` - Friendly name of device   
`device.address` - ALSA address of device

### Player Objects

`new mpg.MpgPlayer(device=null, noFrames=false)` - Create new instance, optionally specifing output device  
Setting *noFrames* to true will disable frame updates, which may improve performance on some devices.  
`player.play(file)` - Plays audio from a source  
`player.pause()` - Pauses the current track  
`player.stop()` - Stops the current track  
`player.volume(percent)` - Sets the volume from 0 to 100 (default is 100%)  
`player.pitch(amt)` - Adjusts the pitch & speed of the track up or down. The limits seem to be around -0.75 to 0.1.  
`player.seek(progress)` - Seeks through the track with progress from 0 to 1. This fails before the `format` event has fired.  
`player.getProgress(callback)` - Retrieve current track progress from 0 to 1  
`player.close()` - Kills the mpg123 process  
`player._cmd(...)` - Sends a custom command to the mpg123 CLI. Get possible commands by running `mpg123 -R` then typing `HELP`

### Song Info Variables

Theses variables hold info about the current song, and are safe to read only once the `format` event has fired.

`player.track` - Current track name (with extention). Set to **null** when track completes.  
`player.file` - Full file path, exactly as it was entered into `player.play()`  
`player.mpeg` - MPEG encoding version  
`player.sampleRate` - Track sample rate  
`player.channels` - Number of channels  
`player.bitrate` - Track bitrate  
`player.length` - Track length in seconds, rounded to the nearest tenth  
`player.samples` - Track length in raw samples  

### Events

Usage: ```player.on('eventname', function(data){...})```

| Name      | Data  | Description |
| :-------: | :---: | ----------- |
| end | No data | A song ended (or, because of mpg123, a pause was attempted without any song currently playing, or a song was stopped) |
| pause | No data | A pause occurred |
| resume | No data | The song started or resumed playing |
| error | Error object | mpg123 encountered an error (commonly having to do with bad source data) |
| frame | Frame data | Indicates playback has progressed to a new frame of the song. The frame data is an array (length 4), structured like such: ```[current frame number, remaining number of frames, current time in seconds, remaining time in seconds]``` |
| jump | No data | A jump occurred (always caused by the user, but allows for a callback hook) |
| volume | Percentage | The volume changed (serves as a callback hook for when changing the volume) |
| format | No data | Called when song info has been updated. See [Song Info Variables](#song-info-variables) for details. |

## License

MIT
