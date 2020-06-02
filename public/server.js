var path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const express = require('express');
const app = express();
const dbPath = "C:\\Development\\Bootcamp\\GitHub Repo\\note-taker\\db\\db.json";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(5500);
console.log("connected on 5500");

// GET
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/notes.html'))
});
app.get('/api/notes', function (req, res) {
    res.sendFile(dbPath);
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

// POST
app.post('/api/notes', function (req, res) {
    fs.readFile(dbPath, "utf8", (error, data) => {
        if (error) {
            console.log('error');
        } else {
            const db = JSON.parse(data);
            // Find the greatest value
            if (!req.body.id) {
                let currentID = 0;
                if(db.length === 1){
                    currentID = db[0].id;
                } else if (db.length > 1) {
                    currentID = db.reduce((accumulator, currentValue) => {
                        if (accumulator.id > currentValue.id) {
                            return accumulator.id;
                        }
                        return currentValue.id;
                    });
                }
                req.body.id = currentID + 1;
            }
            db.push(req.body);
            fs.writeFile(dbPath, JSON.stringify(db), () => { res.sendStatus(201) })
        }
    })
})
// DELETE
app.delete('/api/notes/:id', function (req, res) {
    fs.readFile(dbPath, "utf8", (error, data) => {
        if (error) {
            console.log('error');
        } else {
            const db = JSON.parse(data).filter(note => note.id !== Number(req.params.id));
            fs.writeFile(dbPath, JSON.stringify(db), () => { res.sendStatus(200) })
        }
    })
})

