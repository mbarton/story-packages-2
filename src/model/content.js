import isEqual from 'lodash.isequal';

import { modify as partialModify } from './base';
import { StateKeys } from './constants';

import { getItem } from '../services/capi';

export function content(app) {
    const modify = partialModify(app);

    return {
        enrichFromCache: (cache, results) => {
            return results.map(result => {
                if(result && cache.hasOwnProperty(result.id)) {
                    return cache[result.id];
                }
    
                return result;
            });
        },

        cacheRequiresUpdate: (before, after) => {
            // contentSearch.results and editor.thePackage.content depend on the content cache
            const resultsBefore = before[StateKeys.CONTENT_SEARCH].results;
            const resultsAfter = after[StateKeys.CONTENT_SEARCH].results;

            const contentBefore = before[StateKeys.EDITOR].thePackage ? before[StateKeys.EDITOR].thePackage : [];
            const contentAfter = after[StateKeys.EDITOR].thePackage ? after[StateKeys.EDITOR].thePackage : [];

            return !isEqual(resultsBefore, resultsAfter) || !isEqual(contentBefore, contentAfter);
        },

        updateCache: (state) => {
            const cache = Object.assign({}, state[StateKeys.CONTENT]);
            const editor = state[StateKeys.EDITOR];
            const contentSearch = state[StateKeys.CONTENT_SEARCH];
        
            const searchResults = contentSearch.results;
            const packageResults = editor.thePackage ? editor.thePackage.content.filter(p => p !== null) : [];
            const results = searchResults.concat(packageResults);

            if(results.length === 0)
                return;

            results.forEach(({ id }) => {
                if(!cache.hasOwnProperty(id)) {
                    getItem(id).then(content => {
                        modify(StateKeys.CONTENT, before => {
                            const after = Object.assign({}, before);
                            after[id] = content;

                            return after;
                        });
                    });
                }
            });
        }
    }
}