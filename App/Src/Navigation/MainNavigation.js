import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import ProductsStack from "../../screens/Products/ProductsStack"; // Stack para Products si quieres detalle
import Cart from "../../screens/Cart/Cart";
import ProfileStack from "../../screens/Profile/ProfileStack"; // Stack para Profile + EditProfile

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#eef6d7",
          borderTopWidth: 1,
          borderTopColor: "#3d481d",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Products",
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
          tabBarLabel: "Cart",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
