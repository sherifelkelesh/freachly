const users = require('./users.json');
const comments = require('./comments.json');
const mongoose = require('mongoose');

const User = require('./src/lib/model/User');
const Comment = require('./src/lib/model/Comment');

mongoose.connect('mongodb://mongo:27017/demodb');
const db = mongoose.connection;

async function run() {
  for (const user of users) {
    await new User(user).save().then().catch(err => console.error(err));
  }
  for (const comment of comments) {
    await new Comment(comment).save().then().catch(err => console.error(err));
  }
};

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', async function () {
  await run();
  console.log('finished');
});

module.exports = run;