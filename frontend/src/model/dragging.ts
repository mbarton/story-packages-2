import { observable, computed } from 'mobx';
import { Packages } from './package';

export class Dragging {
    packages: Packages;
    @observable dragSourceIx: number | null = null;

    constructor(packages: Packages) {
        this.packages = packages;
    }

    @computed get items() {
        return this.packages.thePackage ? this.packages.thePackage.content : [];
    }
}