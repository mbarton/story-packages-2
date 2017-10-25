import React from 'react';
import { Segment } from 'semantic-ui-react';

import { Container } from './Container';

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

        const buildContainer = ([item, ix]) => {
            return <Container
                key={ix}
                ix={ix}
                item={item}
                onHover={this.onHover}
                onDrop={this.onDrop}
            />;
        }

        return <div>
            <Segment.Group raised>
                {included.map(buildContainer)}
            </Segment.Group>
            <Segment.Group raised>
                {linkingTo.map(buildContainer)}
            </Segment.Group>
        </div>;
    }
}

export function Package({ size, loading, thePackage, onChange }) {
    if(thePackage === null) {
        return <Segment loading={loading} />;
    } else {
        return <PackageEditor size={size} thePackage={thePackage} onChange={onChange} />;
    }
}