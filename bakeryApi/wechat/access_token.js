//获取基础的access_token 并缓存起来
const request = require('request');
const key = require('../dbconf/key.json');
let promise = new Promise(function(resolve, reject) {
    //应该存起来，先去哪缓存的。
    request({
        url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+key.appid+"&secret="+key.appserect,
        method: "get",
        json: true
    }, function (error, response, body) {
        if (!body.errcode && response.statusCode == 200) {
            // console.log('success access_token:',body)
            resolve(body);
        }else{
            // console.log('failure access_token:',body);
            reject(body);
        }
    })
});

module.exports = promise;

