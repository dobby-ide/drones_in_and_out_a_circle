const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const API_URL = 'https://assignments.reaktor.com/birdnest/drones';
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', (req, res) => {
  request({ url: `${API_URL}` }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
