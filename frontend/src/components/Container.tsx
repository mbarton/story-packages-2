import * as React from 'react';
import { inject } from 'mobx-react';

import { Packages } from '../model/package';
import { Dragging } from '../model/dragging';

import { Content } from './Content';

interface Props {
    ix: number;
    id: string | null;
    packages?: Packages;
    dragging?: Dragging;
}

@inject('packages', 'dragging')
export class Container extends React.Component<Props, {}> {
    onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    
        if(this.props.packages) {
            const { id } = JSON.parse(e.dataTransfer.getData('application/json'));
            this.props.packages.insertPackage(id, this.props.ix);
        }
    }
    
    render() {
        const { id } = this.props;
        const className = id ? '' : 'ui segment vertical very padded';
        
        // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
        return (
            <div>
                <div className={className} onDragOver={this.onDragOver} onDrop={this.onDrop}>
                    {id ? <Content id={id} /> : false}
                </div>
            </div>
        );
    }
}