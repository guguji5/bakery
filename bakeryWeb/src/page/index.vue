<template>
    <div>
        <header id="header-index">
            <div class="header_l"> <a class="logo" href="http://m.holiland.com/"> 首页 </a> <span class="city">北京 </span>    </div>
            <div class="header_r">
                <!--登录后--><a href="http://m.holiland.com/mobile/user.php">1890339...</a><!--登录后-->
                丨<a href="http://m.holiland.com/mobile/flow.php">购物车</a> </div>
        </header>
        <!--头部-->
        <section class="ui-container">
            <!-- 轮播图-->
            <div style="height:180px">
                <mt-swipe :auto="4000">
                    <mt-swipe-item><img src="../assets/images/1456961924765976937.jpg" alt=""></mt-swipe-item>
                    <mt-swipe-item><img src="../assets/images/1450656899608763836.jpg" alt=""></mt-swipe-item>
                    <mt-swipe-item><img src="../assets/images/1450656980633615476.jpg" alt=""></mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 轮播图-->
            <form method="get" action="http://m.holiland.com/mobile/search.php">
                <div class="ui-searchbar ui-form">
                    <button type="submit" class="btn"> </button>
                    <input value="" type="search" name="keywords" placeholder="商品搜索：请输入商品关键字" class="input radius5">
                </div>
            </form>

            <div class="nav">
                <ul class="nav-list">
                    <li><a href="http://m.holiland.com/mobile/category.php?c_id=2"> <img src="../assets/images/1450656899608763836.jpg"> </a></li>
                    <li><a href="http://m.holiland.com/mobile/category.php?c_id=3"> <img src="../assets/images/1450657023101437666.jpg"> </a></li>
                    <li><a href="http://m.holiland.com/mobile/category.php?c_id=4"> <img src="../assets/images/1456961898074415077.jpg"> </a></li>
                </ul>
                <ul class="ui-row-flex">
                    <li class="ui-col"><a target="_blank" href="http://m.holiland.com/mobile/affiche.php?ad_id=14&amp;uri=article.php%3Fid%3D30"> <img src="../assets/images/1448516677153920740.jpg"></a></li>
                    <li class="ui-col"><a target="_blank" href="http://m.holiland.com/mobile/affiche.php?ad_id=15&amp;uri=article.php%3Fid%3D34"> <img src="../assets/images/1451356012708821874.jpg"></a></li>
                    <li class="ui-col"><a target="_blank" href="http://m.holiland.com/mobile/affiche.php?ad_id=16&amp;uri=article.php%3Fid%3D35"> <img src="../assets/images/1463966021569278851.jpg"></a></li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import {isUser,insertUser} from '../service'
    export default {
        name: 'index',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed:{
//            真是的取用户的逻辑还有待调整
            openid(){
                return this.$store.state.fakeData.openid
            },
            fakeData(){
                return this.$store.state.fakeData
            }
        },
        mounted(){
            let that=this;
            //判断当前用户是否在user表中，如果没有则插入一条
            isUser(that.openid).then(function (res) {
                if(res.data.isThere){
                    console.log('此用户之前已登陆过本公众号')
                }else {
                //如果没登陆过，则插入用户表
                    insertUser(that.fakeData).then(function (res) {
                        console.log(res)
                    })
                }
            })

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
