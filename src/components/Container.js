import React from 'react';
import { Item } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';

import { DragType } from '../model/constants';
import { Content } from './Content';

function handleEvent(props, monitor, alwaysInvoke, fn) {
    const dragItem = monitor.getItem();

    const sourceIx = dragItem.ix;
    const destinationIx = props.ix;

    if(alwaysInvoke || destinationIx !== dragItem.lastSeenIx) {
        fn(sourceIx, destinationIx, dragItem.item);
    }

    // use mutation to avoid repeated invocations
    // see https://github.com/react-dnd/react-dnd/blob/master/examples/04%20Sortable/Simple/Card.js
    dragItem.lastSeenIx = destinationIx;
}

const packageEntryTarget = {
    drop(props, monitor) {
        handleEvent(props, monitor, true, props.onDrop);
    },

    hover(props, monitor, component) {
        handleEvent(props, monitor, false, props.onHover);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

const placeholder = <Item>
    {/* TOTALLY LEGIT HACK! special unicode em space to ensure correct height */}
    <Item.Content> </Item.Content>
</Item>;

function ContainerUnconnected({ ix, item, connectDropTarget }) {
    // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
    return connectDropTarget(<div className={`ui segment ${item ? "" : "tertiary"}`}>
        {item ? <Content ix={ix} item={item} /> : placeholder}
    </div>);
}

export const Container = DropTarget(DragType.CONTENT, packageEntryTarget, collect)(ContainerUnconnected);