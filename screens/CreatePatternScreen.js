import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { InstructionSectionManager } from '../components/Instruction Stuff/InstructionSectionManager';

function CreatePatternScreen(){
  return (
    <View style={patternScreenStyling.container}>
      <InstructionSectionManager/>
      <View style={patternScreenStyling.buttonContainer}>
        <TouchableOpacity style={patternScreenStyling.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const patternScreenStyling = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    bottom: 0,
    right: 0,
    height: 100,
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

export default CreatePatternScreen;
