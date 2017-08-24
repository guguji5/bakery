// 存入access_token表
const d = require('../dbconf/');
const log = require('../dbconf/log.js');

let setTicket = (token) => {
    var insertTicket = function (db, callback) {
        db.collection('access_token').save({
            "createdAt": new Date(),
            "_id": "jsapi_ticket",
            "jsapi_ticket": token
        }, function (err, result) {
            d.assert.equal(err, null);
            console.log("\njsapi_ticket has inserted success",log.date());
            callback(result);
        });
    };

    d.MongoClient.connect(d.url, function (err, db) {
        d.assert.equal(null, err);
        insertTicket(db, function (data) {
            db.close();
        });
    })
};

let queryTicket = (f) =>{
    var findTicket = function (db, callback) {
        var cursor = db.collection('access_token').findOne({"_id": "jsapi_ticket"});

        cursor.then(function(res){
            console.log('queryTicket',res)
            if(res===null){
                callback('没有查询到jsapi_ticket的记录')
            }else{
                callback(res);
            }
        })
    };

    d.MongoClient.connect(d.url, function (err, db) {
        d.assert.equal(null, err);
        findTicket(db, function (data) {
            console.log(data);
            db.close();
            f(data);
        });
    })

}


module.exports={
    "set":setTicket,
    "query":queryTicket
};
