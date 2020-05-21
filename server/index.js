const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/index.js');

const app = express();
const PORT = 3002;
const jsonParser = bodyParser.json();

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}!`);
});

app.use(express.static('public'));
app.use('/games/:gameId', express.static('public'));

app.get('/reviews/:gameId', (req, res) => {
  db.Review.find({ gameId: req.params.gameId }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// app.post('/reviews/:gameId', jsonParser, (req, res) => {
//   db.Review.findById(req.body.id, (err, review) => {
//     if (err) {
//       res.status(500).send(err);
//     } else if (req.body.voteString === 'yes') {
//       review.meta.helpful += 1;
//       review.save((error) => {
//         if (err) {
//           res.status(500).send(error);
//         } else {
//           res.status(202).send();
//         }
//       });
//     } else if (req.body.voteString === 'no') {
//       review.meta.unhelpful += 1;
//       review.save((error) => {
//         if (err) {
//           res.status(500).send(error);
//         } else {
//           res.status(202).send();
//         }
//       });
//     } else {
//       res.status(400).send(`"Bad Vote String: ${req.body.voteString}"`);
//     }
//   });
// });

app.delete('/review/:gameId', (req, res) => {
  // if req.params gameId exist
  const id = String(req.params.gameId);
  db.Review.deleteOne({ _id: id }, (err) => {
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
  const id = String(req.params.id);
  db.Review.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.end();
    } else {
      res.send(data);
      res.end();
    }
  });
});