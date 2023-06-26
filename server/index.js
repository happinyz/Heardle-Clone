const express = require('express');
const cors = require('cors');

const fs = require("fs");
// const songs = require("../songs/songs.json");

const app = express();

const PORT = 5000;

const URL = 'https://p.scdn.co/mp3-preview/cea8b314f8b3777c6b87a45187b7b522d3911fde?cid=0b297fa8a249464ba34f5861d4140e58'

var songs = JSON.parse(fs.readFileSync('./songs/songs.json', 'utf8'));

const getRandomSong = () => {
  const numSongs = songs.length;
  const song = songs[Math.floor(Math.random() * numSongs)]
  return song;
};

app.use(cors());

app.get('/stream', (req, res) => {
  // request(URL, function(error, response, body) {
  //   const songUrl = JSON.parse(body).media.transcodings.filter(transcoding => transcoding.format.protocol === 'progressive')[0].url;
  //   res.json({ url: songUrl });
  // });
  res.json({ url: URL})
});

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