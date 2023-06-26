import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

import "../styles/Player.scss";

const INTERVALS = [1, 2, 3, 6, 10, 15];

interface IPlayer {
  streamUrl: string;
}
const Player = ({ streamUrl }: IPlayer) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [totalTime, setTotalTime] = useState<number>(1900);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleClick = () => {
    if (!audio) {
      const newAudio = new Audio(streamUrl);
      setAudio(newAudio);
      newAudio.play();
    } else {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  return (
    <div className="player-container">
      <div>{totalTime}</div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faCirclePlay} size="3x" />
      </button>
      <div>{currentTime}</div>
    </div>
  );
};

export default Player;
