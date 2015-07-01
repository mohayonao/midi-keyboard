import xtend from "xtend";

const CONTROL_CHANGES = {
  [0x01]: "modulation",
  [0x07]: "volume",
  [0x0a]: "pan",
  [0x0b]: "expression",
  [0x40]: "sustain",
};

function parseMessage(st, d1, d2) {
  let messageType = st & 0xf0;
  let value = Math.max(0, Math.min(d2, 127));
  let channel = Math.max(0, Math.min(st & 0x0f, 15));

  // note off
  if (messageType === 0x80) {
    return { dataType: "noteOff", noteNumber: d1, velocity: value, channel };
  }

  // note on
  if (messageType === 0x90) {
    if (value === 0) {
      return { dataType: "noteOff", noteNumber: d1, velocity: value, channel };
    }
    return { dataType: "noteOn", noteNumber: d1, velocity: value, channel };
  }

  // control change
  if (messageType === 0xb0) {
    if (CONTROL_CHANGES.hasOwnProperty(d1)) {
      return { dataType: CONTROL_CHANGES[d1], value, channel };
    }
  }

  // pitch bend
  if (messageType === 0xe0) {
    let pitchBendValue = (d2 * 128 + d1) - 8192;

    return { dataType: "pitchbend", value: pitchBendValue, channel };
  }

  return null;
}

function _extends(MIDIDevice) {
  return class LaunchControl extends MIDIDevice {
    constructor(deviceName = "Keystation Mini 32") {
      super(deviceName);

      this._onmidimessage = (e) => {
        let msg = parseMessage(e.data[0], e.data[1], e.data[2]);

        if (msg === null) {
          return;
        }

        this.emit("message", xtend({ type: "message", deviceName: this.deviceName }, msg));
      };
    }
  };
}

export default {
  ["extends"]: _extends,
  parseMessage,
};
