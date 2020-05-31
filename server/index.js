require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/index.js');

const app = express();
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}!`);
});

app.use(express.static('public'));
app.use('/games/:gameId', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/reviews/:gameId', (req, res) => {
  db.getAll(req.params.gameId)
    .then((data) => {
      res.status(200);
      res.send(data);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    });
});

app.post('/review', (req, res) => {
  db.post(req.body)
    .then(() => {
      res.status(201);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    });
});

app.delete('/review/:id', (req, res) => {
  // if req.params gameId exist
  db.delete(req.params.id, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.get('/review/:id', (req, res) => {
  db.get(req.params.id)
    .then(({ _rs }) => {
      res.status(200);
      res.send(_rs.rows[0]);
      res.end();
    })
    .catch((err) => {
      res.status(500);
      res.end();
      console.log(err);
    });
});

app.put('/review', (req, res) => {
  db.put(req.body)
    .then(() => {
      res.status(200);
      res.end();
    })
    .catch(() => {
      res.send(500);
      res.end();
    });
});
