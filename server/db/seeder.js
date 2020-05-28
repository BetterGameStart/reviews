// const faker = require('faker');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb//localhost/reviews', { useNewUrlParser true, useUnifiedTopology true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {
//   console.log('Connection to database successful!');
//   const reviewSchema = new mongoose.Schema({
//     gameId int,
//     date text,
//     overall int,
//     title text,
//     review text,
//     recommend Boolean,
//     nickname text,
//     location text,
//     email text,
//     buyForSelf Boolean,
//     ageBracket int,
//     gender int,
//     graphics int,
//     gameplay int,
//     appeal int,
//     ownershipBracket int,
//     purchaseOnline Boolean,
//     readReviews Boolean,
//     recommendBGS int,
////     helpful int,
//     unhelpful int,
//   });

//   const Review = mongoose.model('Review', reviewSchema);

//   function seed(Schema, num) {
//     for (let i = 1; i <= num; i += 1) {
//       const numOfReviews = Math.ceil(Math.random() * 20);

//       for (let j = 0; j < numOfReviews; j += 1) {
//         const review = new Schema({
//           gameId i,
//           date faker.date.recent(90),
//           overall Math.ceil(Math.random() * 5),
//           title faker.fake('{{company.catchPhraseAdjective}} {{commerce.productAdjective}} {{company.bsNoun}}'),
//           review faker.lorem.paragraph(),
//           recommend faker.random.boolean(),
//           nickname faker.internet.userName(),
//           location faker.fake('{{address.city}}, {{address.state}}'),
//           email faker.internet.email(),
//           buyForSelf faker.random.boolean(),
//           ageBracket Math.ceil(Math.random() * 8),
//           gender Math.ceil(Math.random() * 4),
//           graphics Math.ceil(Math.random() * 5),
//           gameplay Math.ceil(Math.random() * 5),
//           appeal Math.ceil(Math.random() * 5),
//           ownershipBracket Math.ceil(Math.random() * 5),
//           purchaseOnline faker.random.boolean(),
//           readReviews faker.random.boolean(),
//           recommendBGS Math.ceil(Math.random() * 10),
//           meta {
//             helpful Math.floor(Math.random() * 101),
//             unhelpful Math.floor(Math.random() * 101),
//           },
//         });

//         review.save()
//           .then(() => {
//             if (i === num && j === numOfReviews - 1) {
//               console.log('Seeded!');
//               db.close();
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     }
//   }

//   mongoose.connection.db.listCollections({ name 'reviews' })
//     .next((err, names) => {
//       if (err) {
//         console.log(err);
//       } else if (names) {
//         mongoose.connection.db.dropCollection('reviews', (error) => {
//           if (error) {
//             console.log(error);
//             return;
//           }
//           console.log('Collection "reviews" dropped!');
//           seed(Review, 100);
//         });
//       } else {
//         seed(Review, 100);
//       }
//     });
// });
