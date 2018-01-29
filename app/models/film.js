
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FilmSchema   = new Schema({
    nom: String,
    comment: String
});

module.exports = mongoose.model('Film', FilmSchema);
