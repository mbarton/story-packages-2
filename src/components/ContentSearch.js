import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

import { Content } from './Content';

export function ContentSearch({ loading, results }) {
    return <Segment.Group raised>
        {results.map(r =>
            <Segment>
                <Content key={r.id} item={r} />
            </Segment>
        )}
    </Segment.Group>;
}