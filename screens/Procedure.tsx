import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Procedure() {
    const navigation = useNavigation();
    const route = useRoute();
    var wireDia = 0.052;
    var gasFlowRate = 0;
    var wireWeight = 0.037238438;
    var wireCost = 1.20;
    var gasCost = 0;
    var laborRate = 75.00;
    var openFactor = 1;
    var transferEfficiency = 0.98;
    var procedureType = 'current';
    var totalPrice = 0;
    const [isFinalResultButton, setIsFinalResultButton] = useState(false);
    const [isSelected, setIsSelected] = useState(-1);
    const [procedureData, setProcedureData] = useState([{
        id: 1,
        inputData: [
            { name: 'Weld Length(in.)', value: '376.8' },
            { name: 'Arc Voltage', value: '29.8' },
            { name: 'Welding Amperage', value: '320' },
            { name: 'Weld Speed(in/min)', value: '31.5' },
            { name: 'WFS(in/min)', value: '75' },
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
    }]);
    const newData = {
        id: 2,
        inputData: [
            { name: 'Weld Length(in.)', value: '' },
            { name: 'Arc Voltage', value: '' },
            { name: 'Welding Amperage', value: '' },
            { name: 'Weld Speed(in/min)', value: '' },
            { name: 'WFS(in/min)', value: '' },
        ],
        resultData: [
            { name: 'Arc on Time(sec)', value: 0 },
            { name: 'Wire Dep(lbs)', value: 0 },
            { name: 'Gas Usage(cuft)', value: 0 },
            { name: 'Labor Cost', value: 0 },
            { name: 'Additional Cost', value: 0 },
            { name: 'Heat Input(KJ/in)', value: 0 },
            { name: 'Dep Rate lb/hr', value: 0 },
        ]
    }
    var finalResult = [
        { name: 'Arc on Time(sec)', value: 0 },
        { name: 'Wire Dep(lbs)', value: 0 },
        { name: 'Gas Usage(cuft)', value: 0 },
        { name: 'Labor Cost', value: 0 },
        { name: 'Additional Cost', value: 0, },
        { name: 'Heat Input(KJ/in)', value: 0 },
        { name: 'Dep Rate lb/hr', value: 0 },
    ]
    useEffect(() => {
        const obj = JSON.stringify(route.params)
        procedureType = JSON.parse(obj).type;
        if (procedureType == 'current') {
            console.log(procedureType);
            wireDia = 0.052;
            gasFlowRate = 0;
            wireWeight = 0.006444335;
            wireCost = 1.69;
            gasCost = 0;
            laborRate = 75.00;
            openFactor = 1;
            transferEfficiency = 0.98;
        } else {
            wireDia = 0.125;
            gasFlowRate = 0;
            wireWeight = 0.006444335;
            wireCost = 1.69;
            gasCost = 0;
            laborRate = 75.00;
            openFactor = 1;
            transferEfficiency = 0.98;
        }
    });
    function onChangeInputData(index: any, index1: any, text: any) {
        let newArray = [...procedureData];
        newArray[index].inputData[index1].value = text;
        setProcedureData(newArray);
    }
    function onCalculateResult(index: any) {
        let newArray = [...procedureData];
        if (newArray[index].inputData[0].value != '' && newArray[index].inputData[3].value != '') {
            let i: any;
            let j: any;
            i = newArray[index].inputData[0].value;
            j = newArray[index].inputData[3].value;
            let result = (i / (j / 60));
            newArray[index].resultData[0].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }
        if (newArray[index].resultData[0].value != 0 && newArray[index].inputData[4].value != '') {
            let j: any;
            let i = newArray[index].resultData[0].value;
            j = newArray[index].inputData[4].value;
            let result = (((i / 60 * j) / 12) * wireWeight) * transferEfficiency
            newArray[index].resultData[1].value = parseFloat(result.toPrecision(3));
            setIsFinalResultButton(true);
        }
        if (newArray[index].resultData[0].value != 0) {
            let i = newArray[index].resultData[0].value;
            let result = (gasFlowRate / 3600) * i;
            newArray[index].resultData[2].value = parseFloat(result.toPrecision(3));
            setIsFinalResultButton(true);
        }
        if (newArray[index].resultData[0].value != 0) {
            let i = newArray[index].resultData[0].value;
            let result = ((i / 3600) * laborRate) / openFactor;
            newArray[index].resultData[3].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }
        if (newArray[index].inputData[1].value != '' && newArray[index].inputData[2].value != '' && newArray[index].inputData[3].value != '') {
            let i: any;
            let j: any;
            let k: any;
            i = newArray[index].inputData[1].value;
            j = newArray[index].inputData[2].value;
            k = newArray[index].inputData[3].value;
            let result = (60 * i * j) / (1000 * k);
            newArray[index].resultData[5].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }
        if (newArray[index].inputData[4].value != '') {
            let i: any;
            i = newArray[index].inputData[4].value;
            let result = ((i / 12 * 60) * wireWeight) * openFactor;
            newArray[index].resultData[6].value = parseFloat(result.toPrecision(2));
            setIsFinalResultButton(true);
        }
        setProcedureData(newArray);
    }
    function onAddProcedure() {
        const newArray = [...procedureData];
        newData.id = newArray[newArray.length - 1].id + 1
        newArray[newArray.length] = newData;
        setProcedureData(newArray);
    }
    function onProcedureSelect(index: any) {
        if (isSelected == index) {
            setIsSelected(-1);
        } else {
            setIsSelected(index);
        }
    }
    function onDeleteProcedure(index: any) {
        const newArray = [...procedureData];
        newArray.splice(index, 1);
        setProcedureData(newArray);
    }
    function onSeeFinalResult() {
        const newArray = [...procedureData];
        var finalArcTime = 0;
        var finalWireDep = 0;
        var finalGasUsage = 0;
        var finalLaborCost = 0;
        var finalHeatInput = 0;
        newArray.map((elements, index, arr) => {
            finalArcTime = finalArcTime + arr[index].resultData[0].value;
            finalWireDep = finalWireDep + arr[index].resultData[1].value;
            finalGasUsage = finalGasUsage + arr[index].resultData[2].value;
            finalLaborCost = finalLaborCost + arr[index].resultData[3].value;
            finalHeatInput = finalHeatInput + arr[index].resultData[5].value;
        })
        finalArcTime = finalArcTime / 3600;
        finalArcTime = parseFloat(finalArcTime.toPrecision(3))
        finalWireDep = finalWireDep * 1.69;
        finalWireDep = parseFloat(finalWireDep.toPrecision(3));
        finalGasUsage = finalGasUsage * gasCost;
        finalGasUsage = parseFloat(finalGasUsage.toPrecision(3));
        finalLaborCost = parseFloat(finalLaborCost.toPrecision(5));
        finalHeatInput = parseFloat(finalHeatInput.toPrecision(5));
        finalResult[0].value = finalArcTime;
        finalResult[1].value = finalWireDep;
        finalResult[2].value = finalGasUsage;
        finalResult[3].value = finalLaborCost;
        finalResult[5].value = finalHeatInput;
        console.log(finalResult);
        totalPrice = finalResult[1].value + finalResult[2].value + finalResult[3].value + finalResult[4].value;
        console.log(totalPrice);
        navigation.navigate('result', { result: finalResult, totalPrice: totalPrice })
    }
    return (
        <View style={styles.container}>
            {
                procedureData.map((item, index) => (
                    <View>
                        <TouchableOpacity onPress={() => onProcedureSelect(index)}>
                            <View style={styles.weldIdCnt}>
                                <View style={{ width: procedureData.length > 1 ? '88%' : '93%', flexDirection: 'row' }}>
                                    <Text style={styles.weldId}>Weld#</Text>
                                    <Text style={styles.weldId}>{item.id}</Text>
                                </View>
                                <Image style={styles.upDownIcon} source={isSelected == index ? require('../assets/up_arrow.png') : require('../assets/down_arrow.png')}></Image>
                                <TouchableOpacity style={styles.deleteIconCnt} onPress={() => onDeleteProcedure(index)}>
                                    {procedureData.length > 1 ? (
                                        <Icon name='delete' size={20}></Icon>
                                    ) : null}
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        {isSelected == index ? (
                            <Card containerStyle={[styles.inputCard, { backgroundColor: '#8db4e2', shadowColor: '#8db4e2' }]}>
                                {
                                    item.inputData.map((item1, index1) => (
                                        <View style={styles.inputCnt}>
                                            <View style={styles.inputHintCnt}>
                                                <Text style={styles.inputHint}>{item1.name}</Text>
                                            </View>
                                            <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                <TextInput style={[styles.input, { borderBottomWidth: 1 }]} keyboardType="numeric" value={item1.value} onChangeText={(text) => onChangeInputData(index, index1, text)}></TextInput>
                                            </View>
                                        </View>
                                    ))
                                }
                                <TouchableOpacity style={styles.calculateButton}>
                                    <Button title="Calculate Result" onPress={() => onCalculateResult(index)}></Button>
                                </TouchableOpacity>
                            </Card>
                        ) : null}
                        {isSelected == index ? (
                            <Card containerStyle={[styles.inputCard, { backgroundColor: '#ffff99', shadowColor: '#ffff99' }]}>
                                {
                                    item.resultData.map((item1, index1) => (
                                        <View style={styles.inputCnt}>
                                            <View style={styles.inputHintCnt}>
                                                <Text style={styles.inputHint}>{item1.name}</Text>
                                            </View>
                                            <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                <Text style={styles.input}>{item1.value}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </Card>
                        ) : null}
                    </View>
                ))
            }
            {/* <Card containerStyle={[styles.inputCard, { backgroundColor: '#ffff99', shadowColor: '#ffff99', marginTop: '1vh' }]}>
                <Text style={styles.finalResultHeading}>Final Result</Text>
                {
                    finalResult.map((item, index1) => (
                        <View style={styles.inputCnt}>
                            <View style={styles.inputHintCnt}>
                                <Text style={styles.inputHint}>{item.name}</Text>
                            </View>
                            <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                <Text style={styles.input}>{item.value}</Text>
                            </View>
                        </View>
                    ))
                }
            </Card> */}
            <TouchableOpacity style={styles.finalResultButton}>
                {isFinalResultButton ? (
                    <Button title="See Final Result" onPress={onSeeFinalResult}></Button>
                ) : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.addProcedureButton} onPress={onAddProcedure}>
                <Icon name='add' size={30}></Icon>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    weldIdCnt: {
        width: '95vw',
        height: '5vh',
        backgroundColor: '#addbe6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        marginTop: '2vh',
        alignSelf: 'center'
    },
    weldId: {
        color: '#000000',
        fontSize: 14
    },
    upDownArrow: {
        alignSelf: 'flex-end'
    },
    inputCard: {
        width: '95vw',
        padding: '1vw',
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: "1vw"
    },
    inputCnt: {
        width: '100%',
        marginTop: '1vh',
        flexDirection: 'row'
    },
    inputHintCnt: {
        width: '48%',
    },
    inputHint: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500'
    },
    input: {
        color: '#000000',
        fontSize: 14,
    },
    addProcedureButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#8db4e2',
        borderRadius: 50,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: '#8db4e2'
    },
    upDownIcon: {
        height: 15,
        width: 15,
        resizeMode: 'stretch'
    },
    finalResultHeading: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        alignSelf: 'center'
    },
    deleteIconCnt: {
        marginLeft: '2vw',
    },
    calculateButton: {
        alignSelf: 'flex-end',
        width: '50%',
        marginTop: '1.5vh',
        marginBottom: '1vh',
    },
    finalResultButton: {
        marginTop: '2vh'
    }
});
