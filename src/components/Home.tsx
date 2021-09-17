import React from 'react';
import { StyleSheet, View, Button, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.procedureButton} onPress={() => navigation.navigate('Settings', { type: 'current', title: 'Current Procedure' })}>
                <Text style={styles.procedureButtonCnt} >
                Current Procedure
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.procedureButton, { marginTop: '4%' }]} onPress={() => navigation.navigate('Settings', { type: 'new', title: 'New Procedure' })}>
                <Text style={styles.procedureButtonCnt} >
                 New Procedure
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.procedureButton, { marginTop: '4%' }]} onPress={() => navigation.navigate('OldProcedures')}>
                <Text  style={styles.procedureButtonCnt}  >
                Procedure History
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    procedureButton: { 
        backgroundColor:'#8db4e2',
        width: '90%',
        bottom:'10%',
        alignItems:'center',
        
    },
    procedureButtonCnt: {
    color:'white',
    margin:'2%',
    fontWeight:'600',

    }
});

