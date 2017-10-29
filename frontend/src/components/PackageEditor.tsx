import * as React from 'react';
import { observer } from 'mobx-react';

import { Packages } from '../model/package';

@observer
export class PackageEditor extends React.Component<{ packageId: string, packages: Packages }, {}> {
    render() {
        const { packages } = this.props;

        return <span>{packages.thePackage ? packages.thePackage.title : ''}</span>;
    }
}