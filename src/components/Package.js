import React from 'react';
import { Segment } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';

import { DragType } from '../model/constants';
import { Content } from './Content';

const packageEntryTarget = {
    drop({ ix, onDrop }, monitor) {
        const item = monitor.getItem();
        onDrop(ix, item);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function PackageEntryUnconnected({ ix, item, connectDropTarget }) {
    // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
    return connectDropTarget(<div className={`ui segment ${item ? "" : "tertiary"}`}>
        {item ? <Content {...item} /> : false}
    </div>);
}

const PackageEntry = DropTarget(DragType.CONTENT, packageEntryTarget, collect)(PackageEntryUnconnected);

export function Package({ size, thePackage, onChange }) {
    const { content } = thePackage;
    const indexed = content.map((c, i) => [c, i]);
    
    const included = indexed.slice(0, size);
    const linkingTo = indexed.slice(size);

    function onDrop(ix, newContent) {
        const copy = content.slice();
        copy[ix] = newContent;

        onChange({ content: copy });
    }

    return <div>
        <Segment.Group raised>
            {included.map(([item, ix]) =>
                <PackageEntry key={ix} ix={ix} item={item} onDrop={onDrop} />
            )}
        </Segment.Group>
        <Segment.Group raised>
            {linkingTo.map(([item, ix]) =>
                <PackageEntry key={ix} ix={ix} item={item} onDrop={onDrop} />
            )}
        </Segment.Group>
    </div>;
}