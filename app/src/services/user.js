export class User {

    constructor({api, store}) {

        this.api = api;
        this.store = store;
    }

    async signin(email, password) {

        let data = {email, password};

        let user = await this.api.signin(data);

        this.store.commit('userLoggedIn', user);
    }
}