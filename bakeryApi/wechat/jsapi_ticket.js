//获取基础的jsapi_ticket 并缓存起来
const request = require('request');
const ticket =  require('./setJsapi-ticket');
const log = require('../dbconf/log.js');

let jsapi_ticket = access_token => new Promise(function (resolve,reject) {
    //应该存起来，先去哪缓存的。
    ticket.query(function (data) {
        if(data){
            //如果获取到jsapi_ticket，则不用去拿
            console.log('jsapi_ticket还未过期',log.date())
            resolve(data);
        }else{
            request({
                url:"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi",
                method: "get",
                json: true
            }, function (error, response, body) {
                if (!body.errcode && response.statusCode == 200 && body.errcode==0) {
                    console.log('jsapi_ticket不存在或已过期',log.date())
                    console.log('success jsapi_ticket:',body,log.date())
                    ticket.set(body.ticket)
                    resolve(body);
                }else{
                    console.log('failure ticket:',body,log.date());
                    reject(body);
                }
            })
        }
    })


})

module.exports = jsapi_ticket;