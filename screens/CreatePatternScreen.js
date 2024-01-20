import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/PatternSection';
import { CustomModal } from '../components/Common Models/CustomModal'

function CreatePatternScreen(){
  const [sections, setSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patSecName, setPatSecName] = useState("");

  const addPatternSec = (sectionTitle) => {
    const newSec = {sectionTitle: sectionTitle};
    setSections(prevSections => [...prevSections, newSec]);
};

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
      <View style={patternScreenStyling.contentBody}>
        {sections.map((sec, index) => (
                            <View key={index}>
                                <PatternSection sectionTitle={sec.sectionTitle}/>
                            </View>
                        ))}
      </View>
      <View style={patternScreenStyling.addSectionButtonContainer}>
        <TouchableOpacity 
          style={patternScreenStyling.addSectionButton}
          onPress={() => {setIsModalVisible(true)}}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

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
    gap: 5,
  },
  modalTextInput:{
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
  },
});

export default CreatePatternScreen;
