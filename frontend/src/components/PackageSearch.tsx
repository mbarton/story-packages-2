import * as React from 'react';
import { observer } from 'mobx-react';
import { Segment, Dropdown } from 'semantic-ui-react';
import { History } from 'history';

import { Packages } from '../model/package';

@observer
export class PackageSearch extends React.Component<{ packages: Packages, history: History }, {}> {
    // TOTALLY LEGIT HACK! Supress onChange from firing until we've had one go round the event loop
    // This avoids firing onChange if we've already fired onAddItem
    fireOnChange: boolean = true;

    render() {
        const { packages, history } = this.props;
        const packageId = packages.thePackage ? packages.thePackage.id : '';

        const options = this.props.packages.results.map(result => {
            return {
                key: result.id,
                value: result.id,
                text: result.title
            };
        });

        return (
            <Segment>
                <Dropdown
                    fluid={true}
                    search={true}
                    selection={true}
                    allowAdditions={true}
                    selectOnNavigation={false}

                    loading={packages.loading}
                    placeholder="Search packages"

                    value={packageId}
                    options={options}

                    onAddItem={(_, { value }: { value: string }) => {
                        this.fireOnChange = false;

                        // where value is the name of the new package
                        packages.createPackage(value, history);
                    }}

                    onChange={(_, { value }: { value: string }) => {
                        setTimeout(() => {
                            if(this.fireOnChange) {
                                packages.setPackage(value, history);
                            }

                            this.fireOnChange = true;
                        }, 0);
                    }}
                />
            </Segment>
        );
    }
}