import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Layout from './components/Layout.vue'

Vue.config.productionTip = false
Vue.component('Layout', Layout)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
