<template>
  <div id="app" style="height:100%">
      <mt-spinner type="snake" color="rgb(100, 100, 100)" :class="{loading:isloading}" style="display: none;"></mt-spinner>
    <router-view></router-view>
    <foot></foot>
    <div id="z-z" :class="{block:isloading}"></div>

  </div>
</template>

<script>
import foot from './components/footer.vue';
export default {
  name: 'app',
  data(){
    return {

    }
  },
  computed:{
      isloading(){
          return this.$store.state.isloading;
      }
  },
  components: {
      foot
  },
  mounted(){

  }
}
</script>

<style>
.loading{
  width: 40px;height: 40px;position: fixed;top: calc(50% - 20px);z-index: 10000;left: calc(50% - 20px);display: block !important;
}
</style>
