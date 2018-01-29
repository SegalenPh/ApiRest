/**
 * Created by loukaine on 18/01/18.
 */
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

module.exports = {
    connect: function(url, dbName, callback){
        MongoClient.connect(url, dbName, function(err, client, _dbName){
            if (err) { throw new Error('Could not connect: '+err); }

            db = client.db(dbName);
            connected = true;

            callback(db);
        });
    },
    collection: function(name){
        if (!connected) {
            throw new Error('Must connect to Mongo before calling "collection"');
        }

        const d = db.collection(name);
        return d;
    }
};
