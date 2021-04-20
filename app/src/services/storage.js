import { Utils } from './utils.js';

export class Storage {

	constructor(props) {

		this.prefix = props.prefix;

		this.storage = props.localStorage;
	}

	set(name, value) {

		if (!this.storage) return;

		if (!name) return;

		if (Utils.isNullOrUndefined(value)) return this.unset(name);

		value = Utils.stringify(value);

		this.storage.setItem(this.key(name), value);
	}

	unset(name) {

		if (!this.storage) return;

		this.storage.removeItem(this.key(name));
	}

	get(name, def) {

		if (!this.storage) return def;

		let value = this.storage.getItem(this.key(name));

		if (value === null) return def;

		if (value === 'undefined') return def;

		try {

			return JSON.parse(value);
		} catch (ignore) {

			return value;
		}
	}

	key(name) {

		return (this.prefix) ? `${this.prefix}-${name}` : name;
	}
}