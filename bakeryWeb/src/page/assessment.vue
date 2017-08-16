<template>
    <div>
        <header id="header" style="background:#6BC4DF">
            <div class="header_l">
                <a class="fh" href="javascript:history.back(-1)"> 返回</a>
            </div>
            <h1> 添加评价</h1>
            <div class="header_r">

            </div>
        </header>
        <section class="dd-xq">
            <ul class="ui-list ui-list-one cp ui-border-t" v-for="item in data.goods">

                <li>
                    <div class="ui-list-thumb">
                        <img :src="item.img_url">
                    </div>
                    <div class="ui-list-info">
                        <div class="ms">
                            <h4 class="ui-nowrap">{{item.name}}</h4>
                            <p class="c-ccc"> {{item.sizeContent}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="p10 ui-border-b">
                <li class="mb15 ui-form-textarea ui-border-tb-11 radius5">
                    <label>评&nbsp;&nbsp;&nbsp;&nbsp;价</label>
                    <textarea placeholder="服务，味道，分量如何" maxlength="200"  class="ui-textarea" style="height:45px;" v-model="content"></textarea>
                </li>
            </ul>
            <input value="添加评论" class="ui-btn submitOrder" style="margin-bottom: 80px;" @click="addAssessment">
        </section>
    </div>
</template>

<script>
    import {queryOrderById,addAssess} from '../service';
    import { Toast} from 'mint-ui';
    export default {
        name: 'assessment',
        data () {
            return {
                data:{
                    delivery:{},//这里必须写这个delivery，如果不写，上文直接{{ data.delivery.name}} 就会是undefined

                },
                content:''
            }
        },
        computed:{

        },
        methods:{
            addAssessment(){
                if(this.content==''){
                    Toast('评价信息不能为空');
                    return
                }
                var data={
                    "id":this.$route.params.id,
                    "assessment":this.content
                };
                addAssess(data).then(function (res) {
                    if(res.data.nModified>0 && res.data.ok==1){
                        Toast('谢谢您的评价')
                    }else{
                        Toast('添加评价失败，请稍后再试')
                    }
                })
            }
        },
        mounted(){
            let that=this;
            let _id=that.$route.params.id;
            queryOrderById(_id).then(function (res) {
                that.data=res.data;
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
