const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds125716.mlab.com:25716/onlinejudge');

app.use('/api/v1', restRouter);

app.listen(3000, () => console.log("Example app listening on port 3000!"));