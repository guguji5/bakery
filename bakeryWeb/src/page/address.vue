<template>
    <div style="background:#f8f8f8;height:100%;">
        <div style="height:10px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;border-top:1px solid #f1f1f1;"></div>
        <section class="sc-j" style="">
            <ul class="ui-list ui-list-one p10 bg-fff">
                <li class="t">
                    <div class="li-address" style="padding: 0px;">
                        <span style="float:right;margin-right:2%;">
                            <a @click="$router.push({ name: 'addressDetail', params: { id: 'add'}})" style="color:#6BC5E0">添加地址</a>
                        </span>
                    </div>
                </li>
            </ul>
        </section>
        <div style="height:10px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;border-top:1px solid #f1f1f1;"></div>
        <section class="wd-jf">
            <div class="jf-list" style="padding:0 10px;background:#fff;border-bottom:1px solid #f1f1f1">
                <ul class="ui-tiled bg-fff " style="border-bottom: 1px solid #f1f1f1;" v-for="item in data">
                    <li class="ui-txt-l" style="cursor:pointer">
                        <div class="li-address">
                            收货人:{{item.name}}
                            <span style="float:right;margin-right:2%;">
                                <a href="javascript:void(0);" style="color:#6BC5E0" @click="removeDelivery(item.id)">删除</a>
                            </span>
                            <span style="float:right;margin-right:2%;">
                                <a style="color:#6BC5E0" @click="$router.push({ name: 'addressDetail', params: { id: item.id}})">编辑</a>
                            </span>
                            <span style="float:right;margin-right:15%">{{item.phone}}</span>
                        </div>
                        <div class="li-address">
                            收货地址:{{item.address}}
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import {delivery,delDelivery} from '../service';
    import { Toast} from 'mint-ui';
    export default {
        name: 'address',
        data () {
            return {
                data:[]
            }
        },
        computed:{

        },
        methods:{
            removeDelivery(id){
                var that=this;
                delDelivery(id).then(function (res) {
                    if(res.data.isDel){
                        Toast('删除成功')
                        //再次请求 dilivery
                        that.getDelivery()
                    };
                })
            },
            getDelivery(){
                let that=this;
                let openid = this.$store.state.fakeData.openid;
                delivery(openid).then(function (res) {
                    if(res.data.isThere){
                        that.data=res.data.data;//把第一个赋值 默认
                    }
                })
            }
        },
        mounted(){
            this.getDelivery()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
