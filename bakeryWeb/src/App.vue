<template>
  <div id="app" style="height:100%">
      <mt-spinner type="snake" color="rgb(100, 100, 100)" :class="{loading:isloading}" style="display: none;"></mt-spinner>
    <router-view class="wrap"></router-view>
    <foot></foot>
    <div id="z-z" :class="{block:isloading}"></div>

  </div>
</template>

<script>
import Vue from 'vue'
import foot from './components/footer.vue';
import { Spinner } from 'mint-ui';
import wx from 'weixin-js-sdk'
import {isUser,insertUser,getUserInfo,signature} from './service'

Vue.component(Spinner.name, Spinner);
export default {
  name: 'app',
  data(){
    return {

    }
  },
  computed:{
      isloading(){
          return this.$store.state.isloading;
      }
  },
  components: {
      foot
  },
  created(){
      let param1 ={
          timestamp:+new Date(),
          url:window.location.href.split('#')[0]
      }
      signature(param1).then(function (res) {
          console.log(res)
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appid, // 必填，公众号的唯一标识
              timestamp:res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: 'guguji5', // 必填，生成签名的随机串
              signature: res.data.signature,// 必填，签名，见附录1
              jsApiList: ['scanQRCode','onMenuShareAppMessage','chooseWXPay','chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
      });

  },
  mounted(){
      var that = this;
      document.addEventListener('click',function (e) {
          that.$store.commit('footListFalse')
      })
      var code;
      var param=window.location.search;
      param=param.substring(1,param.length);
      var paramArr=param.split('&');
      paramArr.forEach(function (value,key) {
          if(value.indexOf('code')==0){
              code=value.substr(5);
          }
      })
      let userinfo = JSON.parse(localStorage.getItem('userinfo'));
      if(code){
          // 通过网页授权进来的
          console.log('网页授权')
          getUserInfo(code).then(function (res) {
              if(!res.data.errcode){
                  that.$store.commit('setUserInfo',res.data);
                  localStorage.setItem('userinfo',JSON.stringify(res.data));
                  //微信授权肯定第一次登陆，插入用户表
                  insertUser(res.data).then(function (res) {
                      console.log(res);
                  })

              }else{
                  console.log(res.data.errcode);
              }
          })
      }else{
          if(Object.prototype.toString.call(userinfo).indexOf('Object') > -1 && userinfo.openid){
              //先判断localstorage存在，再去user表里查询
              console.log('localstorage已存在')
              //判断当前用户是否在user表中，如果没有则跳转到授权页面
              isUser(userinfo.openid).then(function (res) {
                  if(res.data.isThere){
                      console.log('此用户之前已登陆过本公众号');
                      that.$store.commit('setUserInfo',res.data.data)
                  }else {
                      window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx22e00a74ae666fe7&redirect_uri=http://test.xq0213.top&response_type=code&scope=snsapi_userinfo#wechat_redirect"
                  }
              })
          }else{
              window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx22e00a74ae666fe7&redirect_uri=http://test.xq0213.top&response_type=code&scope=snsapi_userinfo#wechat_redirect"
          }
      }
      wx.ready(function() {
          console.log('wx.ready');
          wx.onMenuShareAppMessage({
              title: 'heiheihei', // 分享标题
              desc: 'This is a test!', // 分享描述
              link: 'test.xq0213.top', // 分享链接
              imgUrl: 'http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                  // 用户确认分享后执行的回调函数
                  console.log('分享成功',that.$store.state.fakeData)
              },
              cancel: function() {
                  // 用户取消分享后执行的回调函数
              }
          });
      });

      wx.error(function(res){

          console.log('wx err',res);

          //可以更新签名
      });

  },
  methods:{
      test(){
          wx.scanQRCode({
              needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              }
          });
      }
  }
}
</script>

<style>
.loading{
  width: 40px;height: 40px;position: fixed;top: calc(50% - 20px);z-index: 10000;left: calc(50% - 20px);display: block !important;
}
</style>
