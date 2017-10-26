import { update as partialUpdate } from './base';
import { StateKeys } from './constants';

export function dragging(app) {
    const update = partialUpdate(app);

    return {
        startDrag: (initiallyOverPackageEditor) => {
            return (sourceIx) => {
                update(StateKeys.DRAGGING, { sourceIx, overPackageEditor: initiallyOverPackageEditor });
            };
        },

        setOverPackageEditor: (overPackageEditor) => {
            update(StateKeys.DRAGGING, Object.assign({}, app.state[StateKeys.DRAGGING], { overPackageEditor }));
        }
    }
}