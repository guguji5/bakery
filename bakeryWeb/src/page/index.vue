<template>
    <div>
        <header id="header-index">
            <div class="header_l"> <a class="logo" @click="jump"> 首页 </a> <span class="city">成安县 </span>    </div>
            <div class="header_r">
                <!--登录后--><a @click="jump">咕咕鸡</a><!--登录后   可以简写-->
                丨<a @click="jump">购物车</a>
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
                    <li><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien3awmr2j20qo0cign2.jpg"> </a></li>
                    <li><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien43k3bwj20qo0citab.jpg"> </a></li>
                    <li><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien4xp7ctj20ro0cnjsb.jpg"> </a></li>
                </ul>
                <ul class="ui-row-flex">
                    <li class="ui-col"><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fielyr3ykfj205u03w3yr.jpg"></a></li>
                    <li class="ui-col"><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien6657z9j205u03wjrd.jpg"></a></li>
                    <li class="ui-col"><a @click="jump"> <img src="http://ww1.sinaimg.cn/large/7ec3646fgy1fien6kc4arj205u03wt9h.jpg"></a></li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {isUser,insertUser,accessToken} from '../service'
    import { Swipe, SwipeItem } from 'mint-ui';

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
            jump(){
                this.$router.push({ name: 'category',})
            },
        },
        mounted(){
            var code;
            var param=window.location.search;
            param=param.substring(1,param.length);
            var paramArr=param.split('&');
            paramArr.forEach(function (value,key) {
                if(value.indexOf('code')==0){
                    code=value.substr(5);
                }
            })

            let that=this;
            //判断当前用户是否在user表中，如果没有则插入一条
            isUser(that.openid).then(function (res) {
                if(res.data.isThere){
                    console.log('此用户之前已登陆过本公众号')
                }else {
                //如果没登陆过，则插入用户表
                    insertUser(that.fakeData).then(function (res) {
                        console.log(res)
                    })
                }
            })
            if(code){
                accessToken(code).then(function (res) {
                    console.log(res);
                })
            }else{
                console.log('木有code')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
