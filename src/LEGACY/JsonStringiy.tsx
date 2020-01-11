import React from "react";
import useAxios from "axios-hooks";

const AssetSearch = () => {
  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(
    "https://atos.micromanager.ai/asset/search/126.25"
  );





  if (getError) return <p>Error!</p>;

  console.log(getData)

  return (
    <div>
      <pre>
        {JSON.stringify(getData, null, 2)}
      </pre>
    </div>
  );
};

export default AssetSearch;
