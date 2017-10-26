import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Container } from './Container';

export function PackageSquares({ items, onHover, onDrop }) {
    const rows = [];
    let row = [];

    items.forEach(([item, ix]) => {
        row.push(<Container
            key={ix}
            ix={ix}
            item={item}
            onHover={onHover}
            onDrop={onDrop}
        />);

        if(row.length === 2) {
            rows.push(row.slice());
            row = [];
        }
    });

    if(row.length > 0) {
        rows.push(row);
    }

    return <Segment.Group raised>
        <Grid columns={2} centered celled="internally">
            {rows.map((row, rowIx) =>
                <Grid.Row key={rowIx} width={row.length}>
                    {row.map((cell, columnIx) =>
                        <Grid.Column key={columnIx}>{cell}</Grid.Column>
                    )}
                </Grid.Row>
            )}
        </Grid>
    </Segment.Group>;
}