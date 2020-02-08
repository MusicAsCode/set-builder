import * as React from "react";
import { useEffect, useState } from "react";
import { Slider } from "react-nexusui";
import * as Tone from "tone";
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

//single track
const Track = ({ asset, player, tracksPos }) => {
  const [volume, setVolume] = useState(asset.volume);
  const [barProgress, setBarProgress] = useState(0);
  //user player loop to update progress to update piechart

  //second argument provided, only renders once
  useEffect(() => {
    player.autostart = false;
    player.loop = true;
    player.loopStart = "0:0:0";
    player.loopEnd = "4:0:0";
    player.toMaster().sync();
    player.start();
  }, []);

  // const loop = new Tone.Loop(function(time) {
  //   //triggered every eighth note.
  //   console.log(asset.guid + " | " + Tone.Transport.position.toString());
  // }, "1n").start(0);

  //react on volume change only
  useEffect(() => {
    //   //console.log(asset.guid + " | " + volume.toString());
    //   //console.log(asset.guid + " | " + player.state.toString());
    //   //console.log(asset.guid + " | " + player.loopEnd.toString());

    //TODO: QUICK HACK, this has to be derrived from Transport-Provider
    //however its currently converted to time
    let transportLoopEnd = "4:0:0";
    let trBeatsPerBar = Number(Tone.Transport.timeSignature);
    let trTotalPosBars = Number(transportLoopEnd.split(":")[0]);
    let trTotalPosBeat = Number(transportLoopEnd.split(":")[1]);

    let trTotalBeats = trBeatsPerBar * trTotalPosBars + trTotalPosBeat;

    let transportPositionBar = Number(tracksPos.split(":")[0]);
    let transportPositionBeat = Number(tracksPos.split(":")[1]);
    let playerCurrentBeat =
      trBeatsPerBar * transportPositionBar + transportPositionBeat;

    // console.log(
    //   "Total Beats: " + trTotalBeats + " | Current Beat: " + playerCurrentBeat
    // );

    setBarProgress(Number((playerCurrentBeat / trTotalBeats) * 100));
    //console.log("Transport Position " + tracksPos);
    //   //player.volume.value = volume;
  }, [tracksPos]);

  //react on volume change only
  useEffect(() => {
    //console.log(asset.guid + " | " + volume.toString());
    //console.log(asset.guid + " | " + player.state.toString());
    //console.log(asset.guid + " | " + player.loopEnd.toString());
    //console.log(asset.guid + " | " + Tone.Transport.position.toString());
    //console.log("Volume " + asset.guid + " | " + volume.toString());
    //console.log("Tracks Global Position" + asset.guid + " | " + tracksPos);
    player.volume.value = volume;
  }, [volume]);

  return (
    <>
      <div className="track">
        <p>
          {asset.name} ({volume} {tracksPos})
        </p>
        <Slider
          size={[200, 10]}
          min={-45}
          max={1}
          step={1}
          value={volume}
          onChange={setVolume}
        />
        <div style={{ width: "40px" }}>
          <CircularProgressbar
            value={barProgress}
            strokeWidth={50}
            styles={buildStyles({
              strokeLinecap: "butt"
            })}
          />
        </div>
      </div>
    </>
  );
};

export default Track;
