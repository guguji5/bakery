<template>
    <section class="sh-dz ui-container">

        <div class="form p10 mt15">
            <form id="add_info">
                <ul>
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label><em class="c-red">*</em>收货人</label>
                        <input type="text" placeholder="请输入收货人" class="ui-form-field " v-model="delivery.name">
                    </li>
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label><em class="c-red">*</em>手机号码</label>
                        <input type="tel" placeholder="请输入手机号码" class="ui-form-field" v-model="delivery.phone">
                    </li>
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label><em class="c-red">*</em>选择地区</label>
                        <div class="ui-select-group">

                        <div class="ui-select" style="margin-top: 0px;width:50%">
                            <select name="city" id="city">
                                <option value="0">选择城市</option>
                                <option value="3467" selected="selected">邯郸市</option>
                            </select>
                        </div>
                        <div class="ui-select" style="margin-top: 0px;width:50%">
                            <select name="district" id="district">
                                <option>选择县区</option>
                                <option value="4621" selected="selected">成安县</option>
                            </select>
                        </div>

                    </div>
                    </li>
                    <li class="mb15 ui-form-item ui-border-tb-11 radius5">
                        <label><em class="c-red">*</em>详细地址</label>
                        <input type="text" placeholder="请输入详细地址" class="ui-form-field" v-model="delivery.address">
                    </li>

                    <li class="mb15">  <input type="button" value="保存" class="ui-btn add_but" @click="save"> </li>

                </ul>
            </form>
        </div>

    </section>
</template>

<script>
    import {delivery,delDelivery,addDelivery,updateDelivery} from '../service';
    export default {
        name: 'addressDetail',
        data () {
            return {
                delivery:{
                    city: '邯郸',
                    country: '成安县',
                    name:'',
                    phone:'',
                    address:''
                }
            }
        },
        computed:{

        },
        methods:{
            save(){
//                有id就是update没有id就是insert
                if(this.delivery.id){
                    var that = this;
                    if (that.delivery.city && that.delivery.country && that.delivery.name && that.delivery.phone && that.delivery.address) {
                        that.delivery.openid = that.$store.state.fakeData.openid;
                        updateDelivery(that.delivery).then(function (res) {
                            if (res.data.nModified>0 && res.data.ok==1) {
                                alert('更新收货信息成功')
                                that.$router.push({ name: 'address'})
                            }
                        })
                    } else {
                        alert('带红色星号的都为必填')
                    }
                }else{
                    var that = this;
                    if (that.delivery.city && that.delivery.country && that.delivery.name && that.delivery.phone && that.delivery.address) {
                        that.delivery.openid = that.$store.state.fakeData.openid;
                        addDelivery(that.delivery).then(function (res) {
                            if (res.data.id) {
                                alert('新增收货信息成功')
                                that.$router.push({ name: 'address'})
                            }
                        })
                    } else {
                        alert('带红色星号的都为必填')
                    }
                }
            }

        },
        mounted(){
//            这个页面有新增和编辑两种情况，如果带参是‘add’则为新增，，
            let that=this;
            let deliveryId=that.$route.params.id;
            if(deliveryId!='add'){
                let openid = this.$store.state.fakeData.openid;
                delivery(openid).then(function (res) {
                    console.log(res)
                    if(res.data.isThere){
                        res.data.data.forEach(function (value) {
                            if(value.id==deliveryId){
                                that.delivery=value;
                            }
                        })
                    }else{
                        alert('您还未维护收货地址信息')
                    }
                })
            }


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
