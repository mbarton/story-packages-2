const root = 'https://content.guardianapis.com';
const apiKey = 'teleporter-view';

import { Package } from '../model/package';

export interface CapiPackage {
    packageId: string;
    packageName: string;
}

export function getPackages(query: string): Promise<Package[]> {
    const params = `api-key=${apiKey}${query !== '' ? `&q=${query}` : ''}`;
    const url = `${root}/packages?${params}`;

    return fetch(url)
        .then(r => r.json())
        .then(r => r.response.results.map((result: CapiPackage) => {
            return {
                id: result.packageId,
                title: result.packageName,
                // TODO MRB: modified
                lastModifiedTime: 0,
                lastModifiedBy: '',
                results: []
            };
        }));
}