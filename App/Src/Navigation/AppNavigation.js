import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation"; // Contiene Inicio y demás tabs
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, AppState } from "react-native";

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const appState = useRef(AppState.currentState);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (error) {
      console.error("Error al cargar el token desde AsyncStorage", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    loadToken();
  }, []);

  // Se ejecuta cuando la app vuelve al foreground
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("La aplicación volvió al primer plano, verificando token...");
        loadToken();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  // Siempre renderiza MainNavigation, Inicio dentro de los tabs maneja el login
  return (
    <NavigationContainer>
      <MainNavigation userToken={userToken} />
    </NavigationContainer>
  );
}
