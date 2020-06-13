import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home.vue'
import resultList from '@/components/ResultList.vue'
import recallDetails from '@/components/RecallDetails.vue'

import error from '@/components/Error.vue'
import help from '@/components/help.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/resultList',
      name: 'ResultList',
      component: resultList,

    },

    {
      path: '/help',
      name: 'Help',
      component: help
    },
    {
      path: '/error',
      name: 'Error',
      component: error
    }
  ],
  //mode:'history'
})
