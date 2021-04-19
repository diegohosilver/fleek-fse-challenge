export class User {

    constructor({api, store, storage}) {

        this.api = api;
        this.store = store;
        this.storage = storage;
    }

    async signin(email, password) {

        let data = {email, password};

        let user = await this.api.login(data);

        if (this.store) {
            this.store.commit('set', {user});
        }

        this.storage.set('user', user);
    }
}