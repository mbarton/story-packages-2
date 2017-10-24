import React from 'react';
import { DragSource } from 'react-dnd';
import { Item } from 'semantic-ui-react';

import { DragType } from '../model/constants';

const contentSource = {
    beginDrag({ id }) {
        return { id };
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

function ContentUnconnected({ id, connectDragSource }) {
    return connectDragSource(
        // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
        <div className="item">
            <Item.Content>{id}</Item.Content>
        </div>
    );
}

export const Content = DragSource(DragType.CONTENT, contentSource, collect)(ContentUnconnected);