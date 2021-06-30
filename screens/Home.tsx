import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.procedureButton}>
                <Button title="Current Procedure" onPress={() => navigation.navigate('procedure', { type: 'current' })}></Button>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.procedureButton, { marginTop: '2vh' }]}>
                <Button title="New Procedure" onPress={() => navigation.navigate('procedure', { type: 'new' })}></Button>
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
        height: "5vh",
        width: '80vw',
    }
});
