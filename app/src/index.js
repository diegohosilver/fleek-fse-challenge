import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueClipboard from 'vue-clipboard2';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import router from './router';
import store from './store';
import { User } from './services/user';
import { Api } from './services/api';
import { Storage } from './services/storage';

Vue.use(VueMaterial);
Vue.use(VueClipboard);

let storage = new Storage({prefix: 'fleek-fse', localStorage});
let api = new Api({options: {apiRoot: 'http://localhost:3000'}, storage});
Vue.prototype.$user = new User({api, store, storage});

const app = new Vue({
    router,
    store,
    beforeCreate() {
        this.$store.commit('initializeStore')
    }
}).$mount('#app')