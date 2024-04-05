import React, { createContext, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import CreatePatternScreen from './screens/CreatePatternScreen';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();
const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

const db = SQLite.openDatabase('CrochetAppDatabase');

function App() {
  return (
    <DatabaseContext.Provider value={{db}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Create Pattern"
            component={CreatePatternScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>      
    </DatabaseContext.Provider>
  );
}

export default App;