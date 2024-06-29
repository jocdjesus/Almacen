import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../menu/tabs/profileScreen";
import BarcodeScreen from "../menu/tabs/barcodeScreen";
import ContarScreen from "../menu/tabs/contarScreen";
import GenerateBarcodeScreen from "../menu/tabs/generateBarcodeScreen";
import VentaScreen from "../menu/tabs/ventaScreen";

const Tab = createBottomTabNavigator();
const MenuScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Alta Productos"
        component={BarcodeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contabilizar"
        component={ContarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
        name="Venta"
        component={VentaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-usd" size={size} color={color} />
          ),
        }}
      />
      {<Tab.Screen
        name="Generar Codigo"
        component={GenerateBarcodeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options-outline" size={size} color={color} />
          ),
        }}
      />
    }
    </Tab.Navigator>
  );
};

export default MenuScreen;
