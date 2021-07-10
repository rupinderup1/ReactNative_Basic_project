interface IProcedure {
    id: number,
    inputData: [
        { name: string, value: string },
        { name: string, value: string },
        { name: string, value: string },
        { name: string, value: string },
        { name: string, value: string },
    ],
    resultData: [
        { name: string, value: number },
        { name: string, value: number },
        { name: string, value: number },
        { name: string, value: number },
        { name: string, value: number },
        { name: string, value: number },
        { name: string, value: number },
    ],
}

type ProcedureState = {
    procedures: IProcedure[]
}

type ProcedureAction = {
    type: string
    procedure: IProcedure
}

type DispatchType = (args: ProcedureAction) => ProcedureAction