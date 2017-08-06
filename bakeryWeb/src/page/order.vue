<template>
    <div>
        <section class="ck-dd">

            <div class="hd">
                <ul class="ui-tiled bg-fff nav">
                    <li style="cursor:pointer" :class="{on:isPeriod}" @click="isPeriod=!isPeriod">
                        <em class="xl">{{period[periodSelect]}}</em>
                        <div class="x-l dropDown" style="background:#fff;">
                            <a v-for="(item,index) in period" :class="{borderBottom:index<status.length-1}" @click="periodSelect=index;getData($route.params.status,index)">{{item}}</a>
                        </div>
                    </li>
                    <li style="cursor:pointer" :class="{on:isStatus}" @click="isStatus=!isStatus">
                        <em class="px">{{status[statusSelect]}}</em>
                        <div class="p-x dropDown" style="background:#fff;">
                            <a v-for="(item,index) in status" :class="{borderBottom:index<status.length-1}" @click="jump(index)">{{item}}</a>
                        </div>
                    </li>
                </ul>
            </div>


            <div class="bd">

              
                <ul class="ui-list ui-list-one p10 ui-border-tb mb10" v-for="item in goods">
                    <li class="t ui-border-b">订单号：{{item._id}}</li>
                    <li class="ui-border-b link" v-for="good in item.goods">
                        <div class="ui-list-thumb">
                            <img :src="good.img_url">
                        </div>
                        <div class="ui-list-info">
                            <div class="ms"><h4 class="ui-nowrap">{{good.name}}</h4><p class="c-ccc"> {{good.sizeContent}}
                            </p></div>
                            <div class="ui-txt-info"><p>{{good.price}}</p><p style="  text-align: right;">×{{good.piece}}</p> </div>
                        </div>
                    </li>
                    <li class="t"><div class="j-g ">总价：<em class="c-blue">{{item.amount}}</em></div>
                        <div class="ui-list-info ui-flex-pack-end btn">
                            <router-link :to="{ name: 'orderDetail', params: { id: item._id }}" class="radius5">详情</router-link>
                        </div>
                    </li>
                </ul>


            </div>
        </section>
    </div>
</template>

<script>
    import {queryOrder} from '../service'
    export default {
        name: 'order',
        data () {
            return {
                isPeriod:false,  //是否显示左上角，全周期
                isStatus:false,    //右上角，是否显示全状态
                period:["近三个月","近一年","全部"],
                status:['未完成','完成','全部'],
                periodSelect:0,
                statusSelect:0,
                goods:[]
            }
        },
        computed:{

        },
        methods:{
            jump(index){
                this.$router.push({ name: 'order', params: { status: index}})
            },
            getData(status,period){
                let that =this;
                queryOrder(status,period).then(function (res) {
                    that.goods=res.data;
                    that.goods.forEach(function (value,key) {
                        let amount=0;
                        value.goods.forEach(function (v) {
                            amount+=v.piece*v.price;
                        })
                        value.amount=amount;
                    })
                })
            }
        },
        mounted(){
            var status=this.$route.params.status;//0是显示未完成的，1是显示已完成的
            this.getData(status,2);
        },
        update(){

        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
//            console.log(to,from)
            next();
            if(to.path!=from.path){
                var status=to.params.status;//0是显示未完成的，1是显示已完成的
                this.getData(status,2);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .borderBottom{
        border-bottom:1px solid #f1f1f1;
    }
    .dropDown{
        border:1px solid #f1f1f1; border-top:0; margin-top:-1px; padding:0 10px;left:10%;
    }
</style>
