import * as React from "react";
import { useEffect, useState, useCallback, useReducer } from "react";
import "./Pattern.css";
import { Slider } from "react-nexusui";
import * as Tone from "tone";
import PlayersProvider from "./players-provider";
import TransportProvider from "./transport-provider";

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

//single track
const Track = ({ asset, player }) => {
  const [volume, setVolume] = useState(asset.volume);

  //second argument provided, only renders once
  useEffect(() => {
    player.autostart = false;
    player.loop = true;
    player.loopStart = "0:0:0";
    player.loopEnd = "2:0:0";
    player.toMaster().sync();
    player.start();
  }, []);

  //react on volume change only
  useEffect(() => {
    console.log(asset.guid + " | " + volume.toString());
    console.log(asset.guid + " | " + player.state.toString());
    player.volume.value = volume;
  });

  return (
    <>
      <div className="track">
        <p>
          {asset.name} ({volume})
        </p>
        <Slider
          size={[200, 10]}
          min={-45}
          max={1}
          step={1}
          value={volume}
          onChange={setVolume}
        />
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

  var loop = new Tone.Loop(function(time) {
    //triggered every eighth note.
    console.log(time);
  }, "8n").start(0);

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
    //loop.stop();
  };

  return (
    <React.Fragment>
      <button onClick={onPlayClick}>PLAY</button>
      <button onClick={onStopClick}>STOP</button>
      {/* <p>track loaded {JSON.stringify(assetList, null, 2)}</p> */}
      {assetList.assets.map(asset => (
        <React.Fragment key={asset.guid}>
          <Track asset={asset} player={players.get(asset.guid)} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default function Pattern() {
  return (
    <>
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
      <TransportProvider />
    </>
  );
}
