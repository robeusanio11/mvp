const express = require('express');
const app = express();
const path = require('path');

const PORT = 1111;

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, () => { console.log('Server listening on port:', PORT) });