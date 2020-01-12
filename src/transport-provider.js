import React, { useState, useEffect } from "react";
import Tone from "tone";

const TransportProvider = () => {
  Tone.Transport.timeSignature = [4, 4];
  Tone.Transport.bpm.value = 126.25;
  console.log("default bmp: " + Tone.Transport.bpm.value);
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "2:0:0";
  //Tone.Transport.stop();

  return null;
};

export default TransportProvider;
