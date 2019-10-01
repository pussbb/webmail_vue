import Vue from 'vue'
import App from './App.vue'
import {router} from "./router";
import BootstrapVue from 'bootstrap-vue'

import store from "./store";

import './assets/app.scss'

Vue.use(BootstrapVue)
Vue.config.productionTip = true
//Vue.config.performance = true;
Vue.config.errorHandler = function(err, vm, info) {
  store.dispatch('notification/addError', `${err} ${info}`)
  console.error(info, err)
}

new Vue({
  el: `#app`,
  store,
  router,
  render: h => h(App)
})
