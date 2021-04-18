import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from './components/main/main.vue'

Vue.use(VueRouter);

const routes = [
    { path: '', redirect: '/main' },
    { path: '/main', name: 'main', component: Main }
]

export default new VueRouter({ routes });