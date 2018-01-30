var http = require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose   = require('mongoose');
//var Film = require('./app/models/film');
//var mongo = require('./mongo.js');
app.use('/api', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var films = [{
    id:'1',
    nom: 'Godzilla',
    comment : 'test'
},{
    id:'2',
    nom: 'Starwars',
    comment : []
}];

var users = [{
    username: 'toto'
}];
var tokens = [];


var findFilm = function (filmId) {
    for (var i = 0 ; i < films.length; i++){
        if(films[i.nom === filmId]){
            return films[i];
        }
    }
    return null;
}

var checkToken = function (token) {
    for (var i = 0 ; i < tokens.length; i++){
        if(tokens[i.nom === token]){
            return tokens[i];
        }
    }
    return false;
}




router.route('/films')
        .post(function(req, res) {
        if(!findFilm(req.params.films)){
            var film = {
                nom : req.params.nom,
                comment : req.params.comment
            }
            films.push(film);
            res.status(201);
            res.send({message:'film created'});
        } else {
            res.status(401);
            res.send({message:'film already exist'});
        }
    });


router.route('/films').get(function (req, res) {
    res.end(JSON.stringify(films))
});


router.route('/films:id/comments')
    .get(function (req, res) {
        res.end(JSON.stringify(findFilm(req.params.id).comment));
    });


router.route('/films:id/comments')
    .post(function (req, res) {
        film.comment = req.params.comment;
        film.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment créé!' });
        });
    });

router.route('/films:id')
    .delete(function(req, res) {
        Film.remove({
            id: req.params.id
        }, function(err, film) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/films:id/comments')
    .delete(function(req, res) {
            Film.remove({
            comment: req.params.comment
        }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/films:id/comments')
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

router.route('/signup')
    .post(function(req, res){
    var username = req.param('username', null);
    var pwd = req.param('pwd', null);
    console.log('signup '+username);
    if(!username || !pwd || username == 'undefined' || pwd == 'undefined'){
        res.status(400);
        res.send("error, username or pwd undefined");
    } else {
        client.get(username, function(err, reply) {
            // reply is null when the key is missing
            if(reply == null){
                client.set(username, pwd);//TODO hash
                var u = {
                    username:username,
                    date : new Date().getTime()
                }
                users.push(u);
                res.status(200);
                res.send();
            } else {
                res.status(401);
                res.send('user already exist');
            }
        });
    }
});

router.route('/signin').post(function(req, res){
    var username = req.param('username', null);
    var pwd = req.param('pwd', null);
    console.log('signin ' + username);
    if(!username || !pwd || username == 'undefined' || pwd == 'undefined'){
        console.log('signin username||pwd null' + username +' || ' + pwd);
        res.status(400);
        res.send("error");
    } else {
        if (users.
            client.get(username, function(err, reply){
                if(reply != pwd){
                    console.log('signin username||pwd null' + username +' || ' + pwd);
                    res.status(401);
                    res.send("error");
                } else {
                    var token =  generateToken();
                    tokens.push(token);
                    res.send('{"token":"'+token+'"}');

                }
            }));
    }
});
router.route('/users')
    .get(function(req, res){
    var token = req.header('token', null);
    if(checkToken(token)){
        client.get(token, function(err, reply){
            if(reply){
                res.status(200);
                res.send(JSON.stringify(users));
            } else {
                res.status(401);
                res.send('token invalid');
            }
        });
    }else {
        res.status(401);
        res.send('token invalid');
    }
});


// Connect to the db
//mongo.connect("mongodb://localhost:27017/filmBase")

http.listen(8080, function () {
    console.log("server started");
    })

