import React from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';

export function PackageSearch({ text, loading, results, onChange, onSearchChange }) {
    const options = results.map(({ id, title }) => { return { key: id, value: id, text: title } });

    return <Segment>
        <Dropdown
            fluid
            search
            selection
            options={options}
            loading={loading}
            selectOnNavigation={false}
            placeholder="Search packages"
            onChange={(e, { value }) =>
                // Where value is the ID of the package
                onChange(value)
            }
            onSearchChange={(e, { searchQuery }) =>
                onSearchChange(searchQuery)
            }
        />
    </Segment>;
}