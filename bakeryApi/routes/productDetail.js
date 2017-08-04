const express = require("express")
const router = express();
const d = require('../dbconf/')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

router.get("/:id", (req, res) => {
  
    res.type('application/json'); 
    var id=req.params.id;
    var o_id=new ObjectId(id);
    var result={};
    res.type('application/json'); 
    var findProductDetail = function(db, callback) {
       // var cursor =db.collection('productDetail').findOne({"_id":o_id});
       // //  console.log('cursor',Object.prototype.toString.call(cursor),cursor)

       // cursor.then(function(res){
       //    callback(res);
       //    // console.log(res)
       // })

       // cursor.each(function(err, doc) {
       //    d.assert.equal(err, null);
       //    if (doc != null) {
       //       result.push(doc)
       //    } else {
       //       callback(result);
       //    }
       // });

       async.auto({
         get_prod: function(cb) {
            var cursor =db.collection('product').findOne({"_id":o_id})
            // 无论他找到与找不到，他都会有进入第一个回调
             cursor.then(function(res){
                if(res===null){
                  cb('没有查询到id为'+id+'的记录')
                }
                cb(null,res);
             })
          },
          get_product: function(cb) {
            var cursor =db.collection('productDetail').findOne({"_id":o_id})
            // 无论他找到与找不到，他都会有进入第一个回调
             cursor.then(function(res){
                if(res===null){
                  cb('没有查询到id为'+id+'的记录')
                }
                cb(null,res);
             })
          },
          get_size: ['get_product',  function(results, cb) {
            var sizes=results.get_product.size;
            var result=[];
            var cursor =db.collection('size').find({num:{$in:sizes}})

             cursor.each(function(err, doc) {
                d.assert.equal(err, null);
                  if (doc != null) {
                     result.push(doc.content)
                  } else {
                     cb(null,result);
                  }

             });

              
          }],
          get_tags: ['get_product',  function(results, cb) {
            var tags=results.get_product.tags;
            var result=[];
            var cursor =db.collection('tags').find({num:{$in:tags}})

             cursor.each(function(err, doc) {
                d.assert.equal(err, null);
                if (doc != null) {
                   result.push(doc.content)
                } else {
                   cb(null,result);
                }
             });

              
          }]
      }, function(err, results) {
          // console.log('err = ', err);
          // console.log('results = ', results);

          if(err){
            callback(err);
          }else{
            var temp=results.get_product;
            temp.sizeContent=results.get_size;
            temp.tags=results.get_tags;
            Object.assign(temp,results.get_prod)
            callback(temp)
          }
          
      });

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findProductDetail(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})



module.exports = router