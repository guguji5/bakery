const key = require('../dbconf/key.json')
var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

/**
 * @synopsis 签名算法
 *
 * @param 统一下单 用于签名的 sign
 *
 * @returns
 */
var sign = function (param) {

    var string = raw(param)+"&key="+key.apiKey;
    console.log('md5拼成的数据：',string)
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');

    // 可任意多次调用update():
    hash.update(string);
    let result = hash.digest('hex')
    return result;
};

module.exports = sign;
