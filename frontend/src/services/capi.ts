const root = 'https://content.guardianapis.com';
const apiKey = 'teleporter-view';

import { PackageSearchResult } from '../model/package';

export interface CapiPackage {
    packageId: string;
    packageName: string;
}

export interface CapiSearchResult {
    fields: {
        internalShortId: string;
    };
}

export function getContent(query: string): Promise<string[]> {
    const params = `api-key=${apiKey}&order-by=newest&show-fields=internalShortId${query !== '' ? `&q=${query}` : ''}`;
    const url = `${root}/search?${params}`;

    // TODO MRB: should really be composer id instead?
    return fetch(url)
        .then(r => r.json())
        .then(r => r.response.results.map((result: CapiSearchResult) => {
            return result.fields.internalShortId;
        }));
}

export function searchPackages(query: string): Promise<PackageSearchResult[]> {
    const params = `api-key=${apiKey}${query !== '' ? `&q=${query}` : ''}`;
    const url = `${root}/packages?${params}`;

    return fetch(url)
        .then(r => r.json())
        .then(( { response }) => {
            const results: CapiPackage[] = response.results;

            return results.map(({ packageId, packageName}) => {
                return { id: packageId, title: packageName };
            });
        });
}