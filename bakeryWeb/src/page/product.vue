<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">基本信息</mt-tab-item>
            <mt-tab-item id="2">商品详情</mt-tab-item>
            <mt-tab-item id="3">评论</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <section class="xq-y">
                    <!--轮播图-->
                    <div style="height:281px"><!--<img :src="item.img_url">-->
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in data.banners" :key="item.index"><img :src="item"></mt-swipe-item>
                        </mt-swipe>
                    </div>

                    <!--轮播图-->

                    <div class="g-g">
                        <ul class="ui-list-text bg-fff">
                            <li class="ui-border-b p10">{{data.name}}
                                <p class="c-blue" v-show="data.minPrice == data.maxPrice"> {{data.minPrice | currency}}</p>
                                <p class="c-blue" v-show="data.minPrice < data.maxPrice"> {{data.minPrice | currency}} - {{data.maxPrice | currency}}</p>
                            </li>
                            <li class="p10"><em class="c-999">规格:</em>
                                <span v-for="item in data.sizeContent"> {{item}} </span>
                            </li>
                            <li class="p10">
                                <!--这里需要自己调整一下样式-->
                                <span v-for="item in data.tags"  class="c-999"> {{item}} </span>
                            </li>
                        </ul>

                    </div>

                </section>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <section class="xq-y">
                    <div class="m-s">
                        <h5 class="p10">{{data.detail_header}}</h5>
                        <p class="p10">
                            {{data.detail_content}}
                        </p>
                        <p v-for="item in data.detail_img">
                            <img :src="item">
                        </p>
                    </div>
                </section>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <ul class="list">
                    <li class="item" v-for="item in data.assess">
                        <div class="info">
                            <!--<div class="author">-->
                            <img class="vip" :src="item.headimgurl">
                            <span class="nike">{{item.nickname}}</span>
                            <!--</div>-->
                            <time>{{item.createTime | time}}</time>
                        </div>
                        <blockquote>
                            {{item.content}}
                        </blockquote>
                        <!--<ul class="pics"> 这里是用户上传图片-->
                            <!--<li><img src="../assets/images/1.jpg"></li>-->
                        <!--</ul>-->
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="bottom-fix">
            <ul class="ui-tiled">
                <li><a href="javascript:;" class="cart" @click="isAddCart=true">加入购物车</a></li>
                <li><a href="javascript:void(0);" class="buy" @click="isAddCart=true;buyNow=true">立即购买</a></li>
            </ul>
        </div>

        <div id="z-z" :class="{block:isAddCart}"></div>
        <div class="s-x" :class="{block:isAddCart}">
            <div class="name-card ">
                <ul class="ui-list ui-border-tb">
                    <li>
                        <div class="thumb"><img :src="data.img_url"></div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">{{data.name}}</h4>
                            <p class="ui-nowrap c-blue shop_price">
                                <span v-for="(item,index) in data.prices" v-show="priceSelect==index">{{item | currency}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="close-img" @click="isAddCart=false;"></div>
            </div>
            <div class="su-x">
                <ul>
                    <li id="ys" class="ui-border-b">
                        <h3>规格：</h3>
                        <i class="yh radius5 attrs" :class="{select:data.size[index]==sizeSelect}" v-for="(item,index) in data.sizeContent" @click="sizeSelect=data.size[index];priceSelect=index">{{item}}</i>
                    </li>
                    <li class="ui-border-b">
                        <h3 class="f"> 数量： </h3>
                        <div class="xz r radius5" style="border-radius:3px;">
                            <span @click="piece>1 ? piece-- : 1" style="cursor:pointer;border-right:1px solid #ccc">-</span>
                            <input type="text" class="slnum" v-model="piece">
                            <span @click="piece++" style="cursor:pointer;border-left:1px solid #ccc">+</span>
                        </div>
                    </li>
                    <li class="url">
                        <a class=ui-btn href='javascript:;' @click="message"> 下一步 </a>
                    </li>
                </ul>
            </div>
        </div>

    </div>

</template>

<script>
    import Vue from 'vue'
    import { productDetail } from '../service';
    import { MessageBox,Toast,Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';

    Vue.component(Navbar.name, Navbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);

    export default {
        name: 'product',
        data () {
            return {
                isAddCart:false,
                buyNow:false,//是否是 立即购买
                selected:"1",
                data:{},
                sizeSelect:10000,
                priceSelect:0,//其实判断的也是size的index
                popupVisible:true,
                piece:1
            }
        },
        computed:{

        },
        methods:{
            message(){
                if(this.sizeSelect==10000){
                    Toast('请先选择产品规格');
                    return false;
                }
                if(!this.buyNow){
                    var that=this;
//                  先存入localstorage，再进入购物车cart页
                    let cart=JSON.parse(localStorage.getItem('cart'));
                    if(cart && Object.prototype.toString.call(cart).indexOf('Array')>-1){
//                        如果已经在购物车了，只需要吧数量更新就好
                        let isThere=false;
                        cart.forEach(function (value,key) {
                            if(value.productId==that.$route.params.id && value.size==that.sizeSelect){
                                cart[key].piece=that.piece;
                                localStorage.setItem('cart',JSON.stringify(cart));
                                isThere=true;
                            }
                        })

                        if(!isThere){
//                          如果购物车已存在但是这个商品未在购物车
                            cart.push({ productId: that.$route.params.id,size:that.sizeSelect,piece:that.piece,price:that.data.prices[that.priceSelect]})
                            localStorage.setItem('cart',JSON.stringify(cart));
                        }

                    }else{
//                        如果没有，则添加到购物车就好
                        var arr=new Array();
                        arr.push({ productId: this.$route.params.id,size:this.sizeSelect,piece:this.piece,price:this.data.prices[this.priceSelect]});
                        localStorage.setItem('cart',JSON.stringify(arr));

                    }

                    MessageBox({
                        title: '添加成功',
                        message: ' \n',
                        showCancelButton: true,
                        cancelButtonText:'再逛逛',
                        confirmButtonText:'去购物车结算'
                    }).then(action=>{
                        if(action=='confirm'){
                            that.$router.push({ name: 'cart'})
                        }else if(action=='cancel'){
                            that.isAddCart=false;
                        }
                    })
                }else{
//                  直接进去pay页

                    this.$router.push({ name: 'pay', params: [{
                        productId: this.$route.params.id,
                        size:this.sizeSelect,
                        piece:this.piece,
                        price:this.data.prices[this.priceSelect],
                        img_url:this.data.img_url,
                        name:this.data.name,
                        sizeContent:this.data.sizeContent[this.priceSelect]
                    }]})
                }

            }
        },
        mounted(){
            var that=this;
            var _id=this.$route.params.id;
            productDetail(_id).then(function (res) {
                that.data=res.data;
//              计算最大值,最小值
                that.data.minPrice=Math.min.apply(null,that.data.prices)
                that.data.maxPrice=Math.max.apply(null,that.data.prices)
                console.log("that data:",that.data)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list .item {
        border-bottom: 1px solid #e5e5e5;
        padding: 20px 0;
        margin: 0 10px;
    }

    .list .info,.list .other,.list .sku {
        color: #999;
        margin-top: 5px;
    }
    .list .info {
        overflow: hidden;
        margin-bottom: .8em;
        height:40px;
        line-height:40px;
    }
    .list blockquote {
        font-size: 14px;
        word-wrap: break-word;
        display: block;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 40px;
        -webkit-margin-end: 40px;
        margin: 0;
        color:rgb(5, 27, 40);
        font-style:normal;
    }
    .list .pics {
        overflow: hidden;
        margin-top: 5px;
    }
    .list .pics li {
        width: 55px;
        height: 55px;
        float: left;
        margin: 0 .48em .5em 0;
        background-color: #fff;
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        display: -ms-flexbox;
        -ms-flex-pack: center;
        -ms-flex-align: center;
    }
    .list .pics img {
        max-width: 100%;
        max-height: 100%;
    }
    .list .sku {
        color: #999;
        margin-top: 5px;
    }
    .list .sku:after {
        clear: both;
        content: '';
        display: block;
    }
    .list .info .author,.list .info li, .list .other li, .list .sku li {
        float: left;
    }
    .list .info .nike, .list .info .vip {
        vertical-align: middle;
        width:auto;
        display: inline;
        height:40px;
    }
    .list .info time {
        float: right;
    }

</style>
