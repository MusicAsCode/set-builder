import * as React from "react";
import { Sampler } from "tone";
import A1 from "./A1.mp3";

import "./ToneSampler.css";

export default class ToneSampler extends React.Component {
  sampler: any;

  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.handleClick = this.handleClick.bind(this);

    this.sampler = new Sampler(
      { A1 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
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
