import { TEST_PACKAGES } from '../util/test-data';

function simulateNetwork(ret) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ret);
        }, 500);
    })
}

export function getPackage(id) {
    let thePackage = localStorage[`test-story-packages-${id}`];
    
    if(thePackage) {
        thePackage = JSON.parse(thePackage);
    } else {
        thePackage = TEST_PACKAGES.find(p => p.id === id); 
    }

    return simulateNetwork(thePackage);
}

export function savePackage(id, thePackage) {
    localStorage[`test-story-packages-${id}`] = JSON.stringify(thePackage);
}

export function searchPackages(text) {
    return simulateNetwork(TEST_PACKAGES);
}