import { useState, useEffect } from "react";
import Tone from "tone";

const PlayersProvider = ({ children }) => {
  const [assetList, setAssetList] = useState({
    assets: [
      {
        guid: "loop01",
        name: "Fiction",
        volume: -25,
        url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
      },
      {
        guid: "loop02",
        name: "Stranger",
        volume: -25,
        url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg"
      }
    ]
  });

  const [players, setPlayers] = useState(null);
  useEffect(() => {
    const players = new Tone.Players(
      {
        [assetList.assets[0].guid]: assetList.assets[0].url,
        [assetList.assets[1].guid]: assetList.assets[1].url
      },
      () => {
        console.log("player buffers loaded");
        setPlayers(players);
      }
    ).toMaster();
  }, []);

  return children({ players, assetList });
};

export default PlayersProvider;
