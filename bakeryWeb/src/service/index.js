import axios from 'axios';
import store from '../store/'
if(window.location.origin=="http://localhost:8080"){
// if(window.location.origin!="http://52.15.185.161:80" && window.location.origin!="http://52.15.185.161" && window.location.origin!="http://www.guguji.top:80" && window.location.origin!="http://www.guguji.top"){
    axios.defaults.baseURL = 'http://localhost';
}

// axios.defaults.baseURL = 'api';
// axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
    //在请求发出之前进行一些操作
    store.commit('loadTrue');
    //弹出遮罩层
    return config;
},function(err){
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
    //在这里对返回的数据进行处理
    store.commit('loadFalse');
    //去掉遮罩层
    return res;
},function(err){
    //Do something with response error
    return Promise.reject(err);
})




// 获取产品list
let product= () => axios.get('/productList')
// 获取产品的类型
let type= () => axios.get('/type')
// 根据产品类型获取产品list
let prodType = index => axios.get('/productList/'+index);
// 获取产品详情
let productDetail = index => axios.get('/productDetail/'+index)
// 判断user是否已存在（后期考虑是不是用户存在定期更新）
let isUser = openid => axios.get('/user/'+openid);
//插入新用户
let insertUser= data => axios.put('/user/insert',data)
//新增收货地址
let addDelivery= data => axios.put('/user/deliveryAdd',data)
//更新收货地址
let updateDelivery= data => axios.put('/user/deliveryUpdate',data)

//获取收货地址
let delivery = openid => axios.get('/user/delivery/'+openid)
// 删除收货地址
let delDelivery = id => axios.delete('/user/delivery/'+id);
//获取购物车的信息
let cartInfo = data => axios.post('/cart/info',data)
//创建订单
let createOrder = data => axios.put('/order/insert',data)
//查询订单
let queryOrder= (status,period,userId) =>axios.get('/order/list/'+status+'/'+period+'/'+userId);
//根据id查询订单
let queryOrderById= id => axios.get('/order/'+id)
//查看有多少成功订单和未成功订单
let about = userId => axios.get('/about/'+userId);
//添加评论
let addAssess = data =>axios.put('/assessment/insert',data);



export {product,prodType,type,productDetail,isUser,insertUser,addDelivery,delivery,delDelivery,
    cartInfo,createOrder,queryOrder,queryOrderById,updateDelivery,about,addAssess};