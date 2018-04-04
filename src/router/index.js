import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import tabone from '@/components/TabOne'
import tabtwo from '@/components/TabTwo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/tabone',
      name: 'tabone',
      component: tabone
    },
    {
      path: '/tabtwo',
      name: 'tabtwo',
      component: tabtwo
    }
  ]
})
