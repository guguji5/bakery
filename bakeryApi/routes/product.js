const express = require("express")
const router = express();
const d=require('../dbconf/')

router.get("/", (req, res) => {
    res.type('application/json'); 
    var result=[];
    var findProducts = function(db, callback) {
       var cursor =db.collection('product').find({}).project({ name: 1, img_url: 1,price:1,prices:1,size:1});;
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
        findProducts(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})

// 根据类型查找产品list
router.get("/:type", (req, res) => {
    res.type('application/json'); 
    var type=Number(req.params.type);

    if(!isNaN(type)){
        var result=[];
        var findProducts = function(db, callback) {
           var cursor =db.collection('product').find({"type":type}).project({ name: 1, img_url: 1,price:1,prices:1});
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
            findProducts(db,function(data) {
              db.close();
              res.json(data);
            });
        });
    }else{
        res.send([]);
    }

    

})


module.exports = router