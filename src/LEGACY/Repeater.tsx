import * as Tone from "tone";
import * as React from "react";
// Play a three-over-two polyrhythm



export default function Repeater() {

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
var kit = new Tone.Players({
  "kick": "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg",
  "snare": "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg"
});

// Connect the player output to the computer's audio output
kit.toMaster();
console.log ("starting repeater...")
// Set the tempo
Tone.Transport.bpm.value = 60;

// Create two loops for a three over two cross-rhythm
Tone.Transport.scheduleRepeat(playRhythm1, 1 / 3);
Tone.Transport.scheduleRepeat(playRhythm2, 1 / 9);
Tone.Transport.start();
Tone.start()

function playRhythm1() {
  
  if (kit.loaded) {
    kit.get("kick").start();
  }
}

function playRhythm2() {
  if (kit.loaded) {
    kit.get("snare").start();
  }
}

function setup() {

}

function draw() {

}


  return (


          <div >
Repeater
          </div>
      

  );
}



