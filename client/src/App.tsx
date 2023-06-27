import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Player from "./components/Player";
import AnswerGrid from "./components/AnswerGrid";
import { Song } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faChartSimple,
  faHeart,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./styles/Header.scss";
import "./styles/Player.scss";
import "./styles/App.scss";
import SpotifyEmbed from "./components/SpotifyEmbed";

function App() {
  const [song, setSong] = useState<Song>({} as Song);
  const [answers, setAnswers] = useState<Song[]>([]);
  const [songsList, setSongsList] = useState<Song[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("");

  const submitAnswer = (answer: Song) => {
    if (answers.length >= 6) {
      console.log("Answer Grid full");
      setGameStatus("lost");
      return;
    }

    if (checkAnswer(answer)) {
      setGameStatus("won");
    }

    setAnswers([...answers, answer]);
  };

  const checkAnswer = (answer: Song) => {
    return answer.id === song.id;
  };

  useEffect(() => {
    async function getAllSongs() {
      const response = await fetch("http://localhost:5000/allsongs");
      const json = await response.json();
      setSongsList(json);
    }

    async function getRandomSong() {
      const response = await fetch("http://localhost:5000/song");
      const songObject = await response.json();
      setSong(songObject);
      console.log(songObject.title);
    }
    getRandomSong();
    getAllSongs();
  }, []);

  return (
    <div className="flex">
      <Header />
      {gameStatus !== "" ? (
        <>
          <SpotifyEmbed trackId={song.id} />
          <div>{`${
            gameStatus === "won"
              ? "You got it! pog!"
              : "Better luck next time. sadge"
          }`}</div>
          <div className="guess-summary">
            {answers.map((answer, index) => {
              // @ts-ignore
              const cellClass = answer.skipped
                ? "skipped"
                : checkAnswer(answer)
                ? "correct"
                : "incorrect";
              return <div className={`guess-summary-cell ${cellClass}`}></div>;
            })}
          </div>
        </>
      ) : (
        <>
          <AnswerGrid answers={answers} />
          <div className="footer-wrapper">
            <Player songUrl={song?.preview_url} currentGuess={answers.length} />
            <Input submitAnswer={submitAnswer} songsList={songsList} />
          </div>
        </>
      )}
    </div>
  );
}

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <button>
          <FontAwesomeIcon icon={faCircleInfo} size="2x" color="white" />
        </button>
        <button>
          <FontAwesomeIcon icon={faHeart} size="2x" color="white" />
        </button>
      </div>
      <div>Alvin heardle</div>
      <div>
        <button>
          <FontAwesomeIcon icon={faChartSimple} size="2x" color="white" />
        </button>
        <button>
          <FontAwesomeIcon icon={faQuestionCircle} size="2x" color="white" />
        </button>
      </div>
    </div>
  );
};

export default App;
