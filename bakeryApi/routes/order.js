const express = require("express")
const router = express();
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

//获取订单信息
router.get("/list/:status/:period/:userId", (req, res) => {

    // status 0 1 2 分别代表  未完成 已完成 全部
    // period 0 1 2 分别代表  近三个月   近一年   全部


    var params={};

    switch (req.params.status) {
        case "0":
          params.status=false;
          break;
        case "1":
          params.status=true;
          break;
    }

    switch (req.params.period) {
        case "0":
          params.create_time={ $gt: date()- 7776000};
          break;
        case "1":
          params.create_time={ $gt: date()- 31104000};
          break;
    }



    res.type('application/json'); 

    // console.log(params)

    var findOrder = function(db, callback) {
        var result=[];
        var cursor=db.collection('order').find(params);

        cursor.each(function(err, doc) {
          d.assert.equal(err, null);
          if (doc != null) {
             result.push(doc)
          } else {
             callback(result);
          }
       });

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findOrder(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})

//获取订单信息
router.get("/:id", (req, res) => {

    res.type('application/json'); 
    var id=req.params.id;
    var o_id=new ObjectId(id);

    var findOrder = function(db, callback) {

        var cursor=db.collection('order').findOne({"_id":o_id});
        cursor.then(function(res){
            if(res===null){
              callback('没有查询到id为'+id+'的记录')
            }else{
              callback(res);
            }
         })

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findOrder(db,function(data) {
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
          "fee": req.body.fee,
          "remark": req.body.remark,
          "goods":  req.body.goods,
          "delivery": req.body.delivery,
          "userId": req.body.userId,
          "create_time":date(),
          "status":false               //默认是未完成
      }

    }


    var insertOrder = function(db, callback) {
        db.collection('order').insert( model, function(err, result) {
          d.assert.equal(err, null);
          console.log("order has inserted success");
          callback(result);
        });
    

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        insertOrder(db,function(data) {
          db.close();
          res.json(data);
        });
    });

})





module.exports = router