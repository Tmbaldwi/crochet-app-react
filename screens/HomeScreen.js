import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Home screen
// TODO: Add pattern navigations for saved patterns
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>My Screen Content</Text>
      <View style={styles.buttonContainer}>   {/* navigates to the create pattern screen */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Pattern')}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;