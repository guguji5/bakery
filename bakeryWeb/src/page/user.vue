<template>
    <div>
        <header id="header" style="background:#6BC4DF">
            <div class="header_l"> <a class="fh" href="javascript:history.back(-1)"> 返回</a>  </div>
            <h1> {{nickname}}</h1>
            <div class="header_r">

            </div>
        </header>

        <section class="hy-zx">
            <ul class="ui-tiled bg-fff nav">
                <li @click="jump(0)">
                    <b>{{unComplete}}</b>
                    <div>
                        未完成
                    </div>
                </li>
                <li @click="jump(1)">
                    <b>{{complete}}</b>
                    <div>
                        已完成
                    </div>
                </li>
                <!--<li><a href="http://m.holiland.com/mobile/user.php?act=integral"><b>0</b><div>积分</div></a></li>-->
            </ul>
            <ul class="ui-list ui-list-text ui-list-link ui-border-tb p10 mb10">
                <li class="p10 ui-border-b disp_a" @click="jump(2)"> 全部订单</li>
                <!--<li class="p10 disp_a"> <a href="http://m.holiland.com/mobile/user.php?act=favorite">收藏夹</a>  </li>-->
            <!--</ul>-->
            <!--<ul class="ui-list ui-list-text ui-list-link ui-border-tb p10 mb10">-->
                <!--<li class="p10 ui-border-b disp_a"> <a href="http://m.holiland.com/mobile/user.php?act=bonus">我的优惠券</a>  </li>-->
                <li class="p10 ui-border-b disp_a">
                    <a @click="$router.push({ name: 'address'})">收货地址薄</a>
                </li>
            <!--</ul>-->
            <!--<ul class="ui-list ui-list-text ui-list-link ui-border-tb p10 mb10">-->
                <li class="p10 ui-border-b disp_a" @click="test()"> <a href="">更换手机号</a>  </li>
            <!--</ul>-->
            <!--<ul class="ui-list ui-list-text ui-list-link ui-border-tb p10 mb10">-->
                <li class="p10 disp_a"> <a href="">退出</a> <!-- <a href="">登录</a> --> </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {about} from '../service';
    import wx from 'weixin-js-sdk'

    export default {
        name: 'user',
        data () {
            return {
                complete:0,
                unComplete:0
            }
        },
        computed:{
            nickname(){
                return this.$store.state.fakeData.nickname;
            }
        },
        methods:{
            jump(status){
                this.$router.push({ name: 'order', params: { status: status}})
            },
            test(){
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            }
        },
        mounted(){
            let that=this;
            let userId = that.$store.state.fakeData.openid;

            about(userId).then(function (res) {
                if(res!==null){
                    that.complete=res.data.complete ? res.data.complete : 0;
                    that.unComplete=res.data.unComplete ? res.data.unComplete : 0;
                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
