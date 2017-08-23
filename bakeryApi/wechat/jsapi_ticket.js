//获取基础的jsapi_ticket 并缓存起来
const request = require('request');

let ticket = access_token => new Promise(function (resolve,reject) {
    //应该存起来，先去哪缓存的。
    request({
        url:"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi",
        method: "get",
        json: true
    }, function (error, response, body) {
        if (!body.errcode && response.statusCode == 200) {
            // console.log('success ticket:',body)
            resolve(body);
        }else{
            // console.log('failure ticket:',body);
            reject(body);
        }
    })

})

module.exports = ticket;