import * as React from 'react';
import { observer } from 'mobx-react';
import { Segment, Input } from 'semantic-ui-react';

import { Packages } from '../model/package';

@observer
export class PackageSearch extends React.Component<{ packages: Packages }, {}> {
    render() {
        const { packages } = this.props;

        return (
            <Segment>
                <Input
                    value={packages.query}
                    onChange={e => packages.setQuery((e.target as HTMLInputElement).value)}
                />
                {packages.query}
            </Segment>
        );
    }
}