import React from 'react';
import { Segment } from 'semantic-ui-react';
import { DropTarget } from 'react-dnd';

import { DragType } from '../model/constants';
import { Content } from './Content';

function handleEvent(props, monitor, alwaysInvoke, fn) {
    const dragItem = monitor.getItem();

    const sourceIx = dragItem.ix;
    const destinationIx = props.ix;

    if(sourceIx !== destinationIx && (alwaysInvoke || destinationIx !== dragItem.lastSeenIx)) {
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

function PackageEntryUnconnected({ ix, item, connectDropTarget }) {
    // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
    return connectDropTarget(<div className={`ui segment ${item ? "" : "tertiary"}`}>
        {item ? <Content ix={ix} item={item} /> : false}
    </div>);
}

const PackageEntry = DropTarget(DragType.CONTENT, packageEntryTarget, collect)(PackageEntryUnconnected);

export class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: props.content };
    }

    componentWillReceiveProps({ content }) {
        this.setState({ content });
    }

    onHover = (sourceIx, destinationIx, newContent) => {
        if(sourceIx !== null) {
            console.log(`move from ${sourceIx} to ${destinationIx}`);
        } else {
            console.log(`copy to ${destinationIx}`);
        }
    }

    onDrop = (sourceIx, destinationIx, newContent) => {
        const copy = this.props.thePackage.content.slice();
        copy[destinationIx] = newContent;

        if(sourceIx !== null) {
            copy[sourceIx] = null;
        }

        this.props.onChange({ content: copy });
    }

    render() {
        const { size, thePackage } = this.props;
        const indexed = thePackage.content.map((c, i) => [c, i]);
        
        const included = indexed.slice(0, size);
        const linkingTo = indexed.slice(size);

        const buildPackageEntry = ([item, ix]) => {
            return <PackageEntry
                key={ix}
                ix={ix}
                item={item}
                onHover={this.onHover}
                onDrop={this.onDrop}
            />;
        }

        return <div>
            <Segment.Group raised>
                {included.map(buildPackageEntry)}
            </Segment.Group>
            <Segment.Group raised>
                {linkingTo.map(buildPackageEntry)}
            </Segment.Group>
        </div>;
    }
}