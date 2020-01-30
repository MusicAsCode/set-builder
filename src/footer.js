import React from "react";
//import { render } from "react-dom";

const footerStyle = {
  backgroundColor: "purple",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "10px",
  margin: "0px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "10px",
  margin: "0px",
  height: "40px",
  width: "100%",
  position: "fixed"
};

export default function Footer({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>{children}</div>
    </div>
  );
}
