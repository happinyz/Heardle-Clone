import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

import "../styles/Player.scss";

interface IPlayer {
  songUrl: string;
  currentGuess: number;
}
const Player = ({ songUrl, currentGuess }: IPlayer) => {
  const INTERVALS = [1500, 2500, 4500, 7500, 11500, 16500];

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const newAudio = new Audio(songUrl);
    newAudio.addEventListener("timeupdate", () => {
      setCurrentTime(Math.floor(newAudio.currentTime));
    });
    setAudio(newAudio);
  }, [songUrl]);

  const resetAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (audio) {
      if (audio.paused) {
        audio.play();

        setTimeout(() => {
          resetAudio();
        }, INTERVALS[currentGuess]);
      } else {
        resetAudio();
      }
    }
  };

  return (
    <div className="player-container">
      <div>{`0:${currentTime}`}</div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faCirclePlay} size="4x" inverse />
      </button>
      <div>0:16</div>
    </div>
  );
};

export default Player;
