var http = require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Film = require('./app/models/film');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/films')
        .post(function(req, res) {
        var film = new Film();
        film.nom = req.body.nom;
        film.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Film créé!' });
        });
    });


router.route('/films').get(function (req, res)
{
    Film.find(function (err, films) {
        if (err)
            res.send(err);
        res.json(films)});
    });

app.use('/api', router);

router.route('/films:id/comments')
    .get(function (req, res) {
        res.end(JSON.stringify(findFilm(req.params.id).comments));
    });


router.route('/films:id/comments')
    .post(function (req, res) {
        film.comment = req.body.comment;
        film.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment créé!' });
        });
    });

router.route('/film/id')
    .delete(function(req, res) {
        Film.remove({
            id: req.params.id
        }, function(err, film) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/film/id/comments')
    .delete(function(req, res) {
            Film.remove({
            comment: req.params.comment
        }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/film/id/comments')
    .put(function(req, res) {
        Film.findById(req.params.id, function(err, film) {
            if (err)
                res.send(err);
            film.comment = req.body.comment;
            film.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Film mis à jour!' });
            });
        });
    });




// Connect to the db
mongoose.connect('mongodb://localhost:27017/filmBase');

http.listen(8080, function () {
    console.log("server started");
    })

