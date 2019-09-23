import Vue from 'vue'
import App from './App.vue'
import {router} from "./router";
import BootstrapVue from 'bootstrap-vue'

//import {ValidationProvider} from "vee-validate";
import store from "./store";

import './assets/app.scss'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
//Vue.component('ValidationProvider', ValidationProvider);
Vue.config.productionTip = true

new Vue({
  el: `#app`,
  store,
  router,
  render: h => h(App)
})
