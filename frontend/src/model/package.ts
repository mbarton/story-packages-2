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

export class Packages {
    @observable query: string = '';
    @observable loading: boolean = false;
    @observable results: PackageSearchResult[] = [];

    @observable packageId: string = '';
    @observable thePackage: Package | null = null;

    constructor() {
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

    @action createPackage = (title: string, history: History) => {
        this.loading = true;

        createPackage(title).then(thePackage => {
            runInAction(() => {
                this.loading = false;

                this.thePackage = thePackage;
                history.push(`/packages/${thePackage.id}`);
            });
        });
    }

    @action setPackage = (id: string, history: History) => {
        this.packageId = id;

        const existing = this.thePackage ? this.thePackage.id : '';

        if(existing !== id) {
            this.loading = true;

            getPackage(id).then(thePackage => {
                runInAction(() => {
                    this.loading = false;

                    if(thePackage) {
                        this.thePackage = thePackage;
                        history.push(`/packages/${thePackage.id}`);
                    }
                });  
            });
        }
    }
}