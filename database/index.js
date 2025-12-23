const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvp')
  .catch((err) => {
    console.warn('MongoDB not available. Database features will not work.');
    console.warn('To use database features, install and start MongoDB.');
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.warn('MongoDB connection error:', err.message);
});

db.once('open', () => {
  console.log('Connection to db successful');
});

module.exports = db;