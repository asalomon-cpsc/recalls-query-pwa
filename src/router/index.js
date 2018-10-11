import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home.vue'
import resultList from '@/components/ResultList.vue'
import error from '@/components/Error.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:home
    },
    {
      path: '/resultList',
      name: 'ResultList',
      component:resultList
    },
    {
      path: '/error',
      name: 'Error',
      component:error
    }
  ]
})
