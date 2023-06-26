import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import "../styles/Input.scss";

const PLACEHOLDER_TEXT = "Know it? Search for the artist / title";

interface IInput {
  submitAnswer: Function | any;
}
function Input({ submitAnswer }: IInput) {
  const [value, setValue] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue("");
  };

  const handleSubmit = () => {
    document.getElementById("input")?.focus();

    if (value === "") {
      console.log("input is empty");
      return;
    }

    const songGuess = {
      title: value,
    };
    submitAnswer(songGuess);
    clearInput();
  };

  const handleSkip = () => {
    const skippedGuess = {
      skipped: true,
    };
    submitAnswer(skippedGuess);
    clearInput();
  };

  return (
    <div className="container">
      <div className={`input-container ${value === "" ? "" : "empty"}`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          id="input"
          className="song-input"
          value={value}
          placeholder={PLACEHOLDER_TEXT}
          onInput={handleInput}
        />
        <button className="input-cancel" onClick={clearInput}>
          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
        </button>
      </div>
      <div className="panel-container">
        <button className={"control-button skip"} onClick={handleSkip}>
          SKIP
        </button>
        <button className={"control-button submit"} onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Input;
