import React from 'react';
import { Segment } from 'semantic-ui-react';

import { Content } from './Content';

export function ContentSearch({ loading, results, onDragStart }) {
    return <Segment.Group raised>
        {results.map(r =>
            <Segment key={r.id}>
                <Content item={r} onDragStart={onDragStart} />
            </Segment>
        )}
    </Segment.Group>;
}