<template>
    <!--<div class="blank"></div>-->
    <div class="block">

        <section class="gw-c">
            <form id="formCart" name="formCart" method="post" action="http://m.holiland.com/mobile/flow.php">
                <ul class="ui-list ui-list-one cp">

                    <li class="ui-border-b" v-for="item in carts">
                        <label class="ui-checkbox-s">
                            <input type="checkbox" :checked="item.isSelect" @click="item.isSelect=!item.isSelect;calcAmount()">
                        </label>
                        <div class="ui-list-thumb"><img :src="'http://localhost:3000'+item.img_url"></div>
                        <div class="ui-list-info">
                            <div class="ms">
                                <h4 class="ui-nowrap" style="overflow:inherit;">
                                    {{item.name}}																			</h4>
                                <p class="c-ccc">{{item.sizeContent}}
                                </p>
                            </div>
                            <div class="ui-txt-info">
                                <p>{{item.price}}</p>
                                <p>×{{item.piece}}</p>
                                <div>
                                    <a class="date c-ccc del_goods" style="cursor:pointer" @click="remove({'productId':item.productId,'size':item.size})">删除</a>
                                    <div class="s-l">
                                        <span class="min change" style="cursor:pointer;border-right:1px solid #ccc" @click="item.piece==1 ? 1 :item.piece--;calcAmount()">-</span>
                                        <input type="text" v-model="item.piece" class="slnum">
                                        <span class="add change" style="cursor:pointer;border-left:1px solid #ccc" @click="item.piece++;calcAmount()">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <input type="hidden" name="step" value="update_cart">
                </ul>
            </form>

            <div class="x-d">
			<span class="tx-l">
				<a class="all" style="cursor:pointer" @click="allSelect">全选</a>
				<a class="date del_all" style="cursor:pointer;padding-right:0" @click="removeAll">删除</a>
			</span>

                <span class="tx-r">
				<em class="c-ccc" style="color:#626262">（不含运费）</em>总计： <em class="price c-blue">{{amount}}</em>
				<a @click="goPay" class="x-b">下一步</a>
			</span>
            </div>
        </section>
        <mt-spinner type="triple-bounce" color="red"></mt-spinner>
    </div>
</template>

<script>
    import {cartInfo} from '../service'
    export default {
        name: 'cart',
        data () {
            return {
                carts:[],
                amount:0
            }
        },
        computed:{

        },
        methods:{
            allSelect(){
                this.carts.forEach(function (value,key) {
                    value.isSelect=true;
                })
            },
            removeAll(){
                if(this.carts.some(function (value,key) {
                        return value.isSelect;
                    })){
                    let cart=this.carts;
                    for(let i=cart.length-1;i>=0;i--){
                        if(cart[i].isSelect){
                            cart.splice(i,1);
                        }
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    that.calcAmount()
                }else{
                    alert('请先勾选一条购物车记录')
                }
            },
            remove(obj){
                let that=this;
                let cart=that.carts;
                if(typeof(cart)=='object'){
                    for(let i=cart.length-1;i>=0;i--){
                        if(cart[i].productId==obj.productId && cart[i].size==obj.size){
                            cart.splice(i,1);
                        }
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    that.calcAmount()
                }
            },
            calcAmount(){

                let that=this;
                that.amount= 0;
                let cart=that.carts;
                if(typeof(cart)=='object'){
                    cart.forEach(function (value,key) {
                        if(value.isSelect){
                            that.amount+=value.piece*value.price;
                        }
                    })
                }
            },
            goPay(){
                var carts=this.carts.filter(function (value) {
                    return value.isSelect;
                })
                let that=this;
                if(carts.length>0){
//                    把购买的从购物车中删掉
                    for(let i=that.carts.length-1;i>=0;i--){

                        if(carts.some(function (value) {
                                return that.carts[i].productId==value.productId && that.carts[i].size==value.size
                            })){
                            that.carts.splice(i,1);
                        }
                    }
                    localStorage.setItem('cart',JSON.stringify(that.carts));
//                    带参跳转
                    this.$router.push({ name: 'pay', params: carts})
                }else{
                    alert('请勾选至少一件商品')
                }
            }
        },
        mounted(){
            let that=this;
            let cart=JSON.parse(localStorage.getItem('cart'));
            if(typeof(cart)=='object'){
                cartInfo(cart).then(function (res) {
                    if(res.data){
                        cart.forEach(function (value,key) {
                            Object.assign(cart[key],res.data[key])
                        })
                    }
                    cart.forEach(function (value,key) {
                        value.isSelect=false;
                    })
                    that.carts=cart;
                    that.calcAmount()
                })
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
