const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const API_URL = 'https://assignments.reaktor.com/birdnest/drones';
const API_OWNERS = 'https://assignments.reaktor.com/birdnest/pilots';
app.use(cors());
app.use(express.static('frontend/build'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());

app.get('/api', (req, res) => {
  request({ url: `${API_URL}` }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});
app.get('/owners', (req, res) => {
  const droneId = req.query.droneID;
  request(
    {
      url: `https://assignments.reaktor.com/birdnest/pilots/${droneId}`,
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        console.log('error');
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
