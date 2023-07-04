import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from './app/navigations/AuthNavigator';
import NavigationTheme from './app/navigations/NavigationTheme';
import AppNavigator from './app/navigations/AppNavigator';
import authStorage from './app/auth/storage';
import AppLoading from 'expo-app-loading';
import AuthContext from './app/auth/context';
import { navigationRef } from "./app/navigations/rootNavigation";
import AvailableRides from './app/screens/AvailableRides';


export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>

    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
