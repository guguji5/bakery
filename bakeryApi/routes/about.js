const express = require("express")
const router = express();
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

//获取 有多少是已完成订单，有多少是未完成订单
//
router.get("/:userId", (req, res) => {

    var userId = req.params.userId || '';
    res.type('application/json');

    var findAbout = function(db, callback) {
        var result={};
        var cursor=db.collection('order').aggregate([{
                        $match:{
                            userId:userId
                        }
                    },{
                      $group:{
                              _id:"$status",
                              count:{$sum:1}
                          }
                      }])

        cursor.each(function(err, doc) {
          d.assert.equal(err, null);
          if (doc != null) {
             if(doc._id){
                result.complete=doc.count;
             }else{
                result.unComplete=doc.count;
             }
          } else {
             callback(result);
          }
       });

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findAbout(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})



module.exports = router