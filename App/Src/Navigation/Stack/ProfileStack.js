import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/Profile/Profile";
import EditProfile from "../../screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Edit Profile", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
