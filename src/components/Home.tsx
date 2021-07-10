import React from 'react';
import { StyleSheet, View, Button, TouchableHighlight} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.procedureButton}>
                <Button title="Current Procedure" onPress={() => navigation.navigate('procedure', { type: 'current', title: 'Current Procedure' })}></Button>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.procedureButton, { marginTop: '4%' }]}>
                <Button title="New Procedure" onPress={() => navigation.navigate('procedure', { type: 'new', title: 'New Procedure' })}></Button>
            </TouchableHighlight>
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
        bottom:'10%'
    }
});

