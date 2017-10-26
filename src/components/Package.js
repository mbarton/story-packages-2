import React from 'react';
import { Segment } from 'semantic-ui-react';

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

class PackageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: props.thePackage.content };
    }

    componentWillReceiveProps({ thePackage }) {
        this.setState({ content: thePackage.content });
    }

    onHover = (sourceIx, destinationIx, newContent) => {
        const content = insertOrReplace(sourceIx, destinationIx, newContent, this.props.thePackage.content);
        this.setState({ content });
    }

    onDrop = (sourceIx, destinationIx, newContent) => {
        const content = insertOrReplace(sourceIx, destinationIx, newContent, this.props.thePackage.content);
        const newPackage = Object.assign({}, this.props.thePackage, { content });

        this.props.onChange(newPackage);
    }

    render() {
        const { size } = this.props;
        const indexed = this.state.content.map((c, i) => [c, i]);
        
        const included = indexed.slice(0, size);
        const linkingTo = indexed.slice(size);

        return <div>
            <PackageSquares items={included} onHover={this.onHover} onDrop={this.onDrop} />
            <PackageSquares items={linkingTo} onHover={this.onHover} onDrop={this.onDrop} />
        </div>;
    }
}

export function Package({ size, loading, thePackage, onChange }) {
    if(loading || !thePackage) {
        return <Segment loading={loading} />;
    } else {
        return <PackageEditor size={size} thePackage={thePackage} onChange={onChange} />;
    }
}