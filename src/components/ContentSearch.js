import React from 'react';
import { Segment, Input, Dropdown } from 'semantic-ui-react';

import { ContentSearchType } from '../model/constants';
import { Content } from './Content';

export function ContentSearch({ type, text, loading, results, onTypeChange, onSearchChange, onDragStart }) {
    function TypeSelect() {
        return <Dropdown
            button
            basic
            floating
            value={type}
            onChange={(_, { value }) => onTypeChange(value)}
            options={[
                { key: ContentSearchType.DRAFT, value: ContentSearchType.DRAFT, text: "Draft", disabled: true },
                { key: ContentSearchType.LIVE, value: ContentSearchType.LIVE, text: "Live" },
                { key: ContentSearchType.MOST_READ, value: ContentSearchType.MOST_READ, text: "Most Read", disabled: true }
            ]}
        />;
    }

    return <Segment.Group raised>
        <Segment>
            <Input
                fluid
                action={<TypeSelect />}
                loading={loading}
                placeholder="Search..."
                value={text}
                onChange={e => onSearchChange(e.target.value)}
            />
        </Segment>
        {results.map(r =>
            <Segment key={r.id}>
                <Content item={r} onDragStart={onDragStart} />
            </Segment>
        )}
    </Segment.Group>;
}