import React from "react";
import { Song } from "../types";
import { checkAnswer } from "../helpers";

import "../styles/PostScreen.scss";
import SpotifyEmbed from "./SpotifyEmbed";

interface IPostScreen {
  isVictory: boolean;
  answers: Song[];
  song: Song;
}
const PostScreen = ({ isVictory, answers, song }: IPostScreen) => {
  return (
    <>
      <SpotifyEmbed trackId={song.id} />
      <div>
        {`${isVictory ? "You got it! Pog!" : "Better luck next time. Sadge"}`}
      </div>
      <div className="guess-summary">
        {answers.map((answer, index) => {
          // @ts-ignore
          const cellClass = answer.skipped
            ? "skipped"
            : checkAnswer(answer, song)
            ? "correct"
            : "incorrect";
          return <div className={`guess-summary-cell ${cellClass}`}></div>;
        })}
      </div>
    </>
  );
};

export default PostScreen;
