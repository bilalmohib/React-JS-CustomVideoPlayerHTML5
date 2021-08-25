import React, { useState, useRef, useEffect } from "react";
import Video from "./components/Video.jsx";
import DropDown from "./components/DropDown.jsx";

function App() {
  return (
    <>
      <div>
        <Video />
      </div>
      <div>
        <DropDown />
      </div>
    </>
  )
}
export default App;
