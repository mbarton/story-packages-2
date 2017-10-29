import * as React from 'react';
import { observer } from 'mobx-react';
import { Segment, Grid } from 'semantic-ui-react';

import { Packages, PACKAGE_SIZE } from '../model/package';

interface IndexedItem {
    ix: number;
    content: (string | null);
}

function layoutInRows(items: IndexedItem[]): IndexedItem[][] {
    const rows: IndexedItem[][] = [];
    let row: IndexedItem[] = [];

    items.forEach(item => {
        row.push(item);

        if(row.length === 2) {
            rows.push(row.slice());
            row = [];
        }
    });

    if(row.length > 0) {
        rows.push(row.slice());
    }

    return rows;
}

function Squares({ rows }: { rows: IndexedItem[][] }) {
    return (
        <Grid columns={2} centered={true} celled="internally">
            {rows.map((row, rowIx) =>
                <Grid.Row key={rowIx} width={row.length}>
                    {row.map(({ content, ix }, columnIx) =>
                        <Grid.Column key={columnIx}>{ix}</Grid.Column>
                    )}
                </Grid.Row>
            )}
        </Grid>
    );
}

@observer
export class Editor extends React.Component<{ packageId: string, packages: Packages }, {}> {
    render() {
        const thePackage = this.props.packages.thePackage;
        
        if(thePackage) {
            const indexed: IndexedItem[] = thePackage.content.map((content, ix) => { return { content, ix }; });
            const included = layoutInRows(indexed.slice(0, PACKAGE_SIZE));
            const linkingTo = layoutInRows(indexed.slice(0, PACKAGE_SIZE));

            return (
                <div>
                    <Segment raised={true}>
                        <Squares rows={included} />
                    </Segment>
                    <Segment raised={true}>
                        <Squares rows={linkingTo} />
                    </Segment>
                </div>
            );
        }

        return <div />;
    }
}