import React from 'react';
import { Item } from 'semantic-ui-react';

import { Content } from './Content';

export function ContentSearch({ results }) {
    return <Item.Group divided>
        {results.map(r => <Content {...r} />)}
    </Item.Group>;
}