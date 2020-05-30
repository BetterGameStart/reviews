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
    const review = await mapReview.get({ id:id });
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

async function destroy(id) {
  try {
    await mapReview.remove({ id });
    return 'deleted!';
  } catch (err) {
    return err;
  }
}

async function create(data) {
  try {
    await mapReview.insert(data);
    return 'created!';
  } catch (err) {
    return err;
  }
}

async function update(data) {
  try {
    await mapReview.update(data);
    return 'updated!';
  } catch (err) {
    return err;
  }
}


module.exports = {
  post: create,
  delete: destroy,
  put: update,
  get: read,
  getAll: getAllReviews,
};
