import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index';
import category from '@/page/category';
import product from '@/page/product';
import cart from '@/page/cart';
import user from '@/page/user';
import pay from '@/page/pay';
import order from '@/page/order';
import orderDetail from '@/page/orderDetail';
import address from '@/page/address';
import addressDetail from '@/page/addressDetail';
import assessment from '@/page/assessment';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
        path: '/category',
        name: 'category',
        component: category
    },
    {
      path: '/product/:id',
      name: 'product',
      component: product
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
        path: '/user',
        name: 'user',
        component: user
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/order/:status',   //
      name: 'order',
      component: order
    },
    {
      path: '/orderDetail/:id',   //
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/assessment/:id',   //
      name: 'assessment',
      component: assessment
    },
    {
        path: '/address',   //
        name: 'address',
        component: address
    },
    {
        path: '/addressDetail/:id',   //如果有id就是编辑，没有就是新增
        name: 'addressDetail',
        component: addressDetail
    },
  ]
})
