import { Package } from '../model/package';

import { getPackages } from './capi';

// TOTALLY LEGIT HACK!! Remember titles since we don't yet have a backend
const cache = {};

export function searchPackages(query: string): Promise<Package[]> {
    return getPackages(query).then(packages => {
        packages.forEach(thePackage => {
            if(!cache.hasOwnProperty(thePackage.id)) {
                cache[thePackage.id] = thePackage;
            }
        });

        const cached: Package[] = [];

        Object.keys(cache).forEach(key => {
            if(!packages.some(p => p.id === key)) {
                cached.push(cache[key]);
            }
        });

        return packages.concat(cached);
    });
}

export function getPackage(id: string): Promise<Package | null> {
    if(cache.hasOwnProperty(id)) {
        return Promise.resolve(cache[id]);
    }

   return Promise.resolve(null);
}

export function createPackage(title: string): Promise<Package> {
    const thePackage = {
        id: Date.now().toString(),
        title,
        lastModifiedTime: 0,
        lastModifiedBy: '',
        content: []
    };

    cache[thePackage.id] = thePackage;

    return Promise.resolve(thePackage);
}