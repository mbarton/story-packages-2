import { update as partialUpdate } from './base';
import { StateKeys } from './constants';

import { getPackage, savePackage, searchPackages } from '../services/packages';

export function packages(app) {
    const update = partialUpdate(app);

    return {
        setPackage: (id) => {
            update(StateKeys.EDITOR, { loading: true, thePackage: null });
            
            getPackage(id).then(thePackage => {
                update(StateKeys.EDITOR, { loading: false, thePackage });
                update(StateKeys.PACKAGE_SEARCH, { text: thePackage.title });
            });
        },

        packageSearch: (text) => {
            update(StateKeys.PACKAGE_SEARCH, { loading: true, text });
        
            // TODO MRB: generic error handling
            searchPackages(text).then(results => {
                update(StateKeys.PACKAGE_SEARCH, { loading: false, results });
            });
        },
        
        updatePackage: (packageBefore) => {
            // ensure there's a drop-zone at the end for
            // stories that are just linking to the package
            const content = packageBefore.content.slice();
            if(content[content.length - 1] !== null) {
                content.push(null);
            }
            
            const thePackage = Object.assign({}, packageBefore, { content });
        
            savePackage(thePackage.id, thePackage);
            update(StateKeys.EDITOR, { thePackage });
        }
    }
}