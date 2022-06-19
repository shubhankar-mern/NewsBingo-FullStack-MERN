const mongoose = require('mongoose');

const mongo_url = 'mongodb://localhost:27017/FullStackDB';

mongoose.connect(mongo_url);

const db = mongoose.connection;

db.once('error', (error) => {
  console.log('error in connecting db');
});

db.once('open', () => {
  console.log('Conncted to DB');
});

module.exports = db;
