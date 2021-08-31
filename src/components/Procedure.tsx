import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FloatingAction } from "react-native-floating-action";

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
    const values = [
        ['build', '343'],
        ['deploy', '23432']
    ];
    const headerString = 'sdf sad';
    var settingData: any;
    const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    const csvString = `${headerString}${rowString}`;
    // const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
    // console.log("PATH::::::");
    const [isFinalResultButton, setIsFinalResultButton] = useState(false);
    const [isSelected, setIsSelected] = useState(-1);
    const [procedureData, setProcedureData] = useState([{
        id: 1,
        inputData: [
            { name: 'Weld Length(in.)', value: '' },
            { name: 'Arc Voltage', value: '' },
            { name: 'Welding Amperage', value: '' },
            { name: 'Additional Cost', value: '0' },
            { name: 'Weld Speed(in/min)', value: '' },
            { name: 'WFS(in/min)', value: '' },
        ],
        resultData: [
            { name: 'Arc on Time(sec)', value: 0, },
            { name: 'Wire Dep(lbs)', value: 0 },
            { name: 'Gas Usage(cuft)', value: 0 },
            { name: 'Labor Cost', value: 0 },
            { name: 'Heat Input(KJ/in)', value: 0 },
            { name: 'Dep Rate lb/hr', value: 0 },
        ]
    }

    ]);
    const newData = {
        id: 2,
        inputData: [
            { name: 'Weld Length(in.)', value: '' },
            { name: 'Arc Voltage', value: '' },
            { name: 'Welding Amperage', value: '' },
            { name: 'Additional Cost', value: '' },
            { name: 'Weld Speed(in/min)', value: '' },
            { name: 'WFS(in/min)', value: '' },
        ],
        resultData: [
            { name: 'Arc on Time(sec)', value: 0 },
            { name: 'Wire Dep(lbs)', value: 0 },
            { name: 'Gas Usage(cuft)', value: 0 },
            { name: 'Labor Cost', value: 0 },
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
        AsyncStorage.getItem('settingData').then((result) => {

            // setresultData(resultData)
            settingData = JSON.parse(result);
            const obj = JSON.stringify(route.params)
            procedureType = JSON.parse(obj).type;
            // dispatch;
            // if (procedureType == 'current') {
            //     wireDia = 0.052;
            //     gasFlowRate = 0;
            //     wireWeight = 0.006444335;
            //     wireCost = 1.69;
            //     gasCost = 0;
            //     laborRate = 75.00;
            //     openFactor = 1;
            //     transferEfficiency = 0.98;
            // } else {
            //     wireDia = 0.125;
            //     gasFlowRate = 0;
            //     wireWeight = 0.037238438;
            //     wireCost = 1.20;
            //     gasCost = 0;
            //     laborRate = 75.00;
            //     openFactor = 1;
            //     transferEfficiency = 0.98;
            // }

            if (procedureType == 'current') {
                wireDia = settingData[0].settingData[9].value;
                gasFlowRate = settingData[0].settingData[10].value;
                wireWeight = settingData[0].settingData[11].value;
                wireCost = settingData[0].settingData[12].value;
                gasCost = settingData[0].settingData[13].value;
                laborRate = settingData[0].settingData[14].value;
                openFactor = settingData[0].settingData[15].value;
                transferEfficiency = settingData[0].settingData[16].value;
            } else {
                wireDia = settingData[1].settingData[9].value;
                gasFlowRate = settingData[1].settingData[10].value;
                wireWeight = settingData[1].settingData[11].value;
                wireCost = settingData[1].settingData[12].value;
                gasCost = settingData[1].settingData[13].value;
                laborRate = settingData[1].settingData[14].value;
                openFactor = settingData[1].settingData[15].value;
                transferEfficiency = settingData[1].settingData[16].value;
            }
        });
    });
    function onChangeInputData(index: any, index1: any, text: any) {
        let newArray = [...procedureData];
        newArray[index].inputData[index1].value = text;
        setProcedureData(newArray);
    }
    function onCalculateResult(index: any) {
        let newArray = [...procedureData];
        if (newArray[index].inputData[0].value != '' && newArray[index].inputData[4].value != '') {
            let i: any;
            let j: any;
            i = newArray[index].inputData[0].value;
            j = newArray[index].inputData[4].value;
            let result = (i / (j / 60));
            newArray[index].resultData[0].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }
        if (newArray[index].resultData[0].value != 0 && newArray[index].inputData[5].value != '') {
            let j: any;
            let i = newArray[index].resultData[0].value;
            j = newArray[index].inputData[5].value;
            console.log(i);
            console.log(j);
            console.log(wireWeight);
            console.log(transferEfficiency);
            let result = (((i / 60 * j) / 12) * wireWeight) * (transferEfficiency / 100)
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
            let result = ((i / 3600) * laborRate) / (openFactor / 100);
            newArray[index].resultData[3].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }
        if (newArray[index].inputData[1].value != '' && newArray[index].inputData[2].value != '' && newArray[index].inputData[4].value != '') {
            let i: any;
            let j: any;
            let k: any;
            i = newArray[index].inputData[1].value;
            j = newArray[index].inputData[2].value;
            k = newArray[index].inputData[4].value;
            let result = (60 * i * j) / (1000 * k);
            newArray[index].resultData[4].value = parseFloat(result.toPrecision(4));
            setIsFinalResultButton(true);
        }

        if (newArray[index].inputData[5].value != '') {
            let i: any;
            i = newArray[index].inputData[5].value;
            let result = ((i / 12 * 60) * wireWeight) * (openFactor / 100);
            newArray[index].resultData[5].value = parseFloat(result.toPrecision(2));
            setIsFinalResultButton(true);
        }
        setProcedureData(newArray);
    }

    // type Props = {
    //     saveProcedure: (procedure: IProcedure | any) => void
    // }

    function onAddProcedure() {
        const newArray = [...procedureData];
        newData.id = newArray[newArray.length - 1].id + 1
        newArray[newArray.length] = newData;
        setProcedureData(newArray);
        // saveProcedure(newData);
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
        var finalAdditionalCost = 0;
        var finalHeatInput = 0;
        var wireWeightTepm = 0
        newArray.map((elements, index, arr) => {
            finalArcTime = finalArcTime + arr[index].resultData[0].value;
            finalWireDep = finalWireDep + arr[index].resultData[1].value;
            finalGasUsage = finalGasUsage + arr[index].resultData[2].value;
            finalLaborCost = finalLaborCost + arr[index].resultData[3].value;
            finalAdditionalCost = finalAdditionalCost + parseInt(arr[index].inputData[3].value);
            finalHeatInput = finalHeatInput + arr[index].resultData[4].value;
        })
        finalArcTime = finalArcTime / 3600;
        finalArcTime = parseFloat(finalArcTime.toPrecision(3))
        finalWireDep = finalWireDep * wireCost;
        finalWireDep = parseFloat(finalWireDep.toPrecision(3));
        finalGasUsage = finalGasUsage * gasCost;
        finalGasUsage = parseFloat(finalGasUsage.toPrecision(3));
        finalLaborCost = parseFloat(finalLaborCost.toPrecision(5));
        finalHeatInput = parseFloat(finalHeatInput.toPrecision(5));
        finalResult[0].value = finalArcTime;
        finalResult[1].value = finalWireDep;
        finalResult[2].value = finalGasUsage;
        finalResult[3].value = finalLaborCost;
        finalResult[4].value = finalAdditionalCost;
        finalResult[5].value = finalHeatInput;

        console.log(finalResult);
        totalPrice = finalResult[1].value + finalResult[2].value + finalResult[3].value + finalResult[4].value;
        console.log(totalPrice);

        var data = {

            type: procedureType,
            settingData: settingData,
            procedureData: procedureData,
            finalResult: finalResult,

        }

        navigation.navigate('result', { result: data, totalPrice: totalPrice })
        // navigation.navigate('result', { final: finalData})
    }
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={{ width: "95%", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ alignSelf: 'flex-start', marginRight: '0%' }} onPress={() => navigation.navigate('Settings', { type: procedureType, title: 'Current Procedure' })}>
                        <View style={styles.addProcedureButton}>
                            <Text style={[styles.weldId,]}>{'SETTINGS'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{ alignSelf: 'flex-end', }} onPress={onAddProcedure}>
                        <View style={styles.addProcedureButton}>
                            {/* <Icon name='add' size={30}></Icon> */}
                            <Image style={styles.upDownIcon} source={require('../assets/plus.png')}></Image>
                            <Text style={[styles.weldId, { marginLeft: 10 }]}>{'ADD NEW'}</Text>

                        </View>
                    </TouchableOpacity>
                </View>

                {
                    procedureData.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => onProcedureSelect(index)} style={[styles.weldIdCnt]}>
                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.weldId}>Weld# {item.id}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.upDownIcon} source={isSelected == index ? require('../assets/up_arrow.png') : require('../assets/down_arrow.png')}></Image>
                                        {procedureData.length > 1 ? (<TouchableOpacity style={styles.deleteIconCnt} onPress={() => onDeleteProcedure(index)}>
                                            {/* <Icon name='delete' size={22}></Icon> */}
                                            <Image style={styles.upDownIcon} source={require('../assets/delete.png')}></Image>
                                        </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {isSelected == index ? (
                                <Card containerStyle={[styles.inputCard, { backgroundColor: '#8db4e2', shadowColor: '#8db4e2' }]}>
                                    {
                                        item.inputData.map((item1, index1) => (
                                            <View key={index1} style={styles.inputCnt}>
                                                <View style={styles.inputHintCnt}>
                                                    <Text style={styles.inputHint}>{item1.name}</Text>
                                                </View>
                                                <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                                    <TextInput style={[styles.input, { borderBottomWidth: 1 }]} keyboardType="numeric" value={item1.value} onChangeText={(text) => onChangeInputData(index, index1, text)}></TextInput>
                                                </View>
                                            </View>
                                        ))
                                    }
                                    <TouchableOpacity activeOpacity={0.9} style={styles.calculateButton} onPress={() => onCalculateResult(index)}>
                                        <Text style={styles.calculateButtonCnt} >Calculate Result</Text>
                                    </TouchableOpacity>
                                </Card>
                            ) : null}
                            {isSelected == index ? (
                                <Card containerStyle={[styles.inputCard, { backgroundColor: '#ffff99', shadowColor: '#ffff99' }]}>
                                    {
                                        item.resultData.map((item1, key) => (
                                            <View key={key} style={styles.inputCnt}>
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
                {/* <Card containerStyle={[styles.inputCard, { backgroundColor: '#ffff99', shadowColor: '#ffff99', marginTop: '1%' }]}>
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
                <TouchableOpacity style={styles.finalResultButton} onPress={onSeeFinalResult}>
                    {isFinalResultButton ? (
                        <Text style={styles.finalResultButtonCnt}>See Final Result</Text>
                    ) : null}
                </TouchableOpacity>

            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    weldIdCnt: {
        // width: '92%',
        backgroundColor: '#addbe6',
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
        marginTop: '2%',
        alignSelf: 'center'
    },

    weldId: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700'
    },
    upDownArrow: {
        alignSelf: 'flex-end'
    },
    inputCard: {
        // padding: '1%',
        shadowOpacity: 1,
        shadowRadius: 5,
        marginTop: "1%",
        width: '95%'
    },
    inputCnt: {
        // width: '100%',
        marginTop: '1%',
        flexDirection: 'row'
    },
    inputHintCnt: {
        width: '48%',
    },
    inputHint: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '500'
    },
    input: {
        color: '#000000',
        fontSize: 15,
        padding: 0
    },
    addProcedureButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingTop: '1%',
        paddingBottom: '1%',
        backgroundColor: '#8db4e2',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: '#8db4e2',
        marginTop: '2%'
    },
    upDownIcon: {
        height: 20,
        width: 20,
    },
    finalResultHeading: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        alignSelf: 'center'
    },
    deleteIconCnt: {
        marginLeft: 10,
    },
    calculateButton: {
        backgroundColor: '#addbe6',
        alignSelf: 'flex-end',
        width: '50%',
        marginTop: '5%',
        marginBottom: '1%',
        borderRadius: 2
    },
    calculateButtonCnt: {
        color: 'black',
        alignSelf: 'center',
        fontWeight: '600',
        margin: '2%',
    },

    finalResultButton: {
        marginTop: '2%',
        backgroundColor: '#addbe6',
        width: '95%',

    },
    finalResultButtonCnt: {
        color: 'black',
        fontWeight: '600',
        alignSelf: 'center',
        margin: '2%',

    }
});
