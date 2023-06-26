const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 5000;

const URL = 'https://p.scdn.co/mp3-preview/cea8b314f8b3777c6b87a45187b7b522d3911fde?cid=0b297fa8a249464ba34f5861d4140e58'

app.use(cors());

app.get('/stream', (req, res) => {
  // request(URL, function(error, response, body) {
  //   const songUrl = JSON.parse(body).media.transcodings.filter(transcoding => transcoding.format.protocol === 'progressive')[0].url;
  //   res.json({ url: songUrl });
  // });

  res.json({ url: URL})
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
});