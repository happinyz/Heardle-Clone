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
      const selector = "answer-cell";
      const currAnswer = answers.at(i);

      const text = currAnswer?.skipped ? "SKIPPED" : currAnswer?.title;

      return <div className={selector}>{text}</div>;
    });
  };

  return <div className="answer-grid">{generateGrid()}</div>;
};

export default AnswerGrid;
