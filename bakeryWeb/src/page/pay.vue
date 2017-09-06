<template>
    <section class="dd-ym ">
        <!--新增收货地址-->
        <div class="consignee_html" v-show="!hasDelivery" style="overflow:hidden;margin-bottom:10px;margin-top:10px;">
            <div id="add_address">
                <ul class="p10" style="margin-bottom:10px;">
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label>
                            <em class="c-red">*</em>
                            <i style="font-style: normal;" id="shouhrtext">收货人</i>
                        </label>
                        <input type="text" v-model="delivery.name" placeholder="请输入收货人" class="ui-form-field ">
                    </li>
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label><em class="c-red">*</em>手机号码</label>
                        <input type="tel" v-model="delivery.phone" placeholder="请输入手机号码" class="ui-form-field username">
                    </li>

                    <li class="mb15 ui-form-item ui-border-tb-11 radius5"><label><em class="c-red">*</em>选择省市</label>
                        <div class="ui-select-group">
                            <div class="ui-select" style="width:35%;">
                                <select id="province" v-model="delivery.city">
                                    <option value="邯郸" selected="selected">邯郸</option>
                                    <!--<option value="4108">山西</option>-->
                                    <!--<option value="5904">杭州</option>-->
                                    <!--<option value="4120">山东</option>-->

                                </select>
                            </div>
                            <div class="ui-select" style="width:64%;">
                                <select id="city" v-model="delivery.country">
                                    <!--<option selected="" value="">城市</option>-->
                                    <option value="成安县" selected="selected">成安县</option>
                                    <!--<option value="4362">珠海</option>-->
                                    <!--<option value="4363">汕头</option>-->

                                </select>
                            </div>
                        </div>
                    </li>

                    <li class="mb15 ui-form-item ui-border-tb-11 radius5 xiangxidizhi">
                        <label><em class="c-red">*</em>详细地址</label>
                        <input type="text" v-model="delivery.address" placeholder="请输入详细地址" class="ui-form-field">
                    </li>
                    <li style="height:10px;width:99999px;margin-left:-33333px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;border-top:1px solid #f1f1f1;margin-bottom:15px;"></li>

                    <li class="mb15">
                        <input type="button" value="保存" class="ui-btn" @click="saveAddress" v-show="!cancelable">
                        <input type="button" value="取消" class="ui-btn" v-show="cancelable" style="width:50%;border:0;background:#E5E5E5;padding:0;margin:0;float:left;" @click="hasDelivery=true;expand=false;getDelivery()">
                        <input type="button" value="保存" class="ui-btn" v-show="cancelable" style="width:50%;border:0;padding:0;margin:0;float:left;" @click="saveAddress">
                    </li>
                    <li style="height:10px;width:99999px;margin-left:-33333px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;border-top:1px solid #f1f1f1;margin-bottom:15px;"></li>
                </ul>
            </div>
        </div>

        <!--收货信息-->
        <div class="main_flow" v-show="hasDelivery">
            <div class="form bg-fff">
                <!--<div style="height:10px;background:#f8f8f8;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;margin-bottom:10px;"></div>-->
                <div class="str_address">
                    <div class="add mb10 bg-fff " style="height:65px;padding-left:50px;">
                        <ul>
                            <li class="consignee">收货人：{{delivery.name}}
                                <span class="consignee">{{delivery.phone}}	</span>
                                <!--<span class="edit" style="cursor:pointer;color:#2093cc;float:right;margin-right:10px;display:none;">修改</span>-->
                            </li>
                            <li class="c-999 address" style="margin-top:10px;"> 收货地址：
                                {{delivery.address}}
                            </li>
                        </ul>
                        <a href="javascript:;" @click="expand=!expand" class="select_address" :class="{select_address_up:expand}">
                        </a>
                    </div>
                    <div style="height:10px;background:#f8f8f8;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;margin-bottom:10px;"></div>
                </div>
                <div class="consignee_list_html" v-show="expand" style="overflow: hidden; margin-bottom: 10px;">
                    <ul class="ui-list ui-list-one p10 bg-fff">
                        <li class="t">
                            <div class="li-address" style="padding: 0px;">
                                <span style="float:left;margin-right:2%;">
                                <!--<a href="javascript:history.back(-1)" class="radius5 address_flow" style="color:#6BC5E0"> -->
                                    <!-- <a class='fh main_div' type='address' href='javascript:;' style="color:#6BC5E0" >← 后退</a> -->
                                <a class="fh main_div cancel-btn-user" type="address" href="javascript:;" style="color:#6BC5E0" @click="expand=false">取消</a>
                                </span>
                                <span style="float:right;margin-right:2%;">
                                    <a href="javascript:;" class="radius5 address_flow lightblue" @click="addDelivery">添加地址</a>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div class="jf-list" style="background:#fff;padding:0 10px">
                        <ul class="ui-tiled bg-fff mb10 change_add"
                            style="cursor:pointer;  border-bottom: 1px solid #ccc;" data-id="75680">
                            <li class="ui-txt-l" style="cursor:pointer">
                                <div class="li-address">
                                    收货人:{{delivery.name}}
                                    <span style="float:right;margin-right:2%;">
                                        <a href="javascript:void(0);" class="lightblue" @click="removeDelivery">删除</a>
                                    </span>
                                    <span style="float:right;margin-right:2%;">
                                        <a href="javascript:;" class="lightblue" @click="editDelivery">编辑</a>
                                    </span>
                                    <span style="float:right;margin-right:15%">{{delivery.phone}}</span>
                                </div>
                                <div class="li-address">
                                    收货地址:{{delivery.address}}
                                </div>
                            </li>
                        </ul>
                    </div>

                    </div>
                </div>
            </div>
        </div>

        <!--购物信息-->
        <ul class="ui-list ui-list-one cp mb10">
            <li v-for="item in goods">
                <div class="ui-list-thumb"><img :src="item.img_url"></div>
                <div class="ui-list-info">
                    <div class="ms">
                        <h4 class="ui-nowrap">{{item.name}}</h4>
                        <p class="c-ccc">{{item.sizeContent}}
                        </p>
                    </div>
                    <div class="ui-txt-info">
                        <p>{{item.price | currency}}</p>
                        <p style=" text-align: right;">×{{item.piece}}</p>
                        <div>
                        </div>
                    </div>
                </div>
                <div style="height:10px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;border-top:1px solid #f1f1f1;"></div>
            </li>

        </ul>

        </form>
        </div>
        <ul class="p10 ui-border-b">
            <li class="mb15 ui-form-textarea ui-border-tb-11 radius5">
                <label>留&nbsp;&nbsp;&nbsp;&nbsp;言</label>
                <textarea placeholder="几点送货上门方便？" maxlength="200"  class="ui-textarea" style="height:45px;" v-model="remark"></textarea>
            </li>
            <li>运费 <span class="r shipping_fee">{{fee | currency}}</span></li>
            <li class=" mb10"><!--<a href="javascript:void(0);" class="c-999">不包含商品</a>--></li>
            <!-- <li class="mb10">合计<span class="r c-blue">￥84.00</span> </li> -->
        </ul>
        <div style="height:10px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;"></div>
        <!--这里是优惠价和积分，暂时注释掉-->
        <!--<ul class=" ui-list-text ui-border-t bg-fff zffs">-->
            <!--<li class="ui-border-b p10" style="background:none; margin:0">-->
                <!--<div class="t-open ui-checkbox-s integration"-->
                     <!--style="cursor: pointer;background:url(http://m.holiland.com/mobile/script/images/down_ico-1.png) no-repeat right center;background-size:20px; padding-right:30px;">-->
                    <!--使用积分-->
                    <!--&lt;!&ndash; <input type="checkbox" name="checkbox" class="input" onclick="block(n1);" > </div> &ndash;&gt;-->
                    <!--&lt;!&ndash;<span  class="r c-blue integral_formated">￥0.00</span>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="main_integration">-->
                    <!--&lt;!&ndash; <div style="height:9px;background:#f8f8f8;border-bottom:1px solid #f1f1f1;"></div> &ndash;&gt;-->
                    <!--<ul class="ui-list-text ui-border-t bg-fff zffs">-->
                        <!--<li class="ui-border-b p10" style="background:none;">-->
                            <!--<div id="n1" style="line-height:30px;">-->
                                <!--<div class="overflow t-box w-320">-->
                                    <!--<div class="f">-->
                                        <!--<input type="text" value="" placeholder="请输入"-->
                                               <!--style="height:30px;width:100px;border:1px solid #ddd;border-radius:5px;margin-left:0px;color:#000;"-->
                                               <!--class="ui-form-field field-1">-->
                                    <!--</div>-->
                                    <!--<div class="f" style="margin-left:10px; color:#6BC5E0;"><span id="mon"-->
                                                                                                  <!--style="color:#6DC2DF;">{{fee}}元</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</li>-->
                    <!--</ul>-->
                    <!--<div style="overflow:hidden;margin-top: 20px;">-->
                        <!--<input type="button" value="取消" class="ui-btn main_div"-->
                               <!--style="width:50%;border:0;background:#E5E5E5;padding:0;margin:0;float:left;">-->
                        <!--<input type="button" value="保存" onclick="javascript:changeIntegral()" class="ui-btn"-->
                               <!--style="padding:0;width:50%;border:0;padding:0;margin:0;">-->
                    <!--</div>-->

                <!--</div>-->
            <!--</li>-->
            <!--<li class="ui-border-b p10" style="background:none; margin:0">-->
                <!--<div class="t-open ui-checkbox-s bouns"-->
                     <!--style="cursor: pointer;background:url(http://m.holiland.com/mobile/script/images/down_ico-1.png) no-repeat right center;background-size:20px; padding-right:30px;">-->
                    <!--使用优惠券-->
                    <!--&lt;!&ndash;<span  class="r c-blue bonus_formated">￥0.00</span>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="main_bouns other">-->
                    <!--<div style="margin-top:5px;">-->
                        <!--<ul style="background:#fff;border-bottom:1px solid #E8E8E8;padding:0 20px;">-->
                            <!--<li style="height:50px;line-height:50px;">-->
                                <!--<span>请输入优惠券号</span>-->
                                <!--<input type="text" value=""-->
                                       <!--style="height:30px;display:inline-block;width:50%;border:1px solid #ddd;border-radius:5px;margin-left:0px;color:#000;"-->
                                       <!--id="inp_bonus" class="ui-form-field field-1">-->
                            <!--</li>-->
                        <!--</ul>-->
                        <!--<div style="overflow:hidden; margin-top: 20px;">-->
                            <!--<input type="button" value="取消" class="ui-btn main_div"-->
                                   <!--style="width:50%;border:0;background:#E5E5E5;padding:0;margin:0;float:left;">-->
                            <!--<input type="button" value="保存" onclick="javascript:changeBonus()" class="ui-btn"-->
                                   <!--style="padding:0;width:50%;border:0;padding:0;margin:0;">-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->

        <!--</ul>-->

        <div style="height:10px;background:#f8f8f8;border-top:1px solid #f1f1f1;"></div>
        <div id="total">
            <div class="ui-border-tb ui-txt-c  bg-fff order" style="margin-bottom:0;">
                <p>{{amount | currency}} + {{fee | currency}}运费 </p>
                <p class="c-blue" @click="test()">需付{{amount+fee | currency}}</p>
            </div>
        </div>
        <!--<ul class=" ui-border-t nav-xd bg-fff p10 payListBox" style="background:#f8f8f8;">-->
            <!--&lt;!&ndash;这里 pays 改成white 就会变成其他样式&ndash;&gt;-->
            <!--<li class="mb10"><a href="javascript:void(0);" style="line-height:26px;" class="pay_list ui-btns white">微信支付</a></li>-->
        <!--</ul>-->
        <input type="submit" value="微信支付" class="ui-btn submitOrder" style="margin-bottom: 80px;" @click="submit">
    </section>
