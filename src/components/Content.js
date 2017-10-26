import React from 'react';
import moment from 'moment';
import { DragSource } from 'react-dnd';
import { Item, Label, Header } from 'semantic-ui-react';

import { DragType } from '../model/constants';

const contentSource = {
    beginDrag({ item, ix, onDragStart }) {
        const sourceIx = ix === undefined ? null : ix;
        onDragStart(sourceIx);

        return { item, ix: sourceIx };
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}
function sinceTime(date) {
    const now = moment();
    const then = moment(date);
    
    return moment.duration(then.diff(now)).humanize();
}

// function TrailText({ text }) {
//     return <Item.Description dangerouslySetInnerHTML={{__html: text}} />;
// }

function ContentUnconnected({ item, ix, connectDragSource }) {
    const { id, headline/*, trailText*/, tone, thumbnail, webPublicationDate } = item;

    return connectDragSource(
        // TOTALLY LEGIT HACK! react-dnd only works with a native element at the top level 
        <div className="ui items">
            <div className="ui item">
                {thumbnail ? <Item.Image size="tiny" src={thumbnail} /> : false}
                <Item.Content>
                    <Header size="tiny">{headline ? headline : id}</Header>
                    {/* <TrailText text={trailText} /> */}
                    <Item.Extra>
                        <Label size="tiny">{tone}</Label>
                        <Label size="tiny" color="green">{sinceTime(webPublicationDate)}</Label>
                    </Item.Extra>
                </Item.Content>
            </div>
        </div>
    );
}

export const Content = DragSource(DragType.CONTENT, contentSource, collect)(ContentUnconnected);