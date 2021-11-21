import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import PracScreen from './src/PracScreen';
import SelectLevelScreen from './src/screens/SelectLevelScreen';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Select Level" component={SelectLevelScreen} />
        <Stack.Screen name="Practice" component={PracScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
