import * as actionTypes from "./actionTypes";

const initialState: ProcedureState = {
    procedures: [{
        id: 1,
        inputData: [
            { name: 'Weld Length(in.)', value: '' },
            { name: 'Arc Voltage', value: '' },
            { name: 'Welding Amperage', value: '' },
            { name: 'Weld Speed(in/min)', value: '' },
            { name: 'WFS(in/min)', value: '' },
        ],
        resultData: [
            { name: 'Arc on Time(sec)', value: 0, },
            { name: 'Wire Dep(lbs)', value: 0 },
            { name: 'Gas Usage(cuft)', value: 0 },
            { name: 'Labor Cost', value: 0 },
            { name: 'Additional Cost', value: 0 },
            { name: 'Heat Input(KJ/in)', value: 0 },
            { name: 'Dep Rate lb/hr', value: 0 },
        ]
    }
    ]
}

const reducer = (
    state: ProcedureState = initialState,
    action: ProcedureAction
): ProcedureState => {
    switch (action.type) {
        case actionTypes.ADD_PROCEDURE:
            const newProcedure: IProcedure = {
                id: action.procedure.id,
                inputData: [
                    { name: action.procedure.inputData[0].name, value: action.procedure.inputData[0].value },
                    { name: action.procedure.inputData[1].name, value: action.procedure.inputData[1].value },
                    { name: action.procedure.inputData[2].name, value: action.procedure.inputData[2].value },
                    { name: action.procedure.inputData[3].name, value: action.procedure.inputData[3].value },
                    { name: action.procedure.inputData[4].name, value: action.procedure.inputData[4].value }
                ],
                resultData: [
                    { name: action.procedure.resultData[0].name, value: action.procedure.resultData[0].value },
                    { name: action.procedure.resultData[1].name, value: action.procedure.resultData[1].value },
                    { name: action.procedure.resultData[2].name, value: action.procedure.resultData[2].value },
                    { name: action.procedure.resultData[3].name, value: action.procedure.resultData[3].value },
                    { name: action.procedure.resultData[4].name, value: action.procedure.resultData[4].value },
                    { name: action.procedure.resultData[5].name, value: action.procedure.resultData[5].value },
                    { name: action.procedure.resultData[6].name, value: action.procedure.resultData[6].value }
                ]
            }
            return {
                ...state,
                procedures: state.procedures.concat(newProcedure),
            }
        case actionTypes.REMOVE_PROCEDURE:
            const updatedProcedures: IProcedure[] =
                state.procedures.filter(
                    procedure => procedure.id !== action.procedure.id
                )
            return {
                ...state,
                procedures: updatedProcedures,
            }
    }
    return state
}

export default reducer