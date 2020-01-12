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

  // var pl = new Tone.Player({
  //   url: asset.url,
  //   loop: false,
  //   volume: asset.volume
  // })
  player.toMaster().sync();
  //    .start(0);

  useEffect(() => {
    console.log(asset.guid + " | " + volume.toString());
    console.log(asset.guid + " | " + player.volume.toString());
    player.volume.value = volume;
  });

  return (
    <>
      <div className="track">
        <p>
          {asset.name} ({volume})
        </p>
        <Slider
          size={[200, 20]}
          min={-10}
          max={3}
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
  // Tone.start();
  // Tone.Transport.timeSignature = [4, 4];
  // console.log("default bmpp: " + Tone.Transport.bpm.value);
  // Tone.Transport.bpm.value = 126;
  // Tone.Transport.loop = true;
  // Tone.Transport.loopStart = "0:0:0";
  // Tone.Transport.loopEnd = "2:0:0";

  //Tone.start();

  const onPlayClick = () => {
    console.log("start clicked");
    Tone.Transport.start("+0");
  };

  const onStopClick = () => {
    console.log("stop clicked");
    Tone.Transport.stop();
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
