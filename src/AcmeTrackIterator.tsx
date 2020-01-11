import * as React from "react";
import { useEffect, useState, useCallback, useReducer } from "react";
import "./AcmeTrackIterator.css";
//import { Sampler } from "tone";
//import "./ToneSampler.css";
import * as Tone from "tone";
import { Slider } from "react-nexusui";
import * as Tone from "tone";
import "./ToneSampler.css";
import "./Track.css";

//this is list of assets, temporary eventually will be rest call
const assetList = {
  assets: [
    {
      guid: "loop01",
      name: "Fiction",
      volume: -4,
      url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
    },
    {
      guid: "loop02",
      name: "Stranger",
      volume: -4,
      url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg"
    }
  ]
};

//single track
const Track = props => {
  const [value, setValue] = useState<number>(props.asset.volume);

  var player = new Tone.Player({
    url: props.asset.url,
    loop: false,
    volume: props.asset.volume
  })
    .toDestination()
    .sync()
    .start(0);

  useEffect(() => {
    console.log(props.asset.guid + " | " + value.toString());
    //player.volume.value = value;
  });

  return (
    <>
      <div className="track">
        <p>{props.asset.name}</p>
        <Slider
          size={[200, 20]}
          min={-10}
          max={3}
          step={1}
          value={value}
          onChange={setValue}
        />
      </div>
    </>
  );
};

//this is track generator, each loop is a new track, one loop per track
//we will try to put ToneJs transport here and have Track elements use that as global synchronizer
const Tracks = props => {
  Tone.start();
  Tone.Transport.timeSignature = [4, 4];
  console.log("default bmp: " + Tone.Transport.bpm.value);
  Tone.Transport.bpm.value = 126.25;
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "2:0:0";

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
      {props.items.assets.map(item => (
        <React.Fragment key={item.guid}>
          <Track asset={item} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default class AcmeTrackIterator extends React.Component {
  render() {
    return <Tracks items={assetList} />;
  }
}
