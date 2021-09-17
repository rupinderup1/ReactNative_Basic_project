import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('isUserLoggedIn').then((isUserIn)=> {
        if(isUserIn == 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
          })
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
          })
        }
       
      })
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.appLogo} source={require('../assets/logo.png')}></Image>
      <Text style={styles.appName}>Welding Process</Text>
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
  appLogo: {
    width: '40%',
    height: '20%',
    resizeMode: 'stretch'
  },
  appName: {
    fontSize: 24,
    fontWeight: '500'
  }
});
