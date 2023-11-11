import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';  // Import the HomeScreen component
import AddScreen from './AddScreen';    // Import the AddScreen component

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
          name="Add"
          component={AddScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
