import React from 'react';
import { Item } from 'semantic-ui-react';

export function Content({ id }) {
    return <Item>
        <Item.Content>{id}</Item.Content>
    </Item>;
}