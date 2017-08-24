// 存入access_token表
const d = require('../dbconf/');
let setAccssToken = (token) => {
    var insertAccess = function (db, callback) {
        db.collection('access_token').save({
            "createdAt": new Date(),
            "_id": "access_token",
            "access_token": token
        }, function (err, result) {
            d.assert.equal(err, null);
            console.log("access_token has inserted success");
            callback(result);
        });
    };

    d.MongoClient.connect(d.url, function (err, db) {
        d.assert.equal(null, err);
        insertAccess(db, function (data) {
            db.close();
        });
    })
};
module.exports=setAccssToken;