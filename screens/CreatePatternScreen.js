import React, {useRef, useState} from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { InstructionSectionManager } from '../components/Instruction Stuff/InstructionSectionManager';

function CreatePatternScreen(){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roundStartNum, setRoundStartNum] = useState("");
  const [roundEndNum, setRoundEndNum] = useState("");
  const sectionManagerRef = useRef();

  const onCloseModal = () =>{
    setRoundStartNum("");
    setRoundEndNum("");
    
    setIsModalVisible(false);
  }

  const onSubmitModal = () =>{
    if(sectionManagerRef.current){
      sectionManagerRef.current.addInstSec(roundStartNum, roundEndNum);
    }

    onCloseModal();
  }

  return (
    <View style={patternScreenStyling.container}>
      <InstructionSectionManager
        ref={sectionManagerRef}
      />
      <View style={patternScreenStyling.addSectionButtonContainer}>
        <TouchableOpacity 
          style={patternScreenStyling.addSectionButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
          visible={isModalVisible}
          onRequestClose={onCloseModal}
          animationType="slide"
          transparent={true} // Make the modal's background transparent
        >
          <View style={patternScreenStyling.modalOuter}>
            <View style={patternScreenStyling.modalInner}>
              <View style={patternScreenStyling.modalContent}>
                <View>
                  <Text style={patternScreenStyling.modalContentHeaderText}>Add New Instruction:</Text>
                </View>
                <View style={patternScreenStyling.modalBody}>
                  <View style={patternScreenStyling.modalTextInputContainer}>
                      <Text>Round Start: </Text>
                      <TextInput 
                        style={patternScreenStyling.modalTextInput}
                        value={roundStartNum}
                        onChangeText={setRoundStartNum}
                        placeholder={"ex: 3"} 
                        placeholderTextColor={"lightgrey"}
                        keyboardType="numeric"
                      />
                  </View>
                  <View style={patternScreenStyling.modalTextInputContainer}>
                      <Text>Round End: </Text>
                      <TextInput 
                        style={patternScreenStyling.modalTextInput}
                        value={roundEndNum}
                        onChangeText={setRoundEndNum}
                        placeholder={"ex: 4"} 
                        placeholderTextColor={"lightgrey"}
                        keyboardType="numeric"
                      />
                  </View>
                </View>
              </View>
              <View style={patternScreenStyling.modalButtonContainer}>
                <TouchableOpacity 
                  onPress={onCloseModal} style={patternScreenStyling.modalButtons}> 
                  <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSubmitModal} style={patternScreenStyling.modalButtons}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  modalOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalInner: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
  modalContentHeaderText: {
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    columnGap: 10,
    width: '100%',
  },
  modalButtons:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 8,
  },
  modalBody: {
    padding: 10,
    gap: 10,
    width: '100%',
    maxWidth: 300,
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
