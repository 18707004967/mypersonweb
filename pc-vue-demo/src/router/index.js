import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{       
        title:'王者视角 年“墨”送礼 - 王者荣耀官方网站 - 腾讯游戏',
      }
    }
  ]
})
