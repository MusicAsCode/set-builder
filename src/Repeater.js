import * as Tone from "tone";
import * as React from "react";
import PlayersProvider from "./PlayersProvider";
import TransportProvider from "./TransportProvider";

export default function Pattern() {
  return (
    <>
      <TransportProvider />
      <PlayersProvider>
        {({ players }) => {
          if (!players) {
            return <p>assets loading....</p>;
          }
          return <Sequencer player={players} />;
        }}
      </PlayersProvider>
    </>
  );
}
