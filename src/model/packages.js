import { update as partialUpdate } from './base';
import { getPackage, savePackage, searchPackages } from '../services/packages';

export function packages(app) {
    const update = partialUpdate(app);

    return {
        setPackage: (id) => {
            update("editor", { loading: true, thePackage: null });
            
            getPackage(id).then(thePackage => {
                update("editor", { loading: false, thePackage });
                update("packageSearch", { text: thePackage.title });
            });
        },

        packageSearch: (text) => {
            update("packageSearch", { loading: true, text });
        
            // TODO MRB: generic error handling
            searchPackages(text).then(results => {
                update("packageSearch", { loading: false, results });
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
            update("editor", { thePackage });
        }
    }
}