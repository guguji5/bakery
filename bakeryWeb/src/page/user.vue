<template>
    <div>
        <header id="header" style="background:#6BC4DF">
            <div class="header_l"> <a class="fh" href="javascript:history.back(-1)"> 返回</a>  </div>
            <h1> 会员中心</h1>
            <div class="header_r">

            </div>
        </header>

        <section class="hy-zx">
            <ul class="ui-tiled bg-fff nav">
                <li @click="jump(0)">
                    <b>{{complete}}</b>
                    <div>
                        未完成
                    </div>
                </li>
                <li @click="jump(1)">
                    <b>{{unComplete}}</b>
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
                <li class="p10 ui-border-b disp_a"> <a href="">更换手机号</a>  </li>
            <!--</ul>-->
            <!--<ul class="ui-list ui-list-text ui-list-link ui-border-tb p10 mb10">-->
                <li class="p10 disp_a"> <a href="">退出</a> <!-- <a href="">登录</a> --> </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {about} from '../service'
    export default {
        name: 'user',
        data () {
            return {
                complete:0,
                unComplete:0
            }
        },
        computed:{

        },
        methods:{
            jump(status){
                this.$router.push({ name: 'order', params: { status: status}})
            }
        },
        mounted(){
            let that=this;
            about().then(function (res) {
                if(res!==null){
                    that.complete=res.data.complete;
                    that.unComplete=res.data.unComplete;
                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
