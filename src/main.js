import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { SpinnerPlugin } from 'bootstrap-vue'
Vue.use(SpinnerPlugin)

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
