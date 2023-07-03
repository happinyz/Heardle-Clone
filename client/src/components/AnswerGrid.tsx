import React, { useState, useEffect } from "react";
import { SongGuess } from "../types";

import "../styles/AnswerGrid.scss";

interface IAnswerGrid {
  answers: SongGuess[];
}
const AnswerGrid = ({ answers }: IAnswerGrid) => {
  const submitAnswer = () => {};

  const generateGrid = () => {
    return [...Array(6)].map((_, i) => {
      var selector = `answer-cell ${i === answers.length ? "active" : ""}`;
      const currAnswer = answers.at(i);

      var text = currAnswer?.title;
      if (currAnswer?.skipped) {
        text = "SKIPPED";
        selector += " skipped";
      }
      console.log(text);
      return (
        <div className={selector}>
          <span className="answer-grid-text">{text}</span>
        </div>
      );
    });
  };

  return <div className="answer-grid">{generateGrid()}</div>;
};

export default AnswerGrid;
