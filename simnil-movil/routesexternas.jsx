import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from "./screen/perfil";
import Estadistica from "./screen/histogramas";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#FFF",
        inactiveTintColor: "#000",
        activeBackgroundColor: "#72BCED",
        inactiveBackgroundColor: "#9b9b9b",
        labelStyle: {
          color: "#000", // Color del texto cuando no está seleccionado
          fontWeight: "bold", // Otras propiedades de estilo que desees agregar
        },
        iconStyle: {
          color: "#000", // Color del icono cuando no está seleccionado
        },
        style: {
          backgroundColor: "#9b9b9b", // Color de fondo cuando no está seleccionado
        },
      }}
      initialRouteName="Perfil"
    >
      <Tab.Screen
        name="Cuenta"
        component={Perfil}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarActiveTintColor: "#191970",
          tabBarInactiveTintColor: "#002fd",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={30} color="black" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Estadisticas"
        component={Estadistica}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          tabBarActiveTintColor: "#191970",
          tabBarInactiveTintColor: "#002fd",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-sharp" size={24} color="black" />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Routes;
