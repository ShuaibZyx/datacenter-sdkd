import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import moment from "moment";
import Nprogress from "nprogress";
import VueCookies from "vue-cookies";
import './plugins/element.js'
import "./assets/css/global.less";


Vue.use(VueCookies);
Vue.config.productionTip = false

//设置axios的默认地址和最长请求时间
axios.defaults.baseURL = "http://43.140.194.25:8081/";
axios.defaults.timeout = 10000;
//绑定axios到原型对象实例属性axios上
Vue.prototype.$axios = axios;
//绑定moment到原型对象实例属性moment上
Vue.prototype.$moment = moment;

Vue.filter("originalDataState", function (originValue) {
  if (originValue === 0) {
    return "未审核";
  } else if (originValue === 1) {
    return "审核通过";
  } else if (originValue === -1) {
    return "审核不通过";
  } else {
    return "未审核";
  }
});

Vue.filter("originalDataShareWay", function (originValue) {
  if (originValue === 0 || originValue === "0") {
    return "离线";
  } else if (originValue === 1 || originValue === "1") {
    return "在线";
  } else {
    return "未知";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
