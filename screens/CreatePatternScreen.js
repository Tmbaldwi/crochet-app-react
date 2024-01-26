import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/PatternSection';
import { CustomModal } from '../components/Common Models/CustomModal'

// Create Pattern Screen
// Description:
// Hosts all the pattern sections for pattern creation
// Allows user to add pattern sections, prompts user with a modal to give the pattern section a name
//
// TODO: 
// Allow savability of patterns, and pattern finalization
function CreatePatternScreen(){
  const [sections, setSections] = useState([{sectionTitle: "Test Section"}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patSecName, setPatSecName] = useState("");

  // adds pattern sections to the page
  const addPatternSec = (sectionTitle) => {
    const newSec = {sectionTitle: sectionTitle};
    setSections(prevSections => [...prevSections, newSec]);
  };

  // deletes pattern sections, passed to the pattern section so it can remove itself
  const deletePatternSec = (index) => {
    const newSecs = sections.filter((_, i) => i !== index);
    setSections(newSecs);
  }

  const onCloseModal = () =>{
    setPatSecName("");
    
    setIsModalVisible(false);
  }

  const onSubmitModal = () =>{
    addPatternSec(patSecName)

    onCloseModal();
  }

  return (
    <View style={patternScreenStyling.pageContentContainer}>
      <ScrollView style={patternScreenStyling.contentBody}>
        {sections.map((sec, index) => (
                            <View key={index}>
                                <PatternSection 
                                  sectionTitle={sec.sectionTitle}
                                  deletePatternSectionFunc={() => deletePatternSec(index)}
                                />
                            </View>
                        ))}
      </ScrollView>
      <View style={patternScreenStyling.addSectionButtonContainer}>
        <Pressable 
          style={patternScreenStyling.addSectionButton}
          onPress={() => {setIsModalVisible(true)}}
        >
          <Text>+</Text>
        </Pressable>
      </View>

      {/* 
        Modal for adding pattern sections
        Prompts user for section name 
      */}
      <CustomModal
        isVisible={isModalVisible}
        headerText={"Add New Section:"}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
      >
        <View style={patternScreenStyling.modalTextInputContainer}>
          <Text>Section Name: </Text>
          <TextInput 
            style={patternScreenStyling.modalTextInput}
            value={patSecName}
            onChangeText={setPatSecName}
            placeholder={"ex: Head"} 
            placeholderTextColor={"lightgrey"}
          />
        </View>
      </CustomModal>
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