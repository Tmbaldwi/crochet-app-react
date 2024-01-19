import React, {useRef, useState} from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/PatternSection';

function CreatePatternScreen(){
  const [sections, setSections] = useState([]);

  const addPatternSec = () => {
    const newSec = {};
    setSections(prevSections => [...prevSections, newSec]);
};

  return (
    <View style={patternScreenStyling.pageContentContainer}>
      <View style={patternScreenStyling.contentBody}>
        {sections.map((sec, index) => (
                            <View key={index}>
                                <PatternSection/>
                            </View>
                        ))}
      </View>
      <View style={patternScreenStyling.addSectionButtonContainer}>
        <TouchableOpacity 
          style={patternScreenStyling.addSectionButton}
          onPress={addPatternSec}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const patternScreenStyling = StyleSheet.create({
  pageContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  contentBody: {
    width: "100%", 
    flex: 1,
  },
  addSectionButtonContainer: {
    bottom: 0,
    right: 0,
    height: 100,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  addSectionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePatternScreen;
