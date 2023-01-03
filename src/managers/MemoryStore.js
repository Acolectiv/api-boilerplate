const Logger = require("../utils/Logger");

class MemoryStore {
    constructor() {
        if(!MemoryStore.instance) {
            this.queue = [];
            this.store = {};
            MemoryStore.instance = this;

            Logger.log('[MemoryStore] -> MemoryStore class initialized.')
        }

        return MemoryStore.instance;
    }

    put(key, value) {
        if(key in this.store) {
            this.queue = this.queue.filter(k => k !== key);
        }

        this.queue.push(key);
        this.store[key] = value;

        if(this.queue.length > 100) {
            const oldestKey = this.queue.shift();
            delete this.store[oldestKey];
        }
    }

    get(key) {
        return key in this.store ? this.store[key] : null;
    }

    has(key) {
        return this.store.hasOwnProperty(key);
    }
}

module.exports = new MemoryStore();