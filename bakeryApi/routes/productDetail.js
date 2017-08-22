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
         // get_prod: function(cb) {
         //    var cursor =db.collection('product').findOne({"_id":o_id})
         //    // 无论他找到与找不到，他都会有进入第一个回调
         //     cursor.then(function(res){
         //        if(res===null){
         //          cb('没有查询到id为'+id+'的记录')
         //        }
         //        cb(null,res);
         //     })
         //  },
          get_product: function(cb) {
            var cursor =db.collection('product').findOne({"_id":o_id})
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

              
          }],
           get_assess:function (cb) {
              var result=[];
              var cursor=db.collection('order').find({
                  status:true,
                  "goods.productId":id
              });
              cursor.each(function(err, doc) {
                  d.assert.equal(err, null);
                  if (doc != null) {
                      result.push({
                          userId:doc.userId,
                          content:doc.assessment,
                          createTime:doc.create_time
                      });
                  } else {
                      cb(null,result);
                  }
              });
          },
           get_assess_info:['get_assess',function (results,cb) {
               var result=[];
               var userArr = results.get_assess;
               if(Object.prototype.toString.call(userArr).indexOf('Array')>-1 && userArr.length>0){
                   var openids = userArr.map(function (value) {
                       return value.userId;
                   })
                    var cursor =db.collection('user').find({"openid":{$in:openids}})
                   cursor.each(function(err, doc) {
                       d.assert.equal(err, null);
                       if (doc != null) {
                           result.push(doc)
                       } else {
                           cb(null,result);
                       }
                   });

               }else{
                   cb(null);
               }

           }]
       }, function(err, results) {
          // console.log('err = ', err);
          // console.log('results = ', results);

          if(err){
            callback(err);
          }else{
            var temp=results.get_product;
            var assess=results.get_assess;
            //根据userId--> 用户表里的openId 去把它的基本信息拉出来
            assess.forEach(function (value,key) {
                results.get_assess_info.forEach(function (v,k) {
                    if(value.userId == v.openid){
                        value.city=v.city;
                        value.headimgurl=v.headimgurl;
                        value.nickname=v.nickname;
                        value.province=v.province;
                    }
                })
            })
            
            temp.sizeContent=results.get_size;
            temp.tags=results.get_tags;
            temp.assess=assess;
            // Object.assign(temp,results.get_prod)
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