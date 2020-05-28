const cass = require('cassandra-driver');

const client = new cass.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews'
});


// module.export = {
//   post: create,
//   delete: destroy,
//   put: update,
//   get: read,
//   getAll: getAllReviews
// };