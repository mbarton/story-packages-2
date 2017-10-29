import * as React from 'react';
import { inject } from 'mobx-react';
import { Item } from 'semantic-ui-react';

import { Dragging } from '../model/dragging';

interface Props {
    id: string;
    // TODO MRB: make this non-optional
    packages?: Dragging;
}

@inject('dragging')
export class Content extends React.Component<Props, {}> {
    onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const { id } = this.props;
        e.dataTransfer.setData('application/json', JSON.stringify({ id }));
    }

    render() {
        const { id } = this.props;

        return (
            <div className="ui items" draggable={true} onDragStart={this.onDragStart}>
                <Item>
                    <Item.Content>
                        {id}
                    </Item.Content>
                </Item>
            </div>
        );
    }
}