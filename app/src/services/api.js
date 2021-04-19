import axios from 'axios';

export class Api {

    constructor({options, storage}) {

        let apiRoot = options.apiRoot;
        let axiosOptions = { timeout: 300 * 1000 };

        this.axios = axios.create(axiosOptions);

        this.config = { apiRoot };
        this.storage = storage;
    }

    async login(data) {

        let path = '/auth/signin';

        return await this.post(path, data);
    }

    toUrl(path) {

        return `${this.config.apiRoot}${path}`;
    }

    authHeader() {
        let user = JSON.parse(localStorage.getItem('fleek-fse-user'));

        if (user && user.accessToken) {
            return { 'x-access-token': user.accessToken };
        } else {
            return {};
        }
    }

    async post(path, data) {
        try {

            let url = this.toUrl(path);

            let res = await this.axios.post(url, data);

            return res.data;
        }
        catch (err) {

            if (err.response && err.response.data) {

                throw err.response.data;
            }
            else {

                throw err;
            }
        }
    }
}