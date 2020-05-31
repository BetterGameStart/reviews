/* eslint-disable linebreak-style */
const cass = require('cassandra-driver');

const client = new cass.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews',
});
const { Mapper } = cass.mapping;

const mapper = new Mapper(client, {
  models: { reviews: { tables: ['review'] } },
});

const mapReview = mapper.forModel('reviews');
const query = 'select * from review where gameid = ? limit 100 allow filtering';
mapReview.getReviews = mapReview.mapWithQuery(query, ((review) => [review]));

async function read(id) {
  try {
    const review = await mapReview.find({ id: id });
    return review;
  } catch (err) {
    return err;
  }
}

async function getAllReviews(gameId) {
  try {
    const reviews = await mapReview.getReviews(gameId);
    return reviews;
  } catch (err) {
    return err;
  }
}

function destroy(id, cb) {
  const deleteQuery = 'delete from review where id = ?';
  client.execute(deleteQuery, [id], { prepare: true, hints: ['int'] }, (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
}

async function create(data) {
  await mapReview.insert(data)
    .then(() => 'added')
    .catch((err) => {
      throw err;
    });
}

async function update(data) {
  await mapReview.update(data)
    .then(() => 'updated!')
    .catch((err) => {
      throw err;
    });
}


module.exports = {
  post: create,
  delete: destroy,
  put: update,
  get: read,
  getAll: getAllReviews,
};
