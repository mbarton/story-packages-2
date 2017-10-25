import { update as partialUpdate } from './base';
import { StateKeys } from './constants';

import { getLatestItems } from '../services/capi';

export function contentSearch(app) {
    const update = partialUpdate(app);

    return {
        search: () => {
            update(StateKeys.CONTENT_SEARCH, { loading: true });

            getLatestItems().then(results => {
                update(StateKeys.CONTENT_SEARCH, { loading: false, results });
            });
        }
    }
}