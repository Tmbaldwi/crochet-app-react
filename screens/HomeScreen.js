import React from 'react';
import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';

// Home screen
function HomeScreen({ navigation }) {
  const patternIds = ["Teddy Bear", "Peepo", "Forg"];
  
  return (
    <View style={styles.screenContainer}>
      <View style={styles.patternNavigatorHeaderContainer}>
        <Text style={styles.patternNavigatorHeaderText}>
          My Patterns:
        </Text>
      </View>
      <View style={styles.patternNavigatorContainer}>
        <ScrollView style={styles.patternNavigatorScrollView} contentContainerStyle={styles.patternNavigatorScrollViewContentContainer}>
          {patternIds.length == 0 && 
            <Text>
              Hello I am empty :3
            </Text>
          }
          {patternIds.map((patternNames, index) => (
            <View key={patternNames}>
              <Text>{patternNames}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Create Pattern')}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternNavigatorHeaderContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginHorizontal: 25,
  },
  patternNavigatorHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  patternNavigatorContainer: {
    flex: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 25,
    marginBottom: 50,
    padding: 20,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
  },
  patternNavigatorScrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  patternNavigatorScrollViewContentContainer: {
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