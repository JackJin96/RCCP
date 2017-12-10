//3rd party
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService')(io);

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

const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening(){
    console.log('App is listeing at port 3000!');
}