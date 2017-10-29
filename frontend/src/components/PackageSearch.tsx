import * as React from 'react';
import { observer } from 'mobx-react';
import { Segment, Input } from 'semantic-ui-react';

import { Packages } from '../model/package';

@observer
export class PackageSearch extends React.Component<{ packages: Packages }, {}> {
    render() {
        const { query, loading, results, setQuery } = this.props.packages;

        return (
            <Segment>
                <Input
                    value={query}
                    loading={loading}
                    onChange={e => setQuery((e.target as HTMLInputElement).value)}
                />
                {results.map(({ id, title }) =>
                    <span key={id}>{title}</span>
                )}
            </Segment>
        );
    }
}