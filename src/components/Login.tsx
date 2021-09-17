import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
    const navigation = useNavigation();
    var username = '';
    var password = '';

    function onChangeUsername(text: any) {
        username = text;
    }

    function onChangePassword(text: any) {
        password = text;
    }

    function onLogin () {
        if (username == "" || password == "") {
            alert("Please enter username or password");
        } else {
            if (username.toLowerCase() == 'weldingprocess@gmail.com' && password == 'WPAdmin@123') {
                // navigation.navigate('Home');
                 AsyncStorage.setItem('isUserLoggedIn','true').then(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'home' }],
                    })
                 })
               
            } else {
                alert("Incorrect credentials");
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.appLogo} source={require('../assets/logo.png')}></Image>

            <TextInput
                style={[styles.input, { marginTop: '15%' }]}
                placeholder="Enter username"
                onChangeText={(text) => onChangeUsername(text)}
            >
            </TextInput>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Enter password"
                onChangeText={(text) => onChangePassword(text)}
            >
            </TextInput>
            <TouchableOpacity style={[styles.procedureButton, { marginTop: '4%' }]} onPress={() => onLogin()}>
                <Text style={styles.procedureButtonCnt}  >
                    Login
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
        // justifyContent: 'center',
    },
    procedureButton: {
        backgroundColor: '#8db4e2',
        width: '90%',
        alignItems: 'center',

    },
    procedureButtonCnt: {
        color: 'white',
        margin: '2%',
        fontWeight: '600',
    },

    input: {
        width: "90%",
        color: "#000000",
        fontSize: 15,
        padding: '2%',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    appLogo: {
        width: '40%',
        height: '20%',
        marginTop: '15%',
        resizeMode: 'stretch',
    },
});

