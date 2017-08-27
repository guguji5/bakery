let output = function (data,f,f1) {
    let onBridgeReady = function (data,f){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    f(res)
                }else if(res.err_msg == "get_brand_wcpay_request:fail" || res.err_msg == "get_brand_wcpay_request:cancel"){
                    f1(res)
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady(data,f);
    }
}

export default output;