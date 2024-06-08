import React, { createContext, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import { CreatePatternScreen } from './screens/CreatePatternScreen';
import db from './database/Database';
import { Provider } from 'react-redux';
import { store } from './redux/store/Store';
import { Button } from 'react-native';

const Stack = createStackNavigator();
const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

function App() {
  const createPatternRef = useRef();

  return (
    <Provider store={store}>
      <DatabaseContext.Provider value={{ db }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen 
              name="Create Pattern" 
              options={{
                title: 'Create New Pattern',
                headerRight: () => (
                  <Button
                    onPress={() => { createPatternRef.current?.openSavePatternDataModal() }}
                    title="Save"
                  />
                ),
                headerLeft: () => (
                  <Button
                    onPress={() => { createPatternRef.current?.handleExitButton() }}
                    title="Exit"
                  />
                )
              }}>
              {props => <CreatePatternScreen ref={createPatternRef} {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>      
      </DatabaseContext.Provider>
    </Provider>
  );
}

export default App;