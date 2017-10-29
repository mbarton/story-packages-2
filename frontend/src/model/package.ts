import { observable, action, autorunAsync, runInAction } from 'mobx';

import { getPackages } from '../services/capi';

export interface Package {
    id: string;
    title: string;
    lastModifiedTime: number;
    lastModifiedBy: string;
    results: string[];
}

export class Packages {
    @observable query: string = '';
    @observable loading: boolean = false;
    @observable results: Package[] = [];

    constructor() {
        autorunAsync(() => this.search(this.query), 500);
    }

    @action search = (query: string) => {
        this.loading = true;

        getPackages(query).then(packages => {
            runInAction(() => {
                this.loading = false;
                this.results = packages;
            });
        });
    }

    @action setQuery = (query: string) => {
        this.query = query;
    }
}