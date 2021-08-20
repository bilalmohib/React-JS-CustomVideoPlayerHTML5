import React, { useState, useEffect } from "react";
import video from "../video/video.mp4";
import "../Styling/Player.css";

const Player = () => {

    //value for Volume
    const [value, setValue] = useState(1);
    const [videoTime,setVideoTime] = useState('');
    const [videoDuration,setVideoDuration] = useState('');

    const [cMinutes,setCMinutes] = useState(0);
    const [cSeconds,setCSeconds] = useState(0);
    const [dMinutes,setDMinutes] = useState(0);
    const [dSeconds,setDSeconds] = useState(0);

    const setVolume = (e) => {
        const volumeValue = e.target.value;
        setValue(volumeValue);

        const videoPlayer = document.querySelector('.video-player');
        const video = videoPlayer.querySelector('.video');
        //Setting the video volume to the value
        video.volume = volumeValue;

    }

    //current time and duration
    const currentTime = (e) => {
//        console.log(e);

        const videoPlayer = document.querySelector('.video-player');

//      console.log(videoPlayer)

console.log(e.timeStamp)

        let currentMinutes = Math.floor(e.timeStamp / 60);
        let currentSeconds = Math.floor(e.timeStamp - currentMinutes * 60);
        let durationMinutes = Math.floor(e.timeStamp / 60);
        let durationSeconds = Math.floor(e.timeStamp - durationMinutes * 60);

        setCMinutes(currentMinutes);
        setCSeconds(currentSeconds);
        setDMinutes(durationMinutes);
        setDSeconds(durationSeconds);

        let currentTimeElement = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`
        let durationTimeElement = `${durationMinutes}:${durationSeconds}`

        // console.log("Current Time Element==> " + currentTimeElement);
        // console.log("Current Duration Time==> " + durationTimeElement);

        setVideoTime(currentTimeElement);
        setVideoDuration(durationTimeElement);

        // currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds}`
        // durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`
    }

    //Playing the video when on Press function is called 
    const onPress = () => {
        const videoPlayer = document.querySelector('.video-player');
        const video = videoPlayer.querySelector('.video');
        const playButton = videoPlayer.querySelector('.play-button');

        //Play and Pause button
        playButton.addEventListener('click', (e) => {
            if (video.paused) {
                video.play();
                e.target.textContent = '⏸';
            } else {
                video.pause();
                e.target.textContent = '▶️';
            }
        })
    }

    return (
        <div className="container">
            <h1>Yun Pakistan bna tha</h1>
            <hr />
            <div className="video-player">
                <video src={video}
                    poster="data:image/jpeg;base64,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"
                    className="video"
                    onTimeUpdate={(e)=>currentTime(e)}
                ></video>

                <div className="player-controls">
                    <button className="play-button" title="play" onClick={onPress} contentEditable='true'>
                        {/* ▷ */}
                        ▶️
                    </button>
                </div>

                <input
                    type="range"
                    className="controls volume"
                    min="0"
                    style={{ width: "100%", color: "red", backgroundColor: "red" }}
                    max="1"
                    step="0.001"
                    value={value}
                    onChange={(e) => setVolume(e)}
                />

                {/* <div className="time">
                    <span className="current">{videoTime}</span> / <span class="duration">{videoDuration}</span>
                </div> */}

            </div>
        </div>
    )
}
export default Player;
