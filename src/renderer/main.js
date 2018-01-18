import Vue from 'vue';
import _ from 'lodash';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import * as mixins from './mixins';
window._ = _;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// Register global mixins.
_.each(mixins, (mixin) => {
  Vue.mixin(mixin);
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App,
}).$mount('#app');