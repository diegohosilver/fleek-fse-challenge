import extend from 'lodash/extend';
import isEmpty from 'lodash/isEmpty';

export const Utils = {

    hasValue(value) {

        if (value === null || value === undefined || value === '') return false;

        if (this.isArray(value)) return this.hasLength(value);

        if (this.isNumber(value)) return true;

        return !isEmpty(value);
    },

	isNullOrUndefined(value) {

        return (value === null || value === undefined);
    },

	isNumber(value) {

        return (!isNaN(value) && !Utils.isArray(value));
    },

    isArray(value) {

        return Array.isArray(value);
    },

    ensureArray(array = []) {

        if (!array) return [];

        if (!Utils.isArray(array)) array = [array];

        return array;
    },

    hasAny(items) {

        return Utils.hasLength(items);
    },

    hasLength(items = [], min = 1) {

        if (!items) return false;

        return items.length >= min;
    },

	isObject(value) {

        return (

            value &&

            typeof value === 'object' &&

            !Utils.isArray(value)
        );
    },

	stringify(obj, size) {

        if (!obj) return obj;

        if (!Utils.isObject(obj) && !Utils.isArray(obj)) return obj;

        return (size) ? JSON.stringify(obj, null, size) : JSON.stringify(obj);
    },

    merge(list = [], updates = [], prop = 'id') {

        list = Utils.ensureArray(list);

        if (!Utils.hasLength(updates)) return list;

        updates.forEach(update => {

            let source = list.find(x => update[prop] === x[prop]);

            if (source) extend(source, update);

            else list.push(update);
        });

        return list;
    },

    id() {

        let x = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return x;
    },

    isFunction(func) {

        return !!(func && {}.toString.call(func) === '[object Function]');
    },

    ensureFunction(fn = Utils.noops) {

        return Utils.isFunction(fn) ? fn : Utils.noops;
    },

    noops() {

    },
}