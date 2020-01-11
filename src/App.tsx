import * as React from "react";
import Title from "./components/Title";
import Github from "./components/GitHubLogo";

import AcmeTrackIterator from "./AcmeTrackIterator";

const App = () => {
  return (
    <>
      <Github />
      <Title />
      <AcmeTrackIterator />
    </>
  );
};

export default App;
