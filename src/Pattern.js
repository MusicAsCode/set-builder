import * as React from "react";
import ReactDOM from "react-dom";
import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useReducer
} from "react";
import "./Pattern.css";
import { Slider } from "react-nexusui";
import * as Tone from "tone";

import PlayersProvider from "./players-provider";
import TransportProvider from "./transport-provider";
import Footer from "./footer";
// Import react-circular-progressbar module and styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isNull } from "util";

//this is list of assets, temporary eventually will be rest call
// const assetList = {
//   assets: [
//     {
//       guid: "loop01",
//       name: "Fiction",
//       volume: -4,
//       url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
//     },
//     {
//       guid: "loop02",
//       name: "Stranger",
//       volume: -4,
//       url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg"
//     }
//   ]
// };

// const ToneMeter = ({player}) => {
//   const ref = React.useRef(null)
//   useLayoutEffect(() => {
//       const rect = ref.current;
//       //rect.bind(player)
//       console.log('tone-meter color:', rect.color)
//   }, [ref])
//   return (
//     <>
//     <tone-loader></tone-loader>
//     {/* <tone-meter ref={ref} level color='#eee' /> */}
//     </>
//   )
// }

const marks = [
  {
    value: 0,
    label: "0°C"
  },
  {
    value: 20,
    label: "20°C"
  },
  {
    value: 37,
    label: "37°C"
  },
  {
    value: 100,
    label: "100°C"
  }
];

function valuetext(value: number) {
  return `${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

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

    console.log(
      "Total Beats: " + trTotalBeats + " | Current Beat: " + playerCurrentBeat
    );

    setBarProgress(Number((playerCurrentBeat / trTotalBeats) * 100));
    console.log("Transport Position " + tracksPos);
    //   //player.volume.value = volume;
  }, [tracksPos]);

  //react on volume change only
  useEffect(() => {
    //console.log(asset.guid + " | " + volume.toString());
    //console.log(asset.guid + " | " + player.state.toString());
    //console.log(asset.guid + " | " + player.loopEnd.toString());
    //console.log(asset.guid + " | " + Tone.Transport.position.toString());
    console.log("Volume " + asset.guid + " | " + volume.toString());
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

//this is track generator, each loop is a new track, one loop per track
//we will try to put ToneJs transport here and have Track elements use that as global synchronizer
const Tracks = ({ players, assetList }) => {
  const onLoop = () => {
    console.log("loop restart");
  };

  const [tracksPos, setTracksPos] = useState("0:0:0");

  var loop = new Tone.Loop(function(time) {
    //triggered every eighth note.
    //console.log(time);

    setTracksPos(Tone.Transport.position.toString().split(".")[0]);
    //console.log("Transport Position | " + tracksPos);
  }, "4n").start(0);

  const onPlayClick = () => {
    // console.log("start clicked");
    // //players.get("loop01").start(0);
    // //players.get("loop02").start(0);

    // var loop = new Tone.Loop(onLoop, "8n").start(0);
    // loop.start(0).stop('4m')

    // Tone.Transport.start("+0");

    Tone.Transport.start();
  };

  const onStopClick = () => {
    console.log("stop clicked");
    Tone.Transport.stop();
    setTracksPos("0:0:0");
    //loop.stop();
  };

  return (
    <React.Fragment>
      <Footer>
        <button onClick={onPlayClick}>PLAY</button>
        <button onClick={onStopClick}>STOP</button>
      </Footer>

      {/* <p>track loaded {JSON.stringify(assetList, null, 2)}</p> */}
      {assetList.assets.map(asset => (
        <React.Fragment key={asset.guid}>
          <Track
            asset={asset}
            player={players.get(asset.guid)}
            tracksPos={tracksPos}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default function Pattern() {
  return (
    <>
      <TransportProvider />
      <PlayersProvider>
        {({ players, assetList }) => {
          if (!players) {
            return <p>assets loading....</p>;
          }
          //THIS IS MESSSED UP. FIX FIX FIX
          return <Tracks players={players} assetList={assetList} />;
          //return <p>assets loaded {JSON.stringify(assetList.assets[0].url, null, 2)}</p>;
        }}
      </PlayersProvider>
    </>
  );
}
