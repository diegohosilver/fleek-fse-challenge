import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueClipboard from 'vue-clipboard2';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.use(VueClipboard);

const app = new Vue({
    router,
    store
}).$mount('#app')