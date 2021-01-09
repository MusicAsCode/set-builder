import { useState, useEffect } from "react";
import Tone from "tone";

const PlayersProvider = ({ children }) => {
  const [assetList, setAssetList] = useState({
    assets: [
      {
        guid: "loop01",
        name: "Fiction",
        volume: -21,
        url: "https://f.4bars.media/6E/52/6E52A9C1F2DD41ABA6397F82CD3C619B.ogg",
        posStart: "0:0:0",
        posEnd: "4:0:0"
      },
      {
        guid: "loop02",
        name: "Fact",
        volume: -33,
        url: "https://f.4bars.media/C1/1C/C11C71DBF1CF40FE85CF1044515F115C.ogg",
        posStart: "0:0:0",
        posEnd: "4:0:0"
      },
      {
        guid: "loop03",
        name: "Stranger",
        volume: -36,
        url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg",
        posStart: "0:0:0",
        posEnd: "4:0:0"
      },
      {
        guid: "loop04",
        name: "Dream",
        volume: -24,
        url: "https://f.4bars.media/2A/EB/2AEBDC8619BF411A900EDFF406103150.ogg",
        posStart: "0:0:0",
        posEnd: "4:0:0"
      }
    ]
  });

  const [players, setPlayers] = useState(null);
  useEffect(() => {
    const players = new Tone.Players(
      {
        [assetList.assets[0].guid]: assetList.assets[0].url,
        [assetList.assets[1].guid]: assetList.assets[1].url,
        [assetList.assets[2].guid]: assetList.assets[2].url,
        [assetList.assets[3].guid]: assetList.assets[3].url
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