</template>

<script>
    import {addDelivery,delivery,delDelivery,createOrder,updateDelivery,unfiedorder} from '../service';
    import { Toast} from 'mint-ui';
    import mxpay from '../service/wxpay.js';

    console.log(mxpay)
    export default {
        name: 'pay',
        data () {
            return {
                delivery: {
                    city: '邯郸',
                    country: '成安县',
                    name:'',
                    phone:'',
                    address:''
                },
                hasDelivery:false,
                expand:false,
                cancelable:false,
                goods:[],
                fee:0,
                amount:0,
                remark:''
            }
        },
        computed: {},
        methods: {
            saveAddress(){


                var that = this;
                if (that.delivery.city && that.delivery.country && that.delivery.name && that.delivery.phone && that.delivery.address) {
                    that.delivery.openid = that.$store.state.fakeData.openid;
                    addDelivery(that.delivery).then(function (res) {
                        if (res.data.id) {
                            that.hasDelivery=true;
                            that.delivery=res.data;
                        }
                    })
                } else {
                    Toast('带红色星号的都为必填')
                }


//                通过状态来判断update还是是insert
                if(that.hasDelivery){
                    var that = this;
                    if (that.delivery.city && that.delivery.country && that.delivery.name && that.delivery.phone && that.delivery.address) {
                        that.delivery.openid = that.$store.state.fakeData.openid;
                        updateDelivery(that.delivery).then(function (res) {
                            if (res.data.nModified>0 && res.data.ok==1) {
                                that.hasDelivery=true;
                                that.delivery=res.data;
                            }
                        })
                    } else {
                        Toast('带红色星号的都为必填')
                    }
                }else{
                    var that = this;
                    if (that.delivery.city && that.delivery.country && that.delivery.name && that.delivery.phone && that.delivery.address) {
                        that.delivery.openid = that.$store.state.fakeData.openid;
                        addDelivery(that.delivery).then(function (res) {
                            if (res.data.id) {
                                that.hasDelivery=true;
                                that.delivery=res.data;
                            }
                        })
                    } else {
                        Toast('带红色星号的都为必填')
                    }
                }



            },
            removeDelivery(){
                var that=this;
                delDelivery(that.delivery.id).then(function (res) {
                    if(res.data.isDel){
                        that.delivery={
                            city: '邯郸',
                            country: '成安县',
                            name:'',
                            phone:'',
                            address:''
                        };
                        that.hasDelivery=false;
                        that.expand=false;
                        //再次请求 dilivery
                        that.getDelivery()
                    };
                })
            },
            addDelivery(){
                var that=this;
                that.delivery={
                    city: '邯郸',
                    country: '成安县',
                    name:'',
                    phone:'',
                    address:''
                };
                that.hasDelivery=false;
                that.expand=false;
                that.cancelable=true;
            },
            getDelivery(){
                let that=this;
                that.cancelable=true;
                let openid = this.$store.state.fakeData.openid;
                delivery(openid).then(function (res) {
                    if(res.data.isThere){
                        that.hasDelivery=true;
                        that.delivery=res.data.data[0];//把第一个赋值 默认
                    }else{
                        that.hasDelivery=false;
                    }
                })
            },
            editDelivery(){
                this.hasDelivery=false;
                this.expand=false;
                this.cancelable=true;
            },
            submit(){
                let data=new Object();
                data.remark=this.remark;
                data.fee=this.fee;
                data.goods=this.goods;
                data.delivery=this.delivery;
                data.userId=this.$store.state.fakeData.openid;
                let that = this;
                createOrder(data).then(function (res) {
                    console.log(res);
                    if(res.data.insertedCount==1){
                        console.log('\n已成功生成订单，现在开始调起微信支付')
/**************************这里调起微信支付**************************************************************/
                        let good = data.goods.map(function (value) {
                                return value.name;
                            })
                        // 调用统一下单接口的参数
                        let param = {
                            openid:data.userId,
                            out_trade_no:res.data.insertedIds[0],//新生成的订单号
                            total_fee:100*(that.amount+that.fee),
                            attach:'test',
                            body:good.join(',')
                        }
                        unfiedorder(param).then(function (response) {
                            console.log(response)
                            if (response.data.paySign) {
                                mxpay({
                                    "appId": response.data.appId,     //公众号名称，由商户传入
                                    "timeStamp": response.data.timeStamp,         //时间戳，自1970年以来的秒数
                                    "nonceStr": response.data.nonceStr, //随机串
                                    "package": response.data.package,
                                    "signType": response.data.signType,         //微信签名方式：
                                    "paySign": response.data.paySign //微信签名
                                }, function (res) {
                                    //成功以后的回调
                                    alert(res);
                                    Toast('购买成功，请等待收货');
                                },function (res) {
                                    //取消以后的回调
//                                    alert('哎呦取消了啊')
                                })
                            }
                        })
/********************************************************************************************/
                    }

                })
            },
            test(){
                let data = {
                    openid:this.$store.state.fakeData.openid,
                    out_trade_no:'45768',
                    total_fee:1,
                    attach:'test',
                    body:'body'
                }
                unfiedorder(data).then(function (res) {
                    console.log(res)
                    if(res.data.paySign){
                        mxpay({
                            "appId":res.data.appId,     //公众号名称，由商户传入
                            "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr":res.data.nonceStr, //随机串
                            "package":res.data.package,
                            "signType":res.data.signType,         //微信签名方式：
                            "paySign":res.data.paySign //微信签名
                        },function (res) {
                            console.log(res)
                        })
                    }
                })
            }
        },
        mounted(){
            let that=this;
            that.getDelivery();
            that.goods=that.$route.params;
            if(Object.prototype.toString.call(that.goods).indexOf('Array')>-1){
                that.goods.forEach(function (value,key) {
                    that.amount+=value.piece*value.price;
                })
            }
            //具体运费逻辑后期再补
      /*      if(that.amount<20){
                that.fee=10;
            }*/

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .add:before{
        content:'';display:block;width:15px;height:20px;position:absolute;top:16px;left:24px;
        /*background: #fff url(../assets/images/ico-add.png) no-repeat 8px 6px;*/
        background:#fff url('../assets/images/css_sprites.png') no-repeat  -42px -44px;background-size:126px
    }
    .select_address{
        float: right;
        margin-top: -35px;
        /*background: url(../assets/images/down_ico-11.png) right center / 20px no-repeat;*/
        background: url('../assets/images/css_sprites.png') -152px -105px;
        width: 20px;
        height: 20px;
        margin-right: 25px;
        display: block;
    }
    .select_address_up{
        /*background: url(../assets/images/up_ico-1.png) right center / 20px no-repeat;*/
        background: url('../assets/images/css_sprites.png') -130px -145px;
    }
    .lightblue{
        color:#6BC5E0
    }
</style>
