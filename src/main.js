// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

import axios from 'axios'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
//全局引入百度编辑器
import '../static/UEtidor/ueditor.config.js'
import '../static/UEtidor/ueditor.all.min.js'
import '../static/UEtidor/lang/zh-cn/zh-cn.js'
import '../static/UEtidor/ueditor.parse.min.js'


Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
