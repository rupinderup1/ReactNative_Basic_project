import * as actionTypes from "./actionTypes";

export function addProcedure(procedure: IProcedure) {
    const action: ProcedureAction = {
        type: actionTypes.ADD_PROCEDURE,
        procedure
    }
    return simulateHttpRequest(action);
}

export function removeProcedure(procedure: IProcedure) {
    const action: ProcedureAction = {
        type: actionTypes.REMOVE_PROCEDURE,
        procedure
    }
    return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ProcedureAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}