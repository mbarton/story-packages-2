import React from 'react';
import { Segment } from 'semantic-ui-react';

import { Content } from './Content';

function PackageEntry({ content, raised }) {
    return <Segment.Group raised>
        {content.map(item => {
            if(item) {
                return <Segment>
                    <Content {...item} />
                </Segment>;
            } else {
                return <Segment tertiary />;
            }
        })}
    </Segment.Group>;
}

export function Package({ size, content }) {
    const included = content.slice(0, size);
    const linkingTo = content.slice(size);

    return <div>
        <PackageEntry content={included} raised={true} />
        <PackageEntry content={linkingTo} raised={false} />
    </div>;
}