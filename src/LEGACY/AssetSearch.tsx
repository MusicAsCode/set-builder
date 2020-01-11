import React from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

interface Data {
  assets: string;
}

interface AssetsList {
  url: string;
}

const AssetSearch = () => {
  const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: "https://atos.micromanager.ai" })
  });

  const [{ data, loading, error }] = useAxios<Data>("/asset/search/126.25");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <pre>
        assets:{" "}
        {
          //JSON.stringify(data, null, 2)
          data.assets.length
        }
      </pre>
    </div>
  );
};

export default AssetSearch;
