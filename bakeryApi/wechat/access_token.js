//获取基础的access_token 并缓存起来
const request = require('request');
const access = require('./setAccess_token')
const key = require('../dbconf/key.json');
const log = require('../dbconf/log.js');
let promise = new Promise(function(resolve, reject) {
    //应该存起来，先去哪缓存的。
    console.log('before')
    access.queryAccessToken(function (data) {
        console.log('\nqueryAccessToken',data,log.date())
    })
    console.log('after')
    request({
        url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+key.appid+"&secret="+key.appserect,
        method: "get",
        json: true
    }, function (error, response, body) {
        if (!body.errcode && response.statusCode == 200) {
            console.log('success access_token:',body,log.date())
            access.setAccessToken(body.access_token);//将获取到的access_token存入数据库，因为每天有调用限制
            resolve(body);
        }else{
            // console.log('failure access_token:',body);
            reject(body);
        }
    })
});

module.exports = promise;

