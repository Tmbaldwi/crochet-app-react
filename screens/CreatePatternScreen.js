import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/Pattern Section/PatternSection';
import { AddEditPatternSectionModal } from '../components/Instruction Stuff/Pattern Section/AddEditPatternSectionModal';

// Create Pattern Screen
// Description:
// Hosts all the pattern sections for pattern creation
// Allows user to add pattern sections, prompts user with a modal to give the pattern section a name
function CreatePatternScreen(){
  const [patternSections, setPatternSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let isViewMode = false; //Add conditional behavior for view/(edit/create)

  const onCloseModal = () =>{
    setIsModalVisible(false);
  }

  const addPatternSection = (sectionTitle) => {
    let newSec = {sectionTitle: sectionTitle};
    setPatternSections(prevSections => [...prevSections, newSec]);
  };

  const editPatternSection = (newSectionTitle, index) => {
    let newSections = patternSections.map((section, idx) => {
      if (idx === index) {
        return { ...section, sectionTitle: newSectionTitle };
      }

      return section;
    });
  
    setPatternSections(newSections);
  }

  const deletePatternSection = (index) => {
    const newSecs = patternSections.filter((_, i) => i !== index);
    setPatternSections(newSecs);
};

  return (
    <View style={{alignItems: 'center'}}>
      <View style={patternScreenStyling.pageContentContainer}>
        <ScrollView style={patternScreenStyling.contentBody}>
          {patternSections.map((sec, index) => (
                              <View key={index}>
                                  <PatternSection
                                    isViewMode={isViewMode}
                                    sectionTitle={sec.sectionTitle}
                                    editFunc={(newSectionTitle) => editPatternSection(newSectionTitle, index)}
                                    deleteFunc={() => deletePatternSection(index)}
                                  />
                              </View>
                          ))}
        </ScrollView>
        <View style={patternScreenStyling.addSectionButtonContainer}>
          <Pressable 
            style={patternScreenStyling.addSectionButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text>+</Text>
          </Pressable>
        </View>

        <AddEditPatternSectionModal
          modalMode={"add"}
          onCloseModal={onCloseModal}
          isModalVisible={isModalVisible}
          addFunc={addPatternSection}
          patternSections={patternSections}
          setPatternSections={setPatternSections}
        />
      </View>
    </View>
  );
};

const patternScreenStyling = StyleSheet.create({
  pageContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 1400,
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
  modalTextInputContainer:{
    flexDirection: "row",
    justifyContent: 'center',
    gap: 5,
  },
  modalTextInput:{
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
  },
});

export default CreatePatternScreen;