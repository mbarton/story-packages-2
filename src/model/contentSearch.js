import { update as partialUpdate } from './base';
import { StateKeys } from './constants';

import { getLatestItems } from '../services/capi';

export function contentSearch(app) {
    const update = partialUpdate(app);

    return {
        setType: (type) => {
            update(StateKeys.CONTENT_SEARCH, { type });
        },

        setSearch: (text) => {
            update(StateKeys.CONTENT_SEARCH, { text });
        },

        search: () => {
            const { text } = app.state[StateKeys.CONTENT_SEARCH];
            update(StateKeys.CONTENT_SEARCH, { loading: true });

            getLatestItems(text).then(results => {
                update(StateKeys.CONTENT_SEARCH, { loading: false, results });
            });
        }
    }
}