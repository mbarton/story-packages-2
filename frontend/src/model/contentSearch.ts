import { observable, action, autorunAsync, runInAction } from 'mobx';

import { getContent } from '../services/capi';

export class ContentSearch {
    @observable loading: boolean = false;
    @observable query: string = '';
    @observable content: string[] = [];

    constructor() {
        autorunAsync(() => this.search(this.query), 500);
    }

    @action search = (query: string) => {
        this.loading = true;

        getContent(query).then(content => {
            runInAction(() => {
                this.loading = false;
                this.content = content;
            });
        });
    }

    @action setQuery = (query: string) => {
        this.query = query;
    }
}