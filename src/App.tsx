import * as React from "react";
//import Title from "./components/Title";

import Header from "./components/Header";
import Footer from "./components/Footer";
import GitHubLogo from "./components/GitHubLogo";

import Pattern from "./Pattern";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />

      <GitHubLogo />
      {/* <Title /> */}
      <Pattern />

      <Footer />
    </>
  );
};

export default App;
