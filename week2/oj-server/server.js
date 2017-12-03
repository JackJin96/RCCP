//3rd party
const express = require('express');
const app = express();
const path = require('path');

//self-constructed
const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

//mongo DB connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds125716.mlab.com:25716/onlinejudge');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);

app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
})

app.listen(3000, () => console.log("Example app listening on port 3000!"));