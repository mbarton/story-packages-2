import React from 'react';
import { DragSource } from 'react-dnd';
import { Item } from 'semantic-ui-react';

import { DragType } from '../model/constants';

const contentSource = {
    beginDrag({ item, ix }) {
        return { item, ix: ix === undefined ? null : ix };
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

function ContentUnconnected({ item, ix, connectDragSource }) {
    return connectDragSource(
        // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
        <div className="item">
            <Item.Content>{item.id}</Item.Content>
        </div>
    );
}

export const Content = DragSource(DragType.CONTENT, contentSource, collect)(ContentUnconnected);