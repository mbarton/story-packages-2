import { listen, set as partialSet } from './base';
import { StateKeys } from './constants';

export function content(app) {
    const set = partialSet(app);

    return {
        enrich: (state) => {
            const editor = state[StateKeys.EDITOR];
            const contentSearch = state[StateKeys.CONTENT_SEARCH];
        
            const searchResults = contentSearch.results;
            const packageResults = editor.thePackage ? editor.thePackage.content.filter(p => p !== null) : [];
            
            const before = state[StateKeys.CONTENT];
            const after = searchResults.concat(packageResults);

            const missing = after.filter(a => !before.some(b => a.id === b.id));
    
            if(missing.length > 0) {
                const merged = before.concat(missing);
                set(StateKeys.CONTENT, merged);
            }
        }
    }
}