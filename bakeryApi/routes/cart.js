const express = require("express")
const router = express();
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");


// 根据openid插入delivery记录
router.post("/info", (req, res) => {
  
    res.type('application/json'); 

    if(req.body){
        var param=req.body;

    }

    console.log(req.body)

    var findSizeInfo = function(db,arr,callback) {
        var results=[];
        let index=0;
        arr.forEach(function(value,key){
            if(value.size){
                db.collection('size').findOne( {
                  "num":value.size
                }, function(err, res) {
                  d.assert.equal(err, null);
                  console.log("size infomation has found success");
                  results.push(res)
                  end();
                });
            }

        })


        var end=function(){
              index++;
              if(index==arr.length){
                callback(results)
              }
          
        }

    };

    var findProdInfo = function(db,arr,callback) {
        var results=[];
        let index=0;
        arr.forEach(function(value,key){
            if(value.productId){
                db.collection('product').findOne( {
                  "_id":new ObjectId(value.productId)
                }, function(err, res) {
                  d.assert.equal(err, null);
                  console.log("product infomation has found success");
                  results.push(res)
                  end();
                });
            }

        })


        var end=function(){
              index++;
              if(index==arr.length){
                callback(results)
              }
          
        }

    };


    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);

        async.auto({
            get_size:function(cb){
                findSizeInfo(db,param,function(data) {
                  cb(null,data);
                });
            },
            get_product:function(cb){
                findProdInfo(db,param,function(data) {
                  cb(null,data);
                });
            }
          },function(err,results){
            if(err){
                callback(err);
              }else{
                
                if(results.get_size.length==results.get_product.length){
                    var temp=[];
                    results.get_product.forEach(function(value,key){
                        temp[key]=new Object();
                        temp[key].img_url=value.img_url;
                        temp[key].productId=value._id;
                        temp[key].name=value.name;
                        temp[key].sizeContent=results.get_size[key].content;
                        temp[key].size=results.get_size[key].num;
                    })
                    res.json(temp);
                }else{
                    res.send('购物车中产品信息在数据库中product表和size表查出的信息不对应')
                }
              }
            })

        



    });

})


module.exports = router