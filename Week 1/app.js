// Setting up server with Express
var express = require('express');
var engines = require('consolidate');

var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// NodeJS driver
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
    assert.equal(null, err);
    console.log('Successfully connected to server');

    app.get('/', (req, res) => {
        db.collection('movies').find({}).toArray((err, docs) => {
            res.render('movies', { 'movies': docs })
        });
    });

    app.listen(3000, () => {
        console.log('Server started and listening on port 3000');
    });

    app.use((req, res) => {
        res.sendStatus(404);
    });

    console.log('Called find()');
});
