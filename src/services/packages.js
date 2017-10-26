import { simulateNetwork } from '../util/test-data';

// 10 spaces. 9 up top, 1 down below
const EMPTY = [null, null, null, null, null, null, null, null, null, null];

function save(packages) {
    localStorage['test-story-packages'] = JSON.stringify(packages);
}

function load() {
    let ret = localStorage['test-story-packages'];

    if(!ret) {
        ret = "[]";
    }

    return JSON.parse(ret);
}

export function createPackage(title) {
    const existing = load();

    let id = 0;
    if(existing.length > 0) {
        id = Math.max(...existing.map(p => p.id)) + 1;
    }

    const thePackage = { id: String(id), title, content: EMPTY };
    save(existing.concat(thePackage));
    
    return simulateNetwork(thePackage);
}

export function getPackage(id) {
    return simulateNetwork(load().find(p => p.id === id));
}

export function savePackage(id, thePackage) {
    const ret = [];
    const existing = load();

    for(let i = 0; i < existing.length; i++) {
        if(existing[i].id === id) {
            ret.push(thePackage);
        } else {
            ret.push(existing[i]);
        }
    }
    
    save(ret);
}

export function searchPackages(text) {
    return simulateNetwork(load());
}