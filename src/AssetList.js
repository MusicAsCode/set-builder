export default function AssetList() {
  //this is list of assets, temporary eventually will be rest call
  const assetList = {
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
  };
  return assetList;
}
