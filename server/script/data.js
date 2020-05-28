/* eslint-disable linebreak-style */
const faker = require('faker');
const fs = require('fs');


const writeReveiws = fs.createWriteStream('../../../../../../testpost3.csv');

  // copy review (gameId,date,overall,title,review,recommend,nickname,location,email,buyForSelf,ageBracket,gender,graphics,gameplay,appeal,ownershipBracket,purchaseOnline,readReviews,recommendBGS,helpful, unhelpful, id) from 'C:\Users\hackreactor\.cassandra\test01.csv' with header = false;
function tenMil(writer, encode, cb) {
  let numOfReviews = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      numOfReviews -= 1;
      id += 1;
      // const gameId = ;
      // const date = ;
      // const overall = ;
      // const title = ;
      // const review = ;
      // const recommend = ;
      // const nickname = ;
      // const location = ;
      // const email = ;
      // const buyForSelf = ;
      // const ageBracket = ;
      // const gender =;
      // const graphics = ;
      // const gameplay =;
      // const appeal = ;
      // const ownershipBracket = ;
      // const purchaseOnline = ;
      // const readReviews = ;
      // const recommendBGS = ;
      // const helpful = ;
      // const unhelpful = ;

      const data = `${Math.ceil(Math.random() * 1000)},${faker.date.recent(90)},${Math.ceil(Math.random() * 5)},${faker.fake('{{company.catchPhraseAdjective}} {{commerce.productAdjective}} {{company.bsNoun}}')},${faker.lorem.paragraph()},${faker.random.boolean()},${faker.internet.userName()},${faker.fake('{{address.city}} {{address.state}}')},${faker.internet.email()},${faker.random.boolean()},${Math.ceil(Math.random() * 8)},${ Math.ceil(Math.random() * 4)},${Math.ceil(Math.random() * 5)},${ Math.ceil(Math.random() * 5)},${Math.ceil(Math.random() * 5)},${Math.ceil(Math.random() * 5)},${faker.random.boolean()},${faker.random.boolean()},${Math.ceil(Math.random() * 10)},${Math.floor(Math.random() * 101)},${Math.floor(Math.random() * 101)},${id}\n`;
      if (numOfReviews === 0) {
        writer.write(data, encode, cb);
      } else {
        ok = writer.write(data, encode);
      }
    } while (numOfReviews > 0 && ok);
    if (numOfReviews > 0) {
      writer.once('drain', write);
    }
  }
  write();
}


tenMil(writeReveiws, 'utf-8', () => {
  writeReveiws.end();
});
