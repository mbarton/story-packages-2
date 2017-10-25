import { StateKeys } from '../model/constants';

export function updateHistory(prevState, state) {
    const packageBefore = prevState[StateKeys.EDITOR].thePackage;
    const packageAfter = state[StateKeys.EDITOR].thePackage;

    const idBefore = packageBefore ? packageBefore.id : null;
    const idAfter = packageAfter ? packageAfter.id : null;

    if(idBefore != idAfter) {
        window.history.pushState({}, "", idAfter);
    }
}