const express = require("express")
const router = express();
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

// 判断是否存在openid的用户信息
router.get("/:openid", (req, res) => {

    var openid=req.params.openid;
    res.type('application/json'); 
    var findUser = function(db, callback) {
        db.collection('user').findOne({"openid":openid})
        .then(function(res){
            if(res===null){
                callback({
                  message:'没有查询到openid为'+openid+'的记录',
                  isThere:false
                  })
            }else{
              // if(date()-res.subscribe_time>2592000){
              //   // 用户存在但是，信息超过一个月，更新信息
              //   callback({
              //     message:'openid为'+openid+'的信息过久，更新信息',
              //     isThere:false
              //     })
              // }else{
                callback({
                  data:res,
                  isThere:true
                });
              }
            // }

            
       })
    

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findUser(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})

// 根据openid获取delivery list
router.get("/delivery/:openid", (req, res) => {

    var openid=req.params.openid;
    res.type('application/json'); 
    var findUser = function(db, callback) {
        db.collection('user').findOne({"openid":openid})
        .then(function(res){
            // console.log(res)
           if(res===null){
              callback({
                isThere:false,
                message:'没有查询到openid为'+openid+'的记录'
              })
           }else{
              if(res.delivery.length>0){
                  callback({
                    isThere:true,
                    data:res.delivery
                  })
              }else{
                  callback({
                    isThere:false,
                    message:'没有查询到openid为'+openid+'暂无维护收货地址'
                  })
              }
              
           }
       })
    

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findUser(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})


// 新增user记录
router.put("/insert", (req, res) => {
  
    res.type('application/json'); 

    if(req.body){
        var model={
          "openid": req.body.openid,
          "nickname": req.body.nickname,
          "sex": req.body.sex,
          "language": req.body.language,
          "city": req.body.city,
          "province": req.body.province,
          "country": req.body.country,
          "headimgurl":  req.body.headimgurl,
          "subscribe_time": req.body.subscribe_time,
          "phone":"",
          "delivery":[]
      }

    }


    var insertUser = function(db, callback) {
        db.collection('user').insert( model, function(err, result) {
          d.assert.equal(err, null);
          console.log("\nuser has inserted success",log.date());
          callback(model);
        });
    

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        insertUser(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})


// 根据openid插入delivery记录
router.put("/deliveryAdd", (req, res) => {
  
    res.type('application/json'); 
// 根据openid找到对于的user然后插入address信息
    if(req.body){
        var openid=req.body.openid;

        var model={
          "id":uid(),
          "city": req.body.city,
          "country": req.body.country,
          "address": req.body.address,
          "name": req.body.name,
          "phone": req.body.phone
      }

    }


    var insertAddress = function(db, callback) {

        db.collection('user').update( {
          "openid":openid
        },{
          $push:{delivery:model}
        }, function(err, result) {
          d.assert.equal(err, null);
          console.log("user'delivery has inserted success");
          callback(model);
        });
    

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        insertAddress(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})


// 根据openid更新delivery记录
router.put("/deliveryUpdate", (req, res) => {
  
    res.type('application/json'); 
// 根据openid找到对于的user然后更新更新更新address信息
    if(req.body){
        var model={
          "delivery.$.city": req.body.city,
          "delivery.$.country": req.body.country,
          "delivery.$.address": req.body.address,
          "delivery.$.name": req.body.name,
          "delivery.$.phone": req.body.phone
        }

         var updateAddress = function(db, callback) {

          db.collection('user').update( {
            "openid":req.body.openid,
            "delivery.id":req.body.id
          },{
            $set:model
          }, function(err, result) {
            d.assert.equal(err, null);
            console.log("user'delivery has updated success");
            callback(result);
          });
      

      };

      d.MongoClient.connect(d.url, function(err, db) {
          d.assert.equal(null, err);
          updateAddress(db,function(data) {
            db.close();
            res.json(data);
          });
      });



    }else{
       res.send('参数传的不对')
    }

})



router.delete("/delivery/:id",(req,res) => {

    var id=Number(req.params.id);
    res.type('application/json'); 

    var deleteAddress = function(db, callback) {

        db.collection('user').update({},
          {$pull:{"delivery":{"id":id}}},
          {multi:true})
        .then(function(res){
              console.log(res.result);
             if(res.result.nModified>0 && res.result.n>0){
                callback({
                  isDel:true
                });
             }else{
                callback({
                  isDel:false
                })
             }
             
          })
          
    }

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        deleteAddress(db,function(data) {
          db.close();
          res.json(data);
        });
    });
 

})



module.exports = router