import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Player from "./components/Player";
import AnswerGrid from "./components/AnswerGrid";
import Header from "./components/Header";
import { SongGuess } from "./types";

function App() {
  const [songUrl, setsongUrl] = useState<string>("");
  const [answers, setAnswers] = useState<SongGuess[]>([]);

  const submitAnswer = (answer: SongGuess) => {
    if (answers.length >= 6) {
      console.log("Answer Grid full");
      return;
    }

    setAnswers([...answers, answer]);
  };

  console.log(answers.length);
  useEffect(() => {
    async function getsongUrl() {
      const response = await fetch("http://localhost:5000/stream");
      const json = await response.json();
      setsongUrl(json.url);
      console.log(response);
    }
    getsongUrl();
  }, []);

  console.log(songUrl);

  return (
    <div>
      <Header />
      <AnswerGrid answers={answers} />
      <Player songUrl={songUrl} currentGuess={answers.length} />
      <Input submitAnswer={submitAnswer} />
    </div>
  );
}

export default App;
