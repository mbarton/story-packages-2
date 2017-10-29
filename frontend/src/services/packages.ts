import { PackageSearchResult, Package, PACKAGE_SIZE } from '../model/package';

import { LocalCache } from './cache';
import { searchPackages as searchCapiForPackages } from './capi';

// TOTALLY LEGIT HACK!! Remember titles since we don't yet have a backend
const cache: LocalCache<string, Package> = new LocalCache('test-story-packages');

function empty(): (string | null)[] {
    const ret: (string | null)[] = [];

    for(let i = 0; i < PACKAGE_SIZE; i++) {
        ret.push(null);
    } 

    return ret;
}

export function searchPackages(query: string): Promise<PackageSearchResult[]> {
    return searchCapiForPackages(query).then(packages => {
        packages.forEach(thePackage => {
            if(!cache.has(thePackage.id)) {
                const entry = Object.assign({}, thePackage, { content: empty() });
                cache.set(thePackage.id, entry);
            }
        });

        const cached: Package[] = [];

        cache.getAll().forEach(thePackage => {
            if(!packages.some(p => p.id === thePackage.id)) {
                cached.push(thePackage);
            }
        });

        return packages.concat(cached);
    });
}

export function getPackage(id: string): Promise<Package | null> {
    const ret = cache.get(id);
    return Promise.resolve(ret ? ret : null);
}

export function createPackage(title: string): Promise<Package> {
    const thePackage = {
        id: Date.now().toString(),
        title,
        lastModifiedTime: 0,
        lastModifiedBy: '',
        content: empty()
    };

    cache[thePackage.id] = thePackage;

    return Promise.resolve(thePackage);
}