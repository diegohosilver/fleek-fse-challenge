export class Requests {

	constructor({api, store}) {

        this.api = api;
        this.store = store;
    }

	async list() {

		return await this.api.listRequests();
	}
}