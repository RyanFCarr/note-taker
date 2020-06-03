const path = require('path');
module.exports = function(app){
    // GET
    app.get('/notes', function (req, res) {
        res.sendFile(path.normalize(path.join(__dirname, '..', 'public', 'notes.html')))
    });
}
