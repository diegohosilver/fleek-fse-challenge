import Vue from 'vue';
import Vuex from 'vuex';
import {Utils} from './services/utils.js';
import {Storage} from './services/storage.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        keys: [],
        user: undefined
    },
    mutations: {
        initializeStore(state) {

            let storage = new Storage({prefix: 'fleek-fse', localStorage});

            let user = storage.get('user');

            if (user) {
                state.user = user;
            }
        },
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