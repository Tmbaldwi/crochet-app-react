import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import CreatePatternScreen from './screens/CreatePatternScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screen definitions go here */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="CreatePattern"
          component={CreatePatternScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
