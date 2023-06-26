import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import "../styles/Input.scss";
import { DisplayedSong, Song } from "../types";
import Fuse from "fuse.js";

const PLACEHOLDER_TEXT = "Know it? Search for the artist / title";

interface IInput {
  submitAnswer: Function | any;
  songsList: Song[];
}
function Input({ submitAnswer, songsList }: IInput) {
  const [value, setValue] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<Song>({} as Song);
  const [displayedSongs, setDisplayedSongs] = useState<Song[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fuse = new Fuse(songsList, {
    keys: ["title", "artists.name"],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setIsOpen(false);
      setValue(newValue);
      return;
    }
    setIsOpen(true);
    filterSongs(newValue);
    setValue(newValue);
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

    submitAnswer(selectedSong);
    clearInput();
  };

  const handleMenuClick = (song: Song) => {
    console.log(song);
    setSelectedSong(song);
    setValue(song.title);
    setIsOpen(false);
  };

  const handleSkip = () => {
    const skippedGuess = {
      skipped: true,
    };
    submitAnswer(skippedGuess);
    clearInput();
  };

  const filterSongs = (input: string) => {
    const filteredResults = fuse
      .search(input, {
        limit: 10,
      })
      .map((fuseItem) => {
        return fuseItem.item;
      });
    setDisplayedSongs(filteredResults);
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
        {isOpen && (
          <div className="song-search-container">
            {displayedSongs.map((song, index) => {
              return (
                <div
                  className="song-search-cell"
                  key={index}
                  onClick={() => handleMenuClick(song)}>
                  {song.title}
                </div>
              );
            })}
          </div>
        )}
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
