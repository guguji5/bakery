const express = require("express")
const router = express();
const crypto =  require('crypto'); //引入加密模块
const d = require('../dbconf/')
const date = require('../dbconf/date')
const uid = require('../dbconf/uid')
const log = require('../dbconf/log')
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

router.get("/", (req, res) => {
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var token ='guguji',
        signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
        nonce = req.query.nonce,//随机数
        echostr = req.query.echostr;//随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [token,timestamp,nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(resultCode === signature){
        console.log('matched',echostr)
        res.send(echostr);
    }else{
        console.log('mismatch',resultCode,signature)
        res.send('mismatch');
    }

})

router.post('/', function (req, res) {

    res.writeHead(200, {'Content-Type': 'application/xml'});

    var data = req.body.xml;
    if(data.msgtype=='text') {
        var resMsg = '<xml>' +
            '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            '<Content><![CDATA[' + data.content + ']]></Content>' +
            '</xml>';
    }

    if(data.msgtype=='text' &&( data.content=='66' || data.content ==66)) {
        var resMsg = '<xml>' +
            '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            '<Content>guguji.top</Content>' +
            '</xml>';
    }
    if(data.msgtype=='text' && data.content=='link') {
        var resMsg = '<xml>' +
            '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            '<Content><![CDATA[OAuth2.0网页授权演示<a href="https://www.baidu.com>点击这里体验</a>]]></Content>'+
            '</xml>';
    }

    if(data.event=='subscribe' && data.msgtype=='event'){
        var resMsg = '<xml>' +
            '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            '<Content>欢迎关注香满苑蛋糕屋，这里有最新鲜最美味的各种糕点~~</Content>' +
            '</xml>';

    }



    console.log('reqData:',data,'resData:',resMsg);
    res.end(resMsg);
});



module.exports = router
