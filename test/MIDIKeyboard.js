import assert from "power-assert";
import sinon from "sinon";
import TestMIDIDevice from "@mohayonao/midi-device/test";
import MIDIKeyboard from "../src/MIDIKeyboard";

describe("MIDIKeyboard", () => {
  describe(".extends(MIDIDevice: class): class extends MIDIDevice", () => {
    it("constructor(deviceName: string)", () => {
      let TestMIDIKeyboard = MIDIKeyboard.extends(TestMIDIDevice);
      let midiKeyboard = new TestMIDIKeyboard();

      assert(midiKeyboard instanceof TestMIDIKeyboard);
      assert(midiKeyboard instanceof TestMIDIDevice);
      assert(midiKeyboard.deviceName === "Keystation Mini 32");
    });
    it("event: 'message'", () => {
      let TestMIDIKeyboard = MIDIKeyboard.extends(TestMIDIDevice);
      let midiKeyboard = new TestMIDIKeyboard("TestDevice1");
      let onmessage = sinon.spy();

      midiKeyboard.on("message", onmessage);

      return midiKeyboard.open().then(([ input ]) => {
        input.recv([ 0x98, 0x40, 0x64 ]);

        assert(onmessage.calledOnce);

        let msg = onmessage.args[0][0];

        assert(msg.type === "message");
        assert(msg.deviceName === "TestDevice1");
        assert(msg.dataType === "noteOn");
        assert(msg.noteNumber === 64);
        assert(msg.velocity === 100);
        assert(msg.channel === 8);
        onmessage.reset();

        input.recv([ 0x00, 0x00, 0x00 ]);
        assert(!onmessage.called);
      });
    });
  });
  describe(".parseMessage(st: number, d1: number, d2: number): object", () => {
    it("noteOff", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0x80, 0x40, 0x32), { dataType: "noteOff", noteNumber: 64, velocity: 50, channel: 0 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x81, 0x42, 0x64), { dataType: "noteOff", noteNumber: 66, velocity: 100, channel: 1 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x92, 0x44, 0x00), { dataType: "noteOff", noteNumber: 68, velocity: 0, channel: 2 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x93, 0x45, 0x00), { dataType: "noteOff", noteNumber: 69, velocity: 0, channel: 3 });
    });
    it("noteOn", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0x94, 0x47, 0x32), { dataType: "noteOn", noteNumber: 71, velocity: 50, channel: 4 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x95, 0x49, 0x32), { dataType: "noteOn", noteNumber: 73, velocity: 50, channel: 5 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x96, 0x4b, 0x32), { dataType: "noteOn", noteNumber: 75, velocity: 50, channel: 6 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0x97, 0x4c, 0x64), { dataType: "noteOn", noteNumber: 76, velocity: 100, channel: 7 });
    });
    it("modulation", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb8, 0x01, 0x00), { dataType: "modulation", value: 0, channel: 8 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb9, 0x01, 0x32), { dataType: "modulation", value: 50, channel: 9 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xba, 0x01, 0x64), { dataType: "modulation", value: 100, channel: 10 });
    });
    it("volume", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xbb, 0x07, 0x00), { dataType: "volume", value: 0, channel: 11 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xbc, 0x07, 0x32), { dataType: "volume", value: 50, channel: 12 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xbd, 0x07, 0x64), { dataType: "volume", value: 100, channel: 13 });
    });
    it("pan", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xbe, 0x0a, 0x00), { dataType: "pan", value: 0, channel: 14 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xbf, 0x0a, 0x32), { dataType: "pan", value: 50, channel: 15 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb0, 0x0a, 0x64), { dataType: "pan", value: 100, channel: 0 });
    });
    it("expression", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb1, 0x0b, 0x00), { dataType: "expression", value: 0, channel: 1 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb2, 0x0b, 0x32), { dataType: "expression", value: 50, channel: 2 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb3, 0x0b, 0x64), { dataType: "expression", value: 100, channel: 3 });
    });
    it("sustain", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb4, 0x40, 0x00), { dataType: "sustain", value: 0, channel: 4 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb5, 0x40, 0x7f), { dataType: "sustain", value: 127, channel: 5 });
    });
    it("pitchbend", () => {
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe6, 0x00, 0x00), { dataType: "pitchbend", value: -8192, channel: 6 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe7, 0x00, 0x20), { dataType: "pitchbend", value: -4096, channel: 7 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe8, 0x00, 0x30), { dataType: "pitchbend", value: -2048, channel: 8 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe9, 0x00, 0x38), { dataType: "pitchbend", value: -1024, channel: 9 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xea, 0x00, 0x3c), { dataType: "pitchbend", value: -512, channel: 10 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xeb, 0x00, 0x3e), { dataType: "pitchbend", value: -256, channel: 11 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xec, 0x00, 0x3f), { dataType: "pitchbend", value: -128, channel: 12 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xed, 0x40, 0x3f), { dataType: "pitchbend", value: -64, channel: 13 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xee, 0x60, 0x3f), { dataType: "pitchbend", value: -32, channel: 14 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xef, 0x70, 0x3f), { dataType: "pitchbend", value: -16, channel: 15 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe0, 0x00, 0x40), { dataType: "pitchbend", value: 0, channel: 0 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe1, 0x10, 0x40), { dataType: "pitchbend", value: 16, channel: 1 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe2, 0x20, 0x40), { dataType: "pitchbend", value: 32, channel: 2 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe3, 0x40, 0x40), { dataType: "pitchbend", value: 64, channel: 3 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe4, 0x00, 0x41), { dataType: "pitchbend", value: 128, channel: 4 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe5, 0x00, 0x42), { dataType: "pitchbend", value: 256, channel: 5 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe6, 0x00, 0x44), { dataType: "pitchbend", value: 512, channel: 6 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe7, 0x00, 0x48), { dataType: "pitchbend", value: 1024, channel: 7 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe8, 0x00, 0x50), { dataType: "pitchbend", value: 2048, channel: 8 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xe9, 0x00, 0x60), { dataType: "pitchbend", value: 4096, channel: 9 });
      assert.deepEqual(MIDIKeyboard.parseMessage(0xea, 0x7f, 0x7f), { dataType: "pitchbend", value: 8191, channel: 10 });
    });
    it("others", () => {
      // undefined control change
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb8, 0x72, 0x7f), null);
      assert.deepEqual(MIDIKeyboard.parseMessage(0xb8, 0x72, 0x00), null);
      // invalid message
      assert.deepEqual(MIDIKeyboard.parseMessage(0x00, 0x00, 0x00), null);
    });
  });
});
