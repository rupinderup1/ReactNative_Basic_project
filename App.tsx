import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/components/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Procedure from './src/components/Procedure';
import Result from './src/components/Result';
import OldProcedures from './src/components/OldProcedures';
import Settings from './src/components/Settings';

const Stack = createStackNavigator();
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{ title: 'Welding Process' }}></Stack.Screen>
        <Stack.Screen name="home" component={Home} options={{ title: 'Unleashing Your Welding Potential' }}></Stack.Screen>
        <Stack.Screen name="login" component={Login} options={{ title: 'Welding Process' }}></Stack.Screen>
        <Stack.Screen name="procedure" component={Procedure} options={({ route }) => ({ title: JSON.parse(JSON.stringify(route.params)).title })}></Stack.Screen>
        <Stack.Screen name="result" component={Result} options={{ title: 'Final Result' }}></Stack.Screen>

        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }}></Stack.Screen>
        <Stack.Screen name="OldProcedures" component={OldProcedures} options={{ title: 'Previous Result Record' }}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer >
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
