import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Result() {
    const route = useRoute();
    const navigation = useNavigation();
    // var finalResult = [
    //     { name: 'Arc on Time(sec)', value: 0 },
    //     { name: 'Wire Dep(lbs)', value: 0 },
    //     { name: 'Gas Usage(cuft)', value: 0 },
    //     { name: 'Labor Cost', value: 0 },
    //     { name: 'Additional Cost', value: 0, },
    //     { name: 'Heat Input(KJ/in)', value: 0 },
    //     { name: 'Dep Rate lb/hr', value: 0 },
    // ]
    const [finalResult, setFinalResult] = useState([
        { name: 'Arc on Time(sec)', value: 0 },
        { name: 'Wire Dep(lbs)', value: 0 },
        { name: 'Gas Usage(cuft)', value: 0 },
        { name: 'Labor Cost', value: 0 },
        { name: 'Additional Cost', value: 0, },
        { name: 'Heat Input(KJ/in)', value: 0 },
        { name: 'Dep Rate lb/hr', value: 0 },
    ]);
    useEffect(() => {
        const obj = JSON.stringify(route.params);
        setFinalResult(JSON.parse(obj).result);
        console.log(finalResult);
    }, []);
    function onSubmitButton() {
        navigation.navigate('home')
    }
    return (
        <View style={styles.container}>
            <Card containerStyle={styles.inputCard}>
                {/* <Text style={styles.finalResultHeading}>Final Result</Text> */}
                {
                    finalResult.map((item, key) => (
                        <View key={key} style={styles.inputCnt}>
                            <View style={styles.inputHintCnt}>
                                <Text style={styles.inputHint}>{item.name}</Text>
                            </View>
                            <View style={[styles.inputHintCnt, { marginLeft: '4%' }]}>
                                <Text style={styles.input}>{item.value}</Text>
                            </View>
                        </View>
                    ))
                }
            </Card>
            <TouchableOpacity style={styles.submitButton}>
                <Button title="Submit Result" onPress={onSubmitButton}></Button>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputCard: {
        marginTop: '2%',
        width: '95%',
        padding: '4%',
        shadowOpacity: 1,
        shadowRadius: 5,
        backgroundColor: '#ffff99', 
        shadowColor: '#ffff99'
    },
    inputCnt: {
        width: '100%',
        marginTop: '1%',
        flexDirection: 'row'
    },
    inputHintCnt: {
        width: '48%',
    },
    inputHint: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500'
    },
    input: {
        color: '#000000',
        fontSize: 16,
    },
    finalResultHeading: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        alignSelf: 'center'
    },
    submitButton: {
        marginTop: '2%',
        backgroundColor: '#8db4e2',
        width: '95%',
    }
});