import * as React from "react";
import Tracks from "./Tracks";
import "./Pattern.css";
import PlayersProvider from "./PlayersProvider";
import TransportProvider from "./TransportProvider";
import "react-circular-progressbar/dist/styles.css";


export default function Pattern() {
  return (
    <>
      <TransportProvider />
      <PlayersProvider>
        {({ players, assetList }) => {
          if (!players) {
            return <p>assets loading....</p>;
          }

          return <Tracks players={players} assetList={assetList} />;
          //return <p>assets loaded {JSON.stringify(assetList.assets[0].url, null, 2)}</p>;
        }}
      </PlayersProvider>
    </>
  );
}



//import { isNull } from "util";

//this is list of assets, temporary eventually will be rest call
// const assetList = {
//   assets: [
//     {
//       guid: "loop01",
//       name: "Fiction",
//       volume: -4,
//       url: "https://f.4bars.media/E8/79/E879C9869AC64C3EA28AEACAB2AA390D.ogg"
//     },
//     {
//       guid: "loop02",
//       name: "Stranger",
//       volume: -4,
//       url: "https://f.4bars.media/E8/F1/E8F1E4E304334B5580D23F9CCC376278.ogg"
//     }
//   ]
// };

// const ToneMeter = ({player}) => {
//   const ref = React.useRef(null)
//   useLayoutEffect(() => {
//       const rect = ref.current;
//       //rect.bind(player)
//       console.log('tone-meter color:', rect.color)
//   }, [ref])
//   return (
//     <>
//     <tone-loader></tone-loader>
//     {/* <tone-meter ref={ref} level color='#eee' /> */}
//     </>
//   )
// }


