import { StateKeys } from '../model/constants';

export function updateHistory(prevState, state) {
    const packageBefore = prevState[StateKeys.EDITOR].thePackage;
    const packageAfter = state[StateKeys.EDITOR].thePackage;

    const idBefore = packageBefore ? packageBefore.id : null;
    const idAfter = packageAfter ? packageAfter.id : null;

    if(idAfter && idBefore != idAfter) {
        window.history.pushState({}, "", idAfter);
    }
}

export function getPackageId() {
    const matches = window.location.pathname.match(/\/(.+)/);

    if(matches && matches.length > 1) {
        // TODO MRB: stop using numbers as package ids
        return Number(matches[1]);
    }

    return null;
}