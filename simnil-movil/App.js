import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import Login from './screen/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainRoutes from './mainroutes';
import Estadistica from './screen/histogramas';
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/login';

import MainRoutes from './mainroutes';
>>>>>>> main


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Estadistica">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Bottom' component={MainRoutes} />
        <Stack.Screen name="Estadistica" component={Estadistica} />
=======
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Bottom' component={MainRoutes}></Stack.Screen>
>>>>>>> main
      </Stack.Navigator>
    </NavigationContainer>
  );
}