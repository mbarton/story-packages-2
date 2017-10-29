import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Segment, Grid } from 'semantic-ui-react';

import { Packages, PACKAGE_SIZE } from '../model/package';
import { Dragging } from '../model/dragging';
import { Container } from './Container';

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
                        <Grid.Column key={columnIx}>
                            <Container ix={ix} id={content} />
                        </Grid.Column>
                    )}
                </Grid.Row>
            )}
        </Grid>
    );
}

interface Props {
    packageId: string;
    packages?: Packages;
    dragging?: Dragging;
}

@inject('packages', 'dragging')
@observer
export class Editor extends React.Component<Props, {}> {
    componentDidMount() {
        const { packageId, packages } = this.props;

        if(packages && !packages.thePackage) {
           packages.setPackage(packageId);
        }
    }

    render() {
        const { dragging } = this.props;
        
        if(dragging) {
            const indexed: IndexedItem[] = dragging.items.map((content, ix) => { return { content, ix }; });
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