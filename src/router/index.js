import Vue from 'vue'
import Router from 'vue-router'
import search from '@/components/Search'
import home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:home
    },
    
    {
      path: '/search',
      name: 'Search',
      component:search
    }
  ]
})
