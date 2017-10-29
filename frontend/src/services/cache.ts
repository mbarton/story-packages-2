export class LocalCache<K, V> {
    key: string;

    constructor(key: string) {
        this.key = key;

        if(!localStorage[this.key]) {
            localStorage[this.key] = JSON.stringify({});
        }
    }

    has: (k: K) => boolean = (k: K) => {
        return this.get(k) !== null;
    }

    get: (k: K) => (V | null) = (k: K) => {
        const decoded = JSON.parse(localStorage[this.key]);
        return decoded[k] ? decoded[k] : null;
    }

    getAll = () => {
        const decoded = JSON.parse(localStorage[this.key]);
        return Object.keys(decoded).map(k => decoded[k]);
    }

    set = (k: K, v: V) => {
        const before = JSON.parse(localStorage[this.key]);
        
        const after = Object.assign({}, before);
        after[k] = v;
        
        localStorage[this.key] = JSON.stringify(after);
    }
}