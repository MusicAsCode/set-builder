import * as React from "react";

import { Sampler } from "tone";
import "./ToneSampler.css";
import * as Tone from "tone";

type SamplerState = {
  isLoaded: boolean;
};

const MyTrack: React.FC = props => {
  var kick = new Tone.Player({
    url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg",
    loop: false,
    volume: 1
  })
    .toDestination()
    .sync()
    .start(0);

  return <div>Track</div>;
};

export default class ToneSampler extends React.Component<{}, SamplerState> {
  sampler: Sampler;

  constructor(props: any) {
    console.log("constructor");
    Tone.start();
    super(props);
    this.state = { isLoaded: true };
    this.handleClick = this.handleClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);

    Tone.Transport.timeSignature = [4, 4];
    console.log("default bmp: " + Tone.Transport.bpm.value);
    Tone.Transport.bpm.value = 126.25;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = "0:0:0";
    Tone.Transport.loopEnd = "2:0:0";

    var doe = new Tone.Player({
      url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg",
      loop: false,
      volume: -6
    })
      .toDestination()
      .sync()
      .start(0);

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

  handleClick() {
    //this.sampler.triggerAttack("A1");
    console.log("start clicked");

    Tone.Transport.start("+0");
  }
  handleStopClick() {
    //this.sampler.triggerAttack("A1");
    console.log("stop clicked");
    Tone.Transport.stop();
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <button disabled={!isLoaded} onClick={this.handleClick}>
          play
        </button>
        <button disabled={!isLoaded} onClick={this.handleStopClick}>
          stop
        </button>
        <MyTrack />
      </div>
    );
  }
}
