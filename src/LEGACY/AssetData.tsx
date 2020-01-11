import axios from "axios";

export interface SetDataItem {
  url: string;
}

declare const ResultData: SetDataItem[];

export default class SetData {
  bpm: string = "126.25";
  // constructor(inBpm: string) {
  //     this.bpm = inBpm;
  // }
  greet() {
    return axios.get("https://atos.micromanager.ai/asset/search/126.25");
  }
}
