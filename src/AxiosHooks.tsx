import React from "react";
import useAxios from "axios-hooks";

const AxiosHooks = () => {
  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(
    "https://api.myjson.com/bins/820fc"
  );

  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: "https://api.myjson.com/bins/820fc",
      method: "PUT"
    },
    { manual: true }
  );

  function updateData() {
    executePut({
      data: {
        ...getData,
        updatedAt: new Date().toISOString()
      }
    });
  }

  if (getLoading || putLoading)
    return (
      <div>
        <h2>Hello Medium!</h2>
        <button>...</button>
        <pre>NOW: ...</pre>
        <pre>INITIAL: ...</pre>
      </div>
    );

  if (getError || putError) return <p>Error!</p>;

  function getLatestTime() {
    if (putData && putData.updatedAt) return putData.updatedAt;
    else return getData.updatedAt;
  }

  const currentTime = getLatestTime();
  return (
    <div>
      <h2>Hello Medium!</h2>
      <button onClick={updateData}>Update remote Time</button>
      <pre>NOW: {new Date(currentTime).toISOString().split("T")[1]}</pre>
      <pre>
        INITIAL: {new Date(getData.updatedAt).toISOString().split("T")[1]}
      </pre>
    </div>
  );
};

export default AxiosHooks;
