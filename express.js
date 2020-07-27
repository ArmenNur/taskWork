const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan')

const app = express();

require('./mongoose')

fs.readdirSync(path.join(__dirname + '/models')).forEach(paths => {
    require(path.join(__dirname + '/models/' + paths))
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.route('/').get((req, res) => {
    res.render(path.join(__dirname + '/index.html'))
})
fs.readdirSync(path.join(__dirname + '/routes')).forEach(paths => {
    require(path.join(__dirname + '/routes/' + paths))(app)
})

module.exports = app;