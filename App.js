import React, { createContext, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import CreatePatternScreen from './screens/CreatePatternScreen';
import * as SQLite from 'expo-sqlite';
import { Provider } from 'react-redux';
import { store } from './redux/store/Store';
import { Button } from 'react-native';

const Stack = createStackNavigator();
const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

const db = SQLite.openDatabase('CrochetAppDatabase');

function App() {
  return (
    <Provider store={store}>
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
              options={({ navigation }) => ({
                title: 'My Home',
                headerRight: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Save   "
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>      
      </DatabaseContext.Provider>
    </Provider>
  );
}

export default App;