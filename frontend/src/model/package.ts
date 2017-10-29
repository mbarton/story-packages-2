import { observable, action, autorunAsync, runInAction } from 'mobx';
import { History } from 'history';

import { getPackage, createPackage, searchPackages } from '../services/packages';

export const PACKAGE_SIZE = 9;

export interface PackageSearchResult {
    id: string;
    title: string;
}

export interface Package {
    id: string;
    title: string;
    // TODO MRB: last modified
    content: (string | null)[];
}

function insertOrReplace(sourceIx: number | null, destinationIx: number, content: string, before: (string | null)[]) {
    const after = before.slice();
    after[destinationIx] = content;

    if(sourceIx !== null) {
        // swapperroo
        after[sourceIx] = before[destinationIx];
    } else {
        // bumperroo
        if(before[destinationIx] !== null) {
            for(let i = destinationIx; i < before.length; i++) {
                if(before[i] === null) {
                    break;
                }
    
                after[i + 1] = before[i];
            }
        }
    }

    return after;
}

export class Packages {
    history: History;

    @observable query: string = '';
    @observable loading: boolean = false;
    @observable results: PackageSearchResult[] = [];

    @observable packageId: string = '';
    @observable thePackage: Package | null = null;

    constructor(history: History) {
        this.history = history;

        autorunAsync(() => this.search(this.query), 500);
    }

    @action search = (query: string) => {
        this.loading = true;

        searchPackages(query).then(packages => {
            runInAction(() => {
                this.loading = false;
                this.results = packages;
            });
        });
    }

    @action setQuery = (query: string) => {
        this.query = query;
    }

    @action createPackage = (title: string) => {
        this.loading = true;

        createPackage(title).then(thePackage => {
            runInAction(() => {
                this.loading = false;

                this.thePackage = thePackage;
                this.history.push(`/packages/${thePackage.id}`);
            });
        });
    }

    @action setPackage = (id: string) => {
        this.packageId = id;

        const existing = this.thePackage ? this.thePackage.id : '';

        if(existing !== id) {
            this.loading = true;

            getPackage(id).then(thePackage => {
                runInAction(() => {
                    this.loading = false;

                    if(thePackage) {
                        this.thePackage = thePackage;
                        this.history.push(`/packages/${thePackage.id}`);
                    }
                });  
            });
        }
    }

    @action insertPackage = (id: string, ix: number) => {
        if(this.thePackage) {
            const before = this.thePackage.content;
            const after = insertOrReplace(null, ix, id, before);

            this.thePackage = Object.assign({}, this.thePackage, { content: after });
        }

        console.log(`insert ${ix} at ${id}`);
    }
}