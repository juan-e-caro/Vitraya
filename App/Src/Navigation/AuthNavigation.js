import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import RecoverPassword from "../../screens/Auth/RecoverPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{ title: "Recover Password" }}
      />
    </Stack.Navigator>
  );
}
