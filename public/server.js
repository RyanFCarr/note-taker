var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

app.listen(5500);
console.log("connected on 5500");

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'))
});
app.get('/api/notes', function(req, res) {
    res.sendFile(`C:\\Development\\Bootcamp\\GitHub Repo\\note-taker\\db\\db.json`)
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});


