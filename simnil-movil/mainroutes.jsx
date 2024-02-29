import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from "./screen/perfil";


const Tab = createBottomTabNavigator();

const MainRoutes = () => {
        return(
            <Tab.Navigator initialRouteName="Perfil">
                <Tab.Screen name="Perfil" component={Perfil} options={{headerShown: false}}></Tab.Screen>
            </Tab.Navigator>
        );

}
export default MainRoutes;