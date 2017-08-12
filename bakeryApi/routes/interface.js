const express = require("express")
const router = express();
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");
var jsSHA = require('jssha');

router.get("/", (req, res) => {

    // res.type('application/json');
    let token="guguji";
    let signature = req.query.signature;
    let timestamp = req.query.timestamp;
    let echostr   = req.query.echostr;
    let nonce     = req.query.nonce;

    let oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = token;
    oriArray.sort();

    let original = oriArray.join('');
    var shaObj = new jsSHA(original, 'TEXT');
    var scyptoString=shaObj.getHash('SHA-1', 'HEX');

    if(signature == scyptoString){
        //验证成功
        console.log('interface接入成功了')
        res.send(echostr)
    } else {
        //验证失败
        res.send('interface接入失败了')
    }




})

module.exports = router