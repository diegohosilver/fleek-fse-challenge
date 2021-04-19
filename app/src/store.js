import Vue from 'vue';
import Vuex from 'vuex';
import {Utils} from './services/utils.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        keys: []
    },
    mutations: {
        set(state, payload = {}) {

            for (const [key, value] of Object.entries(payload)) {

                Vue.set(state, key, value)
            }
        },
        merge(state, payload) {

            for (const [key, value] of Object.entries(payload)) {

                Vue.set(state, key, Utils.merge(state[key], value));
            }
        }
    }
})