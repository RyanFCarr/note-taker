const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(process.env.PORT || 5500);
console.log("connected on 5500");
