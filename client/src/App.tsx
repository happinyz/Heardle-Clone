import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Player from "./components/Player";
import AnswerGrid from "./components/AnswerGrid";
import Header from "./components/Header";
import { SongGuess } from "./types";

function App() {
  const [streamUrl, setStreamUrl] = useState<string>("");

  const [answers, setAnswers] = useState<SongGuess[]>([]);

  const submitAnswer = (answer: SongGuess) => {
    if (answers.length >= 6) {
      console.log("Answer Grid full");
      return;
    }

    if (answer.skipped) {
    }

    setAnswers([...answers, answer]);
  };

  console.log(answers.length);
  useEffect(() => {
    async function getStreamUrl() {
      const response = await fetch("http://localhost:5000/stream");
      const json = await response.json();
      setStreamUrl(json.url);
      console.log(response);
    }
    getStreamUrl();
  }, []);

  console.log(streamUrl);

  return (
    <div>
      <Header />
      <AnswerGrid answers={answers} />
      <Player streamUrl={streamUrl} />
      <Input submitAnswer={submitAnswer} />
    </div>
  );
}

export default App;
