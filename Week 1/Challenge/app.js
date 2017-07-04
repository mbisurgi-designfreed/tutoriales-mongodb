const express = require('express');
const engines = require('consolidate');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
    app.listen(3000, () => {
        console.log('Express started and listening in port 3000');
    });

    app.use(parser.urlencoded({ extended: true }));

    app.get('/movies', (req, res) => {
        res.render('movies', {});
    });

    app.post('/movies', (req, res) => {
        var newMovie = req.body;
        
        db.collection('movies').insertOne(newMovie, (err, result) => {
            res.send(result.insertedId);
        });
    });
});
