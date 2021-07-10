import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/components/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home';
import Procedure from './src/components/Procedure';
import Result from './src/components/Result';
const Stack = createStackNavigator();
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./src/store/reducer";


const store: Store<ProcedureState, ProcedureAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={Splash} options={{ title: 'Welding Process' }}></Stack.Screen>
        <Stack.Screen name="home" component={Home} options={{ title: 'Unleashing Your Welding Potential' }}></Stack.Screen>
        <Stack.Screen name="procedure" component={Procedure} options={({ route }) => ({ title: JSON.parse(JSON.stringify(route.params)).title })}></Stack.Screen>
        <Stack.Screen name="result" component={Result} options={{ title: 'Final Result' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
    </Provider>
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
