import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/login';

import MainRoutes from './mainroutes';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Perfil">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Bottom' component={MainRoutes} options={{headerShown: false}}></Stack.Screen>
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}