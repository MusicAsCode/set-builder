import * as React from "react";
import "./Footer.css";
import * as Tone from "tone";

const Footer = () => {
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
    //setTracksPos("0:0:0");
    //loop.stop();
  };

  return (
    <footer className="footer">
      <button onClick={onPlayClick}>PLAY</button>
      <button onClick={onStopClick}>STOP</button>
    </footer>
  );
};

export default Footer;
