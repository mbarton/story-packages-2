import React from 'react';
import { Segment } from 'semantic-ui-react';

import { Package } from './Package';

export class PackagePanel extends React.Component {
    constructor(props) {
        super(props);
        props.setPackage(props.packageId);
    }

    componentWillReceiveProps(nextProps) {
        const before = this.props.packageId;
        const after = nextProps.packageId;

        if(after !== before) {
            this.props.setPackage(after);
        }
    }

    render() {
        const { loading, thePackage } = this.props;

        if(loading || !thePackage) {
            return <Segment loading />;
        } else {
            return <Package {...this.props} />;
        }
    }
}