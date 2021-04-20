import axios from 'axios';

export class Api {

	constructor({options, storage}) {

		let apiRoot = options.apiRoot;
		let axiosOptions = { timeout: 300 * 1000 };

		this.axios = axios.create(axiosOptions);

		this.config = { apiRoot };
		this.storage = storage;
	}

	toUrl(path) {

		return `${this.config.apiRoot}${path}`;
	}

	authHeader() {
		let user = this.storage.get('user');

		if (user && user.accessToken) {
			return { 'x-access-token': user.accessToken };
		} else {
			return {};
		}
	}

	async signin(data) {

		let path = '/auth/signin';

		return await this.post(path, data);
	}

	async listKeys() {

		let path = '/keys';

		return await this.get(path);
	}

	async addKey(data) {

		let path = '/keys/create';

		return await this.post(path, data);
	}

	async bulkUpdateKeys(data) {

		let path = '/keys/bulk-update';

		return await this.post(path, data);
	}

	async bulkDeleteKeys(data) {

		let path = '/keys/bulk-delete';

		return await this.post(path, data);
	}

	async get(path, params) {

        try {

            let url = this.toUrl(path);

            let res = await this.axios.get(url, { params, headers: this.authHeader() });

            return res.data;

        } catch (err) {

            if (err.response && err.response.data) {

                throw err.response.data;

            } else {

                throw err;
            }
        }
    }

	async post(path, data) {
		try {

			let url = this.toUrl(path);

			let res = await this.axios.post(url, data, { headers: this.authHeader() });

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