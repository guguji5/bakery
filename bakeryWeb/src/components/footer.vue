<template>
    <!--底部-->
    <footer class="ui-footer">
      <ul class="ui-row-flex ui-flex-align-center">
        <li class="ui-col ui-txt-c">
          <router-link to="/">主页</router-link>
        </li>
        <li class="ui-col ui-txt-c tc" style="cursor: pointer;">
          <a href="javascript:;" @click="isListShow=!isListShow"><i></i>产品</a>
          <div class="pfk" :style="styleObject">
            <ul>
              <a href="http://m.holiland.com/mobile/category.php?c_id=2"><li>经典系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=3"><li>法式系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=27"><li>儿童系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=4"><li>冰淇淋系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=33"><li>珍爱系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=31"><li>宠爱系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=34"><li>尊爱系列</li></a>
              <a href="http://m.holiland.com/mobile/category.php?c_id=26"><li>和风软点</li></a>
            </ul>
            <em></em>
            <span></span>
          </div>
        </li>
        <li class="ui-col ui-txt-c">
          <a href="http://m.holiland.com/mobile/category.php?c_id=26">和风软点</a>
        </li>
        <li class="ui-col ui-txt-c">
          <router-link to="/user">会员中心</router-link>
        </li>
      </ul>
    </footer>
</template>

<script>

export default {
  name: 'foot',
  data () {
    return {
      isListShow:false,
    }
  },
  computed : {
      styleObject(){
          return {bottom: this.isListShow ? '54px' : '-9999px'}
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
