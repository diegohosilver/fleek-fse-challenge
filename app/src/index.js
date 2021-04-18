import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import router from './router';
import store from './store';

Vue.use(VueMaterial);

const app = new Vue({
    router,
    store,
    beforeCreate() {
        this.$store.commit('initializeStore');
    },
}).$mount('#app')