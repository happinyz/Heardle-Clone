import { Song } from "./types";

export const checkAnswer = (answer: Song, song: Song) => {
  return answer.id === song.id;
};
