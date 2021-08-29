import React, { useState, useRef, useEffect } from "react";
import Video from "./components/Video.jsx";
import DropDown from "./components/DropDown.jsx";
import "./App.css";
import SineWaves from "sine-waves";
function App() {
  useEffect(() => {
    /*
 * Demo of https://github.com/isuttell/sine-waves
 */

    var waves = new SineWaves({
      el: document.getElementById('waves'),
      speed: 9,
    

      ease: 'SineInOut',

      wavesWidth: '100%',

      waves: [
        {
          timeModifier: 4,
          lineWidth: 2,
          amplitude: -7,
          wavelength: 9,
          segmentLength: 2, // 
          strokeStyle: 'rgba(0,0,0,1)',
          type: function(x, waves) {
            return ((Math.sin(x) * waves.sin(x))/waves.sin(x)); // Combine two together
          }
        }
      ],

      // Called on window resize
      resizeEvent: function () {
        var gradient = this.ctx.createLinearGradient(0, 0, 500, 0);
        gradient.addColorStop(0, "rgba(0,0, 0, 0.9)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(1, "rgba(23, 210, 168, 0.2)");

        var index = -1;
        var length = this.waves.length;
        while (++index < length) {
          this.waves[index].strokeStyle = gradient;
        }

        // Clean Up
        index = void 0;
        length = void 0;
        gradient = void 0;
      }
    });
  })
  return (
    <>
      <div>
        <br />
        <Video />
        <br />
        {/* <div id="container">
          <canvas id="waves"></canvas>
        </div> */}
      </div>
    </>
  )
}
export default App;
