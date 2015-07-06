# MIDI KEYBOARD
[![Build Status](http://img.shields.io/travis/mohayonao/midi-keyboard.svg?style=flat-square)](https://travis-ci.org/mohayonao/midi-keyboard)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/midi-keyboard.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/midi-keyboard)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> JavaScript utility for MIDI keyboard

[![Keystation Mini 32](http://otononaru.appspot.com/cdn/git-hub/midi-keyboard/ks32.jpg)](http://m-audio.com/products/view/keystation-mini-32)

## Installation

Node.js

```sh
npm install @mohayonao/midi-keyboard
```

Browser

- [midi-keyboard.js](http://mohayonao.github.io/midi-keyboard/build/midi-keyboard.js)

## Examples

Online examples (using Web MIDI API)

- [dump messages from Keystation Mini 32](http://mohayonao.github.io/midi-keyboard./examples/dump.html)

Run example with Node.js (using [node-midi](https://github.com/justinlatimer/node-midi))

```
node examples/dump.js
```
## API
### MIDIKeyboard
- `constructor(deviceName: string = 'Keystation Mini 32')`

#### Class methods

- `requestDeviceNames(): Promise<{ inputs: string[], outputs: string[] }>`

#### Instance methods
_Also implements methods from the interface [@mohayonao/event-emitter](https://github.com/mohayonao/event-emitter)._

- `open(): Promise<[ input, output ]>`
- `close(): Promise<[ input, output ]>`

#### Events

- `message`
  - `dataType: string`
    - noteOn
    - noteOff
    - modulation
    - volume
    - pan
    - expression
    - sustain
    - pitchbend
  - `deviceName: string`
  - `channel: number` 0 - 15
  - `value: number` 0 - 127 ( control change )
  - `noteNumber: number` 0 - 127 ( noteOn / noteOff )
  - `velocity: number` 0 - 127 ( noteOn / noteOff )

## Usage

Node.js

```js
var MIDIKeyboard = require("@mohayonao/midi-keyboard");
```

Browser
```html
<script src="/path/to/midi-keyboard.js"></script>
```

Common

```js
var midiKey = new MIDIKeyboard("Keystation Mini 32");

midiKey.open();

midiKey.on("message", function(e) {
  console.log("dataType  : " + e.dataType);
  console.log("noteNumber: " + e.noteNumber);
  console.log("velocity  : " + e.velocity);
  console.log("value     : " + e.value);
  console.log("channel   : " + e.channel);
});  
```

## License
MIT
