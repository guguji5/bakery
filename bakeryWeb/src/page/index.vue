<template>
    <div>
        <header id="header-index">
            <div class="header_l"> <a class="logo" @click="jump"> 首页 </a> <span class="city">成安县 </span>    </div>
            <div class="header_r">
                <a @click="jump('user')">{{fakeData.nickname}}</a>
                丨<a @click="jump('cart')">购物车</a>
            </div>
        </header>
        <!--头部-->
        <section class="ui-container">
            <!-- 轮播图-->
            <div style="height:180px">
                <mt-swipe :auto="4000">
                    <mt-swipe-item><img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien2vq1c7j20ro0cn0tu.jpg" alt=""></mt-swipe-item>
                    <mt-swipe-item><img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien3awmr2j20qo0cign2.jpg" alt=""></mt-swipe-item>
                    <mt-swipe-item><img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien3rdbcuj20qo0cimxo.jpg" alt=""></mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 轮播图-->
            <form method="get" >
                <div class="ui-searchbar ui-form">
                    <button type="submit" class="btn"> </button>
                    <input value="" type="search" name="keywords" placeholder="商品搜索：请输入商品关键字" class="input radius5">
                </div>
            </form>

            <div class="nav">
                <ul class="nav-list">
                    <li><a @click="test()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien3awmr2j20qo0cign2.jpg"> </a></li>
                    <li><a @click="jump()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien43k3bwj20qo0citab.jpg"> </a></li>
                    <li><a @click="jump()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien4xp7ctj20ro0cnjsb.jpg"> </a></li>
                </ul>
                <ul class="ui-row-flex">
                    <li class="ui-col"><a @click="jump()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fielyr3ykfj205u03w3yr.jpg"></a></li>
                    <li class="ui-col"><a @click="jump()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien6657z9j205u03wjrd.jpg"></a></li>
                    <li class="ui-col"><a @click="jump()"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien6kc4arj205u03wt9h.jpg"></a></li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {isUser,insertUser,getUserInfo} from '../service'
    import { Swipe, SwipeItem } from 'mint-ui';
    import wx from 'weixin-js-sdk'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'index',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed:{
//            真是的取用户的逻辑还有待调整
            openid(){
                return this.$store.state.fakeData.openid
            },
            fakeData(){
                return this.$store.state.fakeData
            }
        },
        methods:{
            jump(router){
                router= router || 'category';
                console.log(router);
                this.$router.push({ name: router})
            },
            test(){
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    }
                });
//                wx.chooseWXPay({
//                    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//                    nonceStr: '', // 支付签名随机串，不长于 32 位
//                    package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//                    signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//                    paySign: '', // 支付签名
//                    success: function (res) {
//                        // 支付成功后的回调函数
//                    }
//                });
            }
        },
        mounted(){
//            var code;
//            var param=window.location.search;
//            param=param.substring(1,param.length);
//            var paramArr=param.split('&');
//            paramArr.forEach(function (value,key) {
//                if(value.indexOf('code')==0){
//                    code=value.substr(5);
//                }
//            })
//
//            let that=this;
//
//            if(code){
////                通过网页授权进来的
//                console.log('网页授权')
//                getUserInfo(code).then(function (res) {
//                    if(!res.data.errcode){
//                        that.$store.commit('setUserInfo',res.data)
//
//                        //判断当前用户是否在user表中，如果没有则插入一条
//                        isUser(that.openid).then(function (res) {
//                            if(res.data.isThere){
//                                console.log('此用户之前已登陆过本公众号');
//
//                            }else {
//                                //如果没登陆过，则插入用户表
//                                insertUser(that.fakeData).then(function (res) {
//                                    console.log(res);
//                                })
//                            }
//                        })
//                    }else{
//                        console.log(res.data.errcode);
//                    }
//
//
//                })
//            }else{
////                正常进入，已有localstorage
//                console.log('已存在localstorage')
//            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
