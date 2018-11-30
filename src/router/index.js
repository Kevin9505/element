import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)
Vue.use(VueResource)

// 创建路由
export default new Router({
  routes: [{
    name: 'goods',
    path: '/goods',
    component: goods
  }, {
    name: 'ratings',
    path: '/ratings',
    component: ratings
  }, {
    name: 'seller',
    path: '/seller',
    component: seller
  }, {
    path: '/',
    component: goods,
    // 重定向
    redirect: {
      path: '/goods'
    }
  }]
})
