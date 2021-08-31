import React from 'react';

export default function ProcedureData(state = { procedureData: [] }, action) {
    return {
        procedureData: [{
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
        }]
    }
}