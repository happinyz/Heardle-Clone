const express = require('express');
const cors = require('cors');

const fs = require("fs");
// const songs = require("../songs/songs.json");

const app = express();

const PORT = 5000;

const songsDirectory = path.join(process.cwd(), 'songs');
var songs = JSON.parse(fs.readFileSync(songsDirectory + '/songs.json', 'utf8'));

const getRandomSong = () => {
  const numSongs = songs.length;
  const song = songs[Math.floor(Math.random() * numSongs)]
  return song;
};

app.use(cors());

app.get('/allsongs', (req, res) => {
  res.json(songs);
})

app.get('/song', (req, res) => {
  const song = getRandomSong();

  res.json(song);
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
});