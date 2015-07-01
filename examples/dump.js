(function(MIDIKeyboad) {
  "use strict";

  var midiKey = new MIDIKeyboad("Keystation Mini 32");

  Promise.resolve().then(function() {
    return midiKey.open();
  }).then(function() {
    midiKey.on("message", function(e) {
      console.log(JSON.stringify(e));
    });
  }).catch(function(e) {
    console.log("ERROR: " + e.toString());
  });

})((this.self || global).MIDIKeyboard || require("../"));
