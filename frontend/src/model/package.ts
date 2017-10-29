import { observable, action } from 'mobx';

export interface Package {
    id: string;
    title: string;
    lastModifiedTime: number;
    lastModifiedBy: string;
    results: [string];
}

export class Packages {
    @observable query: string = '';
    @observable loading: boolean;
    @observable results: [Package];

    @action setQuery(query: string) {
        this.query = query;
    }
}