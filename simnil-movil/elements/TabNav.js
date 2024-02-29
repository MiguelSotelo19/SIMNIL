import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import  Perfil from '../screen/perfil'
import Estadistica from '../screen/histogramas'
import Valvulas from '../screen/controlvalvulas'
const Tab = createBottomTabNavigator();

const TabNav=()=>{
    return(
        <Tab.Navigator initialRouteName='perfil'>
            <Tab.Screen name='perfil' component={Perfil} options={
                {
                    headerShadowVisible:false,
                    tabBarActiveTintColor:'#00aa83',
                    tabBarInactiveTintColor:'#002fd',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                      )
                
                }
                }></Tab.Screen>
               
                <Tab.Screen name='Estadistica' component={Estadistica} options={
                {
                    headerShadowVisible:false,
                    tabBarActiveTintColor:'#00aa83',
                    tabBarInactiveTintColor:'#002fd',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                      )
                }
                }></Tab.Screen>
                <Tab.Screen name='Valvulas' component={Valvulas} options={
                {
                    headerShadowVisible:false,
                    tabBarActiveTintColor:'#00aa83',
                    tabBarInactiveTintColor:'#002fd',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                      )
                }
                }></Tab.Screen>
        </Tab.Navigator>

    );
}

export default TabNav;