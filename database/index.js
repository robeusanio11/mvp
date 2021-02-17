const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => { console.error('Error connecting to db'); } );

db.once('open', () => { console.log('Connection to db successful'); })

module.exports = db;