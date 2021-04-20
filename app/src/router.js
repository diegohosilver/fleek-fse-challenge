import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/login/login.vue';
import Main from './components/main/main.vue';

Vue.use(VueRouter);

const routes = [
    { path: '', redirect: '/main' },
    { path: '/main', name: 'main', component: Main },
    { path: '/login', name: 'login', component: Login }
]

export default new VueRouter({ routes });