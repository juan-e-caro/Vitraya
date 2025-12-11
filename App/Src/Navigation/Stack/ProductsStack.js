import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../../screens/Products/Products";

const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "Products", headerShown: false }} // headerShown: false porque el tab ya sirve de navegación
      />
    </Stack.Navigator>
  );
}
