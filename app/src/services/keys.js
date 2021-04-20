export class Keys {

	constructor({api, store}) {

        this.api = api;
        this.store = store;
    }

	async list() {

		let keys = await this.api.listKeys();

		return keys.map(x => Keys.map(x));
	}

	async add(key) {

		let result = await this.api.addKey(key);

		return Keys.map(result);
	}

	async update(key, enabled) {

		let data = {items: [key], enabled}

		let result = await this.api.bulkUpdateKeys(data);

		let items = result.items;

		return Keys.map(items.find(x => x.id == key.id));
	}

	async bulkUpdate(keys, enabled) {

		let data = {items: keys, enabled}

		let result = await this.api.bulkUpdateKeys(data);

		let items = result.items.map(item => Keys.map(item));

		return {items, errors: result.errors};
	}

	async delete(key) {

		let data = {items: [key]}

		let result = await this.api.bulkDeleteKeys(data);

		return result.deleted;
	}

	async bulkDelete(keys) {

		let data = {items: keys}

		let result = await this.api.bulkDeleteKeys(data);

		return result.deleted;
	}

	static map(key) {

		key.visible = false;

		return key;
	}
}