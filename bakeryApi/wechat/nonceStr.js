var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

module.exports = createNonceStr;