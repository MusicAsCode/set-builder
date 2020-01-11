import * as React from "react";
import { Sampler } from "tone";
import "./ToneSampler.css";

type SamplerState = {
  isLoaded: boolean;
};

export default class ToneSampler extends React.Component<{}, SamplerState> {
  sampler: Sampler;

  constructor(props: any) {
    super(props);
    this.state = { isLoaded: false };
    this.handleClick = this.handleClick.bind(this);

    this.sampler = new Sampler(
      {
        A1: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
      },
      () => {
        this.setState({ isLoaded: true });
      }
    ).toMaster();
  }

  handleClick() {
    this.sampler.triggerAttack("A1");
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <button disabled={!isLoaded} onClick={this.handleClick}>
          play
        </button>
      </div>
    );
  }
}
