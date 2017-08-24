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
router.put("/insert", (req, res) => {
    res.type('application/json');
    // console.log(req.body)
    // 根据id找到对于的order然后维护assessment信息
    if(req.body){
        var id=new ObjectId(req.body.id);
        var assessment=req.body.assessment || '';
    }
    var insertAssess = function(db, callback) {

        db.collection('order').update( {
            "_id":id
        },{
            $set:{assessment:assessment}
        }, function(err, result) {
            d.assert.equal(err, null);
            console.log("\norder'assessment has inserted success",log.date());
            callback(result);
        });
    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        insertAssess(db,function(data) {
            db.close();
            res.json(data);
        });
    });


})

//根据productId查询产品,这个接口暂时没用，因为合到了productDetail 接口里
router.get('/:productId',(req,res) =>{
    var productId = req.params.productId || '';
    res.type('application/json');
    // console.log(productId)
    var findAssess = function(db, callback) {
        var result=[];
        var cursor=db.collection('order').find({
            status:true,
            "goods.productId":productId
        });
        cursor.each(function(err, doc) {
            d.assert.equal(err, null);
            if (doc != null) {
               result.push(doc.assessment);
            } else {
                callback(result);
            }
        });

    };

    d.MongoClient.connect(d.url, function(err, db) {
        d.assert.equal(null, err);
        findAssess(db,function(data) {
            db.close();
            res.json(data);
        });
    });
})

module.exports = router