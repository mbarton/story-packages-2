import React from 'react';
import { withRouter } from 'react-router-dom'
import { Segment, Dropdown } from 'semantic-ui-react';

// TOTALLY LEGIT HACK! Supress onChange from firing until we've had one go round the event loop
// This avoids firing onChange if we've already fired onAddItem
class PackageDropdownUnconnected extends React.Component {
    constructor(props) {
        super(props);
        
        this.fireOnChange = true;
    }

    render() {
        const { loading, value, options, history, onSearchChange, onAddItem, onChange } = this.props;

        return <Dropdown
            fluid
            search
            selection
            allowAdditions
            options={options}
            loading={loading}
            selectOnNavigation={false}
            placeholder="Search packages"
            value={value}
            onAddItem={(e, { value }) => {
                // Where value is the name of the new package
                onAddItem(value).then(id => {
                    history.push(`/packages/${id}`);
                });

                this.fireOnChange = false;
            }}
            onChange={(e, { value }) => {
                setTimeout(() => {
                    if(this.fireOnChange) {
                        // Where value is the ID of the package
                        onChange(value).then(id => {
                            history.push(`/packages/${id}`);
                        });
                    }

                    this.fireOnChange = true;
                }, 0);
            }}
            onSearchChange={(e, { searchQuery }) =>
                onSearchChange(searchQuery)
            }
        />
    }
}

const PackageDropdown = withRouter(PackageDropdownUnconnected);

export function PackageSearch({ text, loading, results, thePackage, onAddItem, onChange, onSearchChange }) {
    const content = results.slice();

    if(thePackage !== null && !content.some(({ id, title }) => thePackage.id === id)) {
        content.push(thePackage);
    }

    const value = thePackage ? thePackage.id : undefined;
    const options = content.map(({ id, title }) => { return { key: id, value: id, text: title } });

    return <Segment>
        <PackageDropdown
            loading={loading}
            value={value}
            options={options}
            onSearchChange={onSearchChange}
            onAddItem={onAddItem}
            onChange={onChange}
        />
    </Segment>;
}
