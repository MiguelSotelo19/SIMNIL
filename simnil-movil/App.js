import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/login';

import MainRoutes from './mainroutes';
import Perfil from './screen/perfil';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Bottom' component={MainRoutes} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Perfil' component={Perfil}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}