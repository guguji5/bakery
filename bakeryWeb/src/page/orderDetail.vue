<template>
    <div>
        <section class="dd-xq">
            <div class="add ui-border-b mb10 bg-fff">
                <ul>
                    <li> 收货人：{{data.delivery.name}} <span class="r">{{data.delivery.phone}} </span>  </li>
                    <li class="c-999"> 收货地址：{{data.delivery.address}} </li>
                </ul>
            </div>
            <ul class="ui-list ui-list-one cp ui-border-t" v-for="item in data.goods">

                <li>
                    <div class="ui-list-thumb">
                        <img :src="'http://localhost:3000'+item.img_url">
                    </div>
                    <div class="ui-list-info">
                        <div class="ms"><h4 class="ui-nowrap">{{item.name}}</h4><p class="c-ccc"> {{item.sizeContent}}
                            ;</p></div>
                        <div class="ui-txt-info"><p>{{item.price}}</p><p>×{{item.piece}}</p><div></div></div>
                    </div>
                </li>

            </ul>
            <ul class="ui-list ui-list-text  mb10" style="    border-top: 1px solid #cccccc;">
                <li class="ui-border-b p10">
                    <span class="tr">合计</span>
                    <p>{{data.amount}}+{{data.fee}}运费<br><em class="c-blue">{{data.amount+data.fee}}</em></p>
                </li>
                <li class="ui-border-b p10">
                    <div>
                        <p>订单号：E097568908</p>
                        <p class="c-999">{{data.create_time}}</p>
                        <p class="c-999" v-show="data.status"> 已完成订单 </p>
                        <p class="c-999" v-show="!data.status"> 待处理订单 </p>
                    </div>
                </li>
            </ul>

        </section>
        <section class="sc-j" style="margin-top:-5%;margin-bottom:45px">
            <ul class="ui-list ui-list-one p10 ui-border-tb mb10">
                <li class="t">
                    <div class="ui-flex-pack-end btn" style="padding:0px;margin-bottom:45px">
                        <a href="" class="radius5" v-show="data.status">再次购买</a>
                        <a href="" class="radius5" v-show="!data.status">去付款</a>

                        <a href="" class="radius5" v-show="data.status">添加评价</a>
                        <a href="" class="radius5" v-show="!data.status">取消订单</a>
                        <!--<a href="" class="radius5" style="margin-top: 10px;">退换货申请</a>-->

                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import {queryOrderById} from '../service'
    export default {
        name: 'orderDetail',
        data () {
            return {
                data:{
                    delivery:{}//这里必须写这个delivery，如果不写，上文直接{{ data.delivery.name}} 就会是undefined
                }
            }
        },
        computed:{

        },
        methods:{

        },
        mounted(){
            let that=this;
            let _id=that.$route.params.id;
            queryOrderById(_id).then(function (res) {
                that.data=res.data;
                let amount=0;
                that.data.goods.forEach(function (v) {
                    amount+=v.piece*v.price;
                })
                that.data.amount=amount;
            })
        },
        update(){

        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
//            console.log(to,from)
//            next();

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .t a{margin-top: 10px;}
    .c-999 {
        color: #999;
    }
</style>
