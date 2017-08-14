<template>
    <!--点击内容区收齐title的list
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    (*^__^*) 嘻嘻……
    -->
    <section class="lb-y">
        <ul class="ui-tiled bg-fff nav ui-border-b">
            <li :class="{ on: showList}" @click="listTap('showList')">
                <em class="xl">
                    全部		</em>
                <div class="x-l">
                    <a @click="getProductList()">全部</a>
                    <a v-for="item in typeList" @click="getProductList(item.type)">{{item.name}}</a>
                </div>
            </li>
            <li :class="{ on: showOrder}" @click="listTap('showOrder')">
                <em class="px">
                    排序
                </em>
                <div class="p-x">
                    <a href="">价格</a>
                    <a href="">销量</a>
                </div>
            </li>
        </ul>

        <ul class="cp-list">
            <li v-for="(item,index) in productList">
                <div class="box">
                    <div class="imgur">
                        <!-- 参数就这么简单粗暴的带过去了-->
                        <router-link :to="{ name: 'product', params: { id: item._id }}"><img :src="item.img_url"></router-link>
                        <!--<a href="javascript:"><img :src="item.img_url"></a>-->
                    </div>
                    <div class="ui-nowrap t">
                        <router-link :to="{ name: 'product', params: { id: item._id }}">{{item.name}}</router-link>
                    </div>
                    <div class="j-g">
                        <em class="c-blue">{{item.price | currency}}</em>
                        <a href="javascript:" class="tj"></a>
                    </div>
                </div>
            </li>
            <!--<li>-->
                <!--<div class="box">-->
                    <!--<div class="imgur">-->
                        <!--<a href="http://m.holiland.com/mobile/goods.php?id=62"><img src="../assets/images/1457056217471325234.jpg"></a>-->
                    <!--</div>-->
                    <!--<div class="ui-nowrap t">-->
                        <!--<a href="http://m.holiland.com/mobile/goods.php?id=62">小黄鸭</a>-->
                    <!--</div>-->
                    <!--<div class="j-g">-->
                        <!--<em class="c-blue">￥299.00</em>-->
                        <!--<a href="http://m.holiland.com/mobile/goods.php?id=62" class="tj"></a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
            <li id="loading" style="display:none;"></li><li>
        </li></ul>
        <!-- <div class="b-z">仅支持北京、成都售卖（北京五环内免费送达，五环
        外收取相应的配送费）（成都三环内免费送达，三环
        外收取相应的配送费）其他城市敬请期待</div> -->
    </section>
</template>

<script>
    import {product,prodType,type} from '../service'
    export default {
        name: 'category',
        data () {
            return {
                showList:false,
                showOrder:false,
                productList:[],
                typeList:[]
            }
        },
        methods:{
            listTap:function (state) {
                if(this[state]){
                    this.showList=false;
                    this.showOrder=false;
                }else{
                    this.showList=false;
                    this.showOrder=false;
                    this[state]=true;
                }
            },
            getProductList:function (index) {
                var that=this;

                if(index){
                    prodType(index).then(function (res) {
                        that.productList=res.data;
                    }).catch(function (err) {
                        console.log(err);
                    })
                }else{
                    product().then(function (res) {
                        that.productList=res.data;
                        console.log(that.productList)
                    }).catch(function (err) {
                        console.log(err);
                    })
                }
            }
        },
        mounted(){
            var that=this;
//            初始化获取菜单
            this.getProductList();

            type().then(function (res) {
                that.typeList=res.data;
            }).catch(function (err) {
                console.log(err);
            });
            //点击content区域关闭头部的菜单
            var dom = document.querySelector('.cp-list');
            dom.addEventListener('click',function (e) {
                that.showList=false;
                that.showOrder=false;
            })


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
