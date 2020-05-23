/* eslint-disable linebreak-style */
const faker = require('faker');
const fs = require('fs');


const writeReveiws = fs.createWriteStream('review.csv');
writeReveiws.write(`
      gameId,date,overall,title,review,recommend,nickname,location,email,buyForSelf,ageBracket,
      gender,graphics,gameplay,appeal,ownershipBracket,purchaseOnline,readReveiws,recommendBGS
      helpful,unhelpful,id`, 'utf-8');


function tenMil(writer, encode, cb) {
  let numOfReviews = 100000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      numOfReviews -= 1;
      id += 1;
      const gameId = Math.ceil(Math.random() * 1000);
      const date = faker.date.recent(90);
      const overall = Math.ceil(Math.random() * 5);
      const title = faker.fake('{{company.catchPhraseAdjective}} {{commerce.productAdjective}} {{company.bsNoun}}');
      const review = faker.lorem.paragraph();
      const recommend = faker.random.boolean();
      const nickname = faker.internet.userName();
      const location = faker.fake('{{address.city}}, {{address.state}}');
      const email = faker.internet.email();
      const buyForSelf = faker.random.boolean();
      const ageBracket = Math.ceil(Math.random() * 8);
      const gender = Math.ceil(Math.random() * 4);
      const graphics = Math.ceil(Math.random() * 5);
      const gameplay = Math.ceil(Math.random() * 5);
      const appeal = Math.ceil(Math.random() * 5);
      const ownershipBracket = Math.ceil(Math.random() * 5);
      const purchaseOnline = faker.random.boolean();
      const readReviews = faker.random.boolean();
      const recommendBGS = Math.ceil(Math.random() * 10);
      const helpful = Math.floor(Math.random() * 101);
      const unhelpful = Math.floor(Math.random() * 101);

      const data = `
      ${gameId},${date},${overall},${title},${review},${nickname},${recommend},${location},${email},
      ${buyForSelf},${ageBracket},${gender},${graphics},${gameplay},${appeal},${ownershipBracket},${purchaseOnline},
      ${readReviews},${recommendBGS},${helpful},${unhelpful},${id}\n
      `;
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
