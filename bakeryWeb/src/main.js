// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import filters from './service/filters'
// import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/style/style.css';//引入好利来 样式
import './assets/style/base.css';//引入好利来 样式
// Vue.use(Mint);
Vue.config.productionTip = false

Object.keys(filters).forEach(function (key, index, arr) {
    Vue.filter(key, filters[key]);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

