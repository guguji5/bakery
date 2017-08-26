const express = require("express")
const router = express();
const crypto =  require('crypto'); //引入加密模块
const d = require('../dbconf/')
const date = require('../dbconf/date');
const request = require('request');
const log = require('../dbconf/log')
const timeStamp = require('../dbconf/timeStamp')
const ObjectId = require('mongodb').ObjectID;
const async = require("async");
const xmlparse = require('../dbconf/xmlParse');
const sign = require('../wechat/sign.js');//用来生成signature
const access_token = require('../wechat/access_token.js');//用来生成signature
const jsapi_ticket = require('../wechat/jsapi_ticket.js')
const transfer = require('../wechat/unifiedorder.js')
const nonceStr = require('../wechat/nonceStr.js')
const sign_md5 = require('../wechat/sign_md5');
const key = require('../dbconf/key.json');


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
        console.log('matched',echostr,log.date())
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
            '<Content><![CDATA[OAuth2.0网页授权演示<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx22e00a74ae666fe7&redirect_uri=http://test.xq0213.top&response_type=code&scope=snsapi_userinfo#wechat_redirect">点击这里体验</a>]]></Content>'+
            '</xml>';
    }
    if(data.msgtype=='text' && data.content=='web') {
        var resMsg = '<xml>' +
            '<ToUserName><![CDATA[' + data.fromusername + ']]></ToUserName>' +
            '<FromUserName><![CDATA[' + data.tousername + ']]></FromUserName>' +
            '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
            '<MsgType><![CDATA[text]]></MsgType>' +
            '<Content><![CDATA[OAuth2.0网页授权演示<a href="http://test.xq0213.top">点击这里体验</a>]]></Content>'+
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



    // console.log('reqData:',data,'resData:',resMsg);
    res.end(resMsg);
});

router.get('/getUserInfo',function (req,res) {
    var code=req.query.code;
    if(code){
        //通过code去获取access_token (网页授权)
        request({
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx22e00a74ae666fe7&secret=bf2e9bfa3da839d38f86dc0ce1cf9cfe&code='+code+'&grant_type=authorization_code',
            method: "get",
            json: true
        }, function (error, response, body) {
	     console.log("access_token's body",log.date());
            if (!body.errcode && response.statusCode == 200) {
                // setAccessToken(body.openid,body.access_token);只是用来拿用户信息的，我只获取一次，所以不用缓存
                // setRefreshToken(body.openid,body.refresh_token);
                //拉取用户基本信息
                request({
                    url:"https://api.weixin.qq.com/sns/userinfo?access_token="+body.access_token+"&openid="+body.openid+"&lang=zh_CN",
                    method: "get",
                    json: true
                }, function (error, response, body) {
                    console.log("\nsuccess information's body",log.date())
                    if (!body.errcode && response.statusCode == 200) {
                        res.json(body)
                    }else{
                        // console.log(body);
                        res.send(body);
                    }
                })

            } else {
                console.log(body);
                res.send(body);
            }
        })
    }else{
        console.log(code);
        res.send('木有带参数，肯定不是从微信进来的吧！')
    }
})

router.post('/signature',(req,res)=>{
    if(req.body.url && req.body.timestamp){
        access_token.then(function (data) {
            // console.log(data)
            return jsapi_ticket(data.access_token)
        }).then(function (data) {
            // console.log(data) 如果是从微信接口返回的则有errcode 如果从数据库取的则有_id
            if(data.errcode===0){
                res.json(Object.assign(sign(data.ticket, req.body.url,req.body.timestamp),{
                    appid:key.appid,
                    timestamp:req.body.timestamp
                }))
            }else if(data._id){
                res.json(Object.assign(sign(data.jsapi_ticket, req.body.url,req.body.timestamp),{
                    appid:key.appid,
                    timestamp:req.body.timestamp
                }))
            }else{
                res.send(data)
            }
        })
    }else{
        res.send('没传入timestamp')
    }
})
//好像突然不用了，我把openid存localstorage了
router.get('/getOpenid',(req,res)=>{
    var code=req.query.code;
    if(code){
        //通过code去获取access_token (网页授权)
        request({
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx22e00a74ae666fe7&secret=bf2e9bfa3da839d38f86dc0ce1cf9cfe&code='+code+'&grant_type=authorization_code',
            method: "get",
            json: true
        }, function (error, response, body) {
            console.log("access_token's body",log.date());
            if (!body.errcode && response.statusCode == 200) {
                res.json(body);
            } else {
                console.log(body);
                res.send(body);
            }
        })
    }else{
        console.log(code);
        res.send('木有带参数，肯定不是从微信进来的吧！')
    }
})
//微信统一下单接口，主要获取那个prepay_id
router.get('/unifiedorder/:openid',(req,res)=>{

    let data = {
        attach : '支付测试',
        body : 'bakery',
        openid : req.params.openid,
        spbill_create_ip : req.ip, //客户端的 ip
        total_fee : 1, //商品的价格， 此处需要注意的是这个价格是以分算的， 那么一般是元， 你需要转换为 RMB 的元
        trade_type : 'JSAPI',
    }

    request({
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
        method: "POST",
        body : transfer(data),
        headers: {
            "content-type": "text/xml",
            "content-length":Buffer.byteLength(transfer(data))
        },
    }, function(error, response, body) {
        console.log('\n统一下单接口返回数据：',body)
        let xml =body.toString("utf-8")
        let return_code = xmlparse('return_code',xml)
        let result_code = xmlparse('result_code',xml)
        let prepay_id = xmlparse('prepay_id',xml)
        if(return_code =="SUCCESS" && result_code == "SUCCESS"){
            let data = {
                "appId":key.appid,     //公众号名称，由商户传入
                "timeStamp":timeStamp(),         //时间戳，自1970年以来的秒数
                "nonceStr":nonceStr(), //随机串
                "package":"prepay_id="+prepay_id,
                "signType":"MD5"         //微信签名方式：
                // "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
            }
            data.paySign = sign_md5(data).toUpperCase();
            console.log('\n用于微信支付的数据：',data)
            res.json(data);
        }else{
            res.json({
                return_code:return_code,
                result_code:result_code
            })
            console.log('\nbody',body)
            console.log('\nerror',error)
        }
    })


})


module.exports = router
