import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <body>
        <div className="container">
          <div className="header">header</div>
          <div className="left-side">left-side</div>
          <div className="main">main</div>
          <div className="footer">footer</div>
          <div className="right-side">right-side</div>
        </div>
        <div className="tmp"></div>
      </body>
    </div>
  );
}

export default App;
