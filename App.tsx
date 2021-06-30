import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Procedure from './screens/Procedure';
import Result from './screens/Result';
const Stack = createStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.tsx to start working on your app!</Text> */}
    //   {/* <StatusBar style="auto" /> */}
    //   <Splash />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{ title: 'Welding Process' }}></Stack.Screen>
        <Stack.Screen name="home" component={Home} options={{ title: 'Unleashing Your Welding Potential' }}></Stack.Screen>
        <Stack.Screen name="procedure" component={Procedure} options={{ title: 'Procedure' }}></Stack.Screen>
        <Stack.Screen name="result" component={Result} options={{ title: 'Final Result' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
