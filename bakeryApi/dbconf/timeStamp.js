//生成时间戳，单位为秒
var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

module.exports=createTimestamp;