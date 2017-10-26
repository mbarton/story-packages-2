import React from 'react';

import { PackageSquares } from './PackageSquares';

function insertOrReplace(sourceIx, destinationIx, content, before) {
    const after = before.slice();
    after[destinationIx] = content;

    if(sourceIx !== null) {
        // swapperroo
        after[sourceIx] = before[destinationIx];
    } else {
        // bumperroo
        if(before[destinationIx] !== null) {
            for(let i = destinationIx; i < before.length; i++) {
                if(before[i] === null) {
                    break;
                }
    
                after[i + 1] = before[i];
            }
        }
    }

    return after;
}

export class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: props.thePackage.content };
    }

    componentWillReceiveProps({ thePackage, overPackageEditor }) {
        if(this.props.overPackageEditor && !overPackageEditor) {
            this.onLeave();
        }

        this.setState({ content: thePackage.content });
    }

    onLeave = () => {
        const { sourceIx } = this.props;

        if(sourceIx !== null) {
            const content = this.props.thePackage.content.slice();
            content[sourceIx] = null;

            const newPackage = Object.assign({}, this.props.thePackage, { content });
            this.props.onChange(newPackage);
        }
    }

    onHover = (sourceIx, destinationIx, newContent) => {
        const content = insertOrReplace(sourceIx, destinationIx, newContent, this.props.thePackage.content);
        this.setState({ content });
    }

    onDrop = (sourceIx, destinationIx, { id }) => {
        const content = insertOrReplace(sourceIx, destinationIx, { id }, this.props.thePackage.content);
        const newPackage = Object.assign({}, this.props.thePackage, { content });

        this.props.onChange(newPackage);
    }

    render() {
        const { size } = this.props;
        const indexed = this.state.content.map((c, i) => [c, i]);
        
        const included = indexed.slice(0, size);
        const linkingTo = indexed.slice(size);

        return <div id="packageEditor">
            <PackageSquares items={included} onDragStart={this.props.onDragStart} onHover={this.onHover} onDrop={this.onDrop} />
            <PackageSquares items={linkingTo} onDragStart={this.props.onDragStart} onHover={this.onHover} onDrop={this.onDrop} />
        </div>;
    }
}