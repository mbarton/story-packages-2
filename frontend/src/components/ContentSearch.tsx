import * as React from 'react';
import { observer } from 'mobx-react';
import { Segment, Input } from 'semantic-ui-react';

import { ContentSearch as Model } from '../model/contentSearch';
import { Content } from './Content';

@observer
export class ContentSearch extends React.Component<{ model: Model}, {}> {
    render() {
        const { model } = this.props;

        return ( 
            <Segment.Group raised={true}>
                <Segment>
                    <Input
                        fluid={true}
                        loading={model.loading}
                        placeholder="Search..."
                        value={model.query}
                        onChange={e => {
                            const newValue = (e.target as HTMLInputElement).value;
                            model.setQuery(newValue);
                        }}
                    />
                </Segment>
                {model.content.map(id => {
                    return <Segment key={id}>
                        <Content id={id} />
                    </Segment>;
                })}
            </Segment.Group>
        );
    }
}
