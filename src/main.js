import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('trim', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.trim()
})
Vue.directive('format-recall-num', function (el, binding) {
  el.innerHTML = binding.value ? binding.value.substring(0, 2).concat('-', binding.value.substring(2, binding.value.length)) : '00-00000'

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
