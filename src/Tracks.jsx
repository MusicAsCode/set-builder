import * as React from "react";
import { useEffect, useState } from "react";
import Track from "./Track";
import Footer from "./components/Footer";
import * as Tone from "tone";

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
    <main className="main">
      <React.Fragment>
        {/* <Footer>
          <button onClick={onPlayClick}>PLAY</button>
          <button onClick={onStopClick}>STOP</button>
        </Footer> */}

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
    </main>
  );
};

export default Tracks;
