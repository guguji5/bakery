const express = require("express")
const router = express();
const d=require('../dbconf/')

router.get("/", (req, res) => {
    res.type('application/json'); 
    var result=[];
    var findTypes = function(db, callback) {
       var cursor =db.collection('type').find( );
       cursor.each(function(err, doc) {
          d.assert.equal(err, null);
          if (doc != null) {
             // console.dir(doc);
             result.push(doc)
          } else {
             callback(result);
          }
       });
    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findTypes(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})



module.exports = router