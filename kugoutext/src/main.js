// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import Lazy from 'vue-lazyload'
import loading from './components/loading'
Vue.config.productionTip = false
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.commit('changeShowLoading',true)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    store.commit('changeShowLoading',false)
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

function sizeChange (url,size){
  if(url!==undefined){
    var reg = /(\{size\})/g;
    var str = '';
    str = url.replace(reg,function (s1) {
      return s1 = size
    })
    return str
  }else{
    return ''
  }
}
function historyBack(){
	window.history.back(-1)
}
Vue.use(Lazy)
Vue.prototype._sizeChange = sizeChange
Vue.prototype._historyBack = historyBack
/* eslint-disable no-new */
Vue.component('loading',loading)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data(){
  	return {
  		showLoading:false,
  	}
  },
  created(){
  	(function (win,doc){
	    if (!win.addEventListener) return;
	    var html=document.documentElement;
	    function setFont() {
	        var cliWidth=html.clientWidth;
	        html.style.fontSize=100*(cliWidth/750)+'px';
	    }
	    win.addEventListener('resize',setFont,false);
	    setFont();
	})(window,document);
  }
})
