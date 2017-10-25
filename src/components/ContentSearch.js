import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

import { Content } from './Content';

export function ContentSearch({ loading, results }) {
    return <Segment loading={loading}>
        <Item.Group divided>
            {results.map(r => <Content key={r.id} item={r} />)}
        </Item.Group>
    </Segment>;
}