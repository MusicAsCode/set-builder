import * as React from "react";
import { useEffect, useState } from "react";

import { Sampler } from "tone";
import "./ToneSampler.css";
import * as Tone from "tone";
import { Slider } from "react-nexusui";

type SamplerState = {
  isLoaded: boolean;
};

//========================= MASTER COMPONENT, ACCESSING MASTER LIST, CURRENTLY EMBEDDED FOR REF
// interface AssetItemInterface {
//   url: string,
//   volume: number,
//   name: string
// }

// interface AssetItemListInterface {
//   AssetItemListInterface:
// }

export default class ToneSampler extends React.Component<{}, SamplerState> {
  sampler: Sampler;

  constructor(props: any) {
    console.log("constructor");

    super(props);
    this.state = { isLoaded: true };
    // this.handleClick = this.handleClick.bind(this);
    // this.handleStopClick = this.handleStopClick.bind(this);

    Tone.Transport.timeSignature = [4, 4];
    console.log("default bmp: " + Tone.Transport.bpm.value);
    Tone.Transport.bpm.value = 126.25;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = "0:0:0";
    Tone.Transport.loopEnd = "2:0:0";

    // var doe = new Tone.Player({
    //   url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg",
    //   loop: false,
    //   volume: -6
    // })
    //   .toDestination()
    //   .sync()
    //   .start(0);

    // var doe1 = new Tone.Player({
    //   url: "https://f.4bars.media/2A/EB/2AEBDC8619BF411A900EDFF406103150.ogg",
    //   loop: false,
    //   volume: 6
    // })
    //   .toDestination()
    //   .sync()
    //   .start(0);

    // this.sampler = new Sampler(
    //   {
    //     A1: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
    //   },
    //   () => {
    //     this.setState({ isLoaded: true });
    //   }
    // ).toMaster();
    //this.setState({ isLoaded: true });
  }

  // handleClick() {
  //   //this.sampler.triggerAttack("A1");
  //   console.log("start clicked");
  //   Tone.start();
  //   Tone.Transport.start("+0");
  // }
  // handleStopClick() {
  //   //this.sampler.triggerAttack("A1");
  //   console.log("stop clicked");
  //   Tone.Transport.stop();
  // }

  render() {
    // const { isLoaded } = this.state;
    return (
      <div>
        {/* <button disabled={!isLoaded} onClick={this.handleClick}>
          play
        </button>
        <button disabled={!isLoaded} onClick={this.handleStopClick}>
          stop
        </button> */}
        <Tracks items={assetList} />
      </div>
    );
  }
}

//this is Track component
function MyTrack(item: any) {
  // const [value, setValue] = useState<number>(item.volume);

  // const player = new Tone.Player({
  //   url: item.url,
  //   loop: false,
  //   volume: -5
  // })
  //   .toDestination()
  //   .sync()
  //   .start(0);

  // useEffect(() => {
  //   console.log(value);
  //   player.volume.value = value;
  // });

  return (
    <>
      <p>{item.name}</p>
      <Slider
        size={[200, 20]}
        min={-10}
        max={3}
        step={1}
        // value={value}
        // onChange={setValue}
      />
    </>
  );
}

//this is track generator, each loop is a new track, one loop per track
const Tracks = props => {
  return (
    <React.Fragment>
      {props.items.data.map(item => (
        <React.Fragment>
          <p>{item.url}</p>
        </React.Fragment>
        // <MyTrack item={item} />
      ))}
    </React.Fragment>
  );
};

//this is list of assets, temporary eventually will be rest call
const assetList = {
  assets: [
    {
      name: "Fiction",
      volume: -4,
      url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
    },
    {
      name: "Stranger",
      volume: -4,
      url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
    }
  ]
};
