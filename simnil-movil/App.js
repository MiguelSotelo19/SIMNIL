import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainRoutes from './mainroutes';
import Estadistica from './screen/histogramas';
import Perfil from './screen/perfil';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Bottom' component={MainRoutes}/>
        <Stack.Screen name='Perfil' component={Perfil} />
        <Stack.Screen name='Estadistica' component={Estadistica} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}