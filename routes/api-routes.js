const path = require('path');
const fs = require('fs');
const dbPath = path.normalize(path.join(__dirname, '..', 'db', 'db.json'));
module.exports = function(app){
    app.get('/api/notes', function (req, res) {
        res.sendFile(dbPath);
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
}