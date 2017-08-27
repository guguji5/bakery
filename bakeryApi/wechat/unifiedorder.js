//统一下单接口
const request = require('request');
const nonceStr = require('./nonceStr');
const sign = require('./sign_md5');
const key = require('../dbconf/key.json')

var transfer = function (param) {
    //统一下单的数据
    let data = {
        appid : key.appid,
        attach : '',
        body : '',
        mch_id : key.mch_id,
        nonce_str: nonceStr(),
        notify_url : "http://test.xq0213.top/WeChat/notify",// 微信付款后的回调地址
        openid : "",
        out_trade_no :'',//new Date().getTime(), //订单号
        spbill_create_ip : "", //客户端的 ip
        total_fee : 1, //商品的价格， 此处需要注意的是这个价格是以分算的， 那么一般是元， 你需要转换为 RMB 的元
        trade_type : 'JSAPI',
    }
    Object.assign(data,param);
    console.log('\n待签名数据:',data)
    data.sign = sign(data).toUpperCase();
    console.log('\n签名：',data.sign);
    var body = '<xml> ' +
        '<appid>'+data.appid+'</appid> ' +
        '<attach>'+data.attach+'</attach> ' +
        '<body>'+data.body+'</body> ' +
        '<mch_id>'+data.mch_id+'</mch_id> ' +
        '<nonce_str>'+data.nonce_str+'</nonce_str> ' +
        '<notify_url>'+data.notify_url+'</notify_url>' +
        '<openid>'+data.openid+'</openid> ' +
        '<out_trade_no>'+data.out_trade_no+'</out_trade_no>'+
        '<spbill_create_ip>'+data.spbill_create_ip+'</spbill_create_ip> ' +
        '<total_fee>'+data.total_fee+'</total_fee> ' +
        '<trade_type>'+data.trade_type+'</trade_type> ' +
        '<sign>'+data.sign+'</sign> ' +
        '</xml>';
    console.log('\n签名后待发送的数据',body)
    return body;
}
module.exports = transfer;