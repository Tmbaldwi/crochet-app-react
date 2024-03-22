import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { CustomModal } from '../../Common Models/Modals/CustomModal';
import { StringValidator } from '../../Tools/StringValidator';
import { CommonTextInput } from '../../Common Models/CommonTextInput';

// Add/Edit Pattern Section Modal
//
// Description:
// The modal used to create/edit pattern sections
// In add mode, a user can type a new section title, and on submit it will be added to the end of the pattern seciton list
// In edit mode, a user can edit an existing pattern section title, or delete the section entirely
// 
// Usage:
// Must pass the desired mode (add/edit), a close function, and a visibility variable
// Add mode: must pass an add function to add a new pattern section
// Edit mode: must pass an edit function to edit the pattern section, a delete function to delete the pattern section,
//  and the current section title
export const AddEditPatternSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentInfo}) => {
    const [patternSectionName, setPatternSectionName] = useState("");
    const [repetitions, setRepetitions] = useState("1");
    const [specialInstruction, setSpecialInstruction] = useState("");
    const [specialInstHeight, setSpecialInstHeight] = useState(0);
    let requiredInputs = [{input: patternSectionName, disallowEmptyInput: true}, {input: repetitions, disallowEmptyInput: true}];

    let modalHeader = "";
    let hideDelete = false;

    // changes modal look/function depending on if its in add/edit mode
    switch(modalMode){
      case "add":
          modalHeader = "Add New Section:";
          hideDelete = true;
          break;
      case "edit":
          modalHeader = "Edit Section:";
          hideDelete = false;
          break;
    };

    // When the modal is opened, if it is in edit mode then load the current section title
    useEffect(() => {
      if (modalMode === "edit") {
          setPatternSectionName(currentInfo.sectionTitle);
          setRepetitions(currentInfo.repetitions);
          setSpecialInstruction(currentInfo.specialInstruction);
      }

    }, [isModalVisible === true]);

    // Called when submitting the modal
    // Either runs the add function with the inputted pattern section name, 
    // or the edit function with its new pattern section name
    const onSubmitModal = () =>{
        switch(modalMode) {
          case "add":
            addFunc(patternSectionName, repetitions, specialInstruction);
            break;
          case "edit":
            editFunc(patternSectionName, repetitions, specialInstruction);
            break;
        }
    
        onClosePatternSectionModal();
    };

    // Deletes the pattern section and closes modal
    const deletePatternSection = () => {
        deleteFunc();

        onClosePatternSectionModal();
    };

    // close function called after submit/delete/close
    const onClosePatternSectionModal = () =>{
        setPatternSectionName("");
        setRepetitions("1");
        setSpecialInstruction("");
        setSpecialInstHeight(0);

        onCloseModal();
    };

    return(
        <CustomModal
            isVisible={isModalVisible}
            headerText={modalHeader}
            onClose={onClosePatternSectionModal}
            onSubmit={onSubmitModal}
            onDelete={deletePatternSection}
            hideDelete={hideDelete}
            closeText={"CANCEL"}
            requiredInputsForSubmit={requiredInputs}
        >
        <ScrollView contentContainerStyle={patternSectionModalStyling.modalBody}>
          <View style={patternSectionModalStyling.inputContainerUpper}>
            <View style={patternSectionModalStyling.sectionNameTextInputContainer}>
              <Text style={patternSectionModalStyling.inputSubheader}>
                Section Name:
              </Text>
              <CommonTextInput 
                value={patternSectionName}
                onChangeText={setPatternSectionName}
                placeholder={"ex: Head"} 
              />
            </View>
            <View style={patternSectionModalStyling.repetitionsTextInputContainer}>
              <Text style={patternSectionModalStyling.inputSubheader}>
                Repetitions:
              </Text>
              <CommonTextInput 
                style={patternSectionModalStyling.textInputRepetitions}
                value={repetitions}
                onChangeText={(num) => StringValidator.enforceNumerics(num, setRepetitions)}
                placeholder={"ex: 3"} 
                keyboardType='numeric'
                maxLength={4}
              />
            </View>
          </View>
          <View style={patternSectionModalStyling.modalSpecialInstructionTextInputContainer}>
            <Text style={patternSectionModalStyling.inputSubheader}>Special Instructions: </Text>
              <CommonTextInput 
                extraStyle={{minHeight: Math.max(60, specialInstHeight)}}
                value={specialInstruction}
                onChangeText={setSpecialInstruction}
                placeholder={"..."} 
                multiline={true}
                onContentSizeChange={(event) => setSpecialInstHeight(event.nativeEvent.contentSize.height)}
                scrollEnabled={false}
              />
            </View>
        </ScrollView>
      </CustomModal>
    )
}

const patternSectionModalStyling = StyleSheet.create({
    modalBody: {
      gap: 10,
    },
    inputContainerUpper: {
      flexDirection: 'row',
      gap: 5,
    },
    sectionNameTextInputContainer:{
      flex: 2,
      justifyContent: 'center',
      gap: 5,
    },
    repetitionsTextInputContainer: {
      flex: 1,
      justifyContent: 'center',
      gap: 5,
    },
    inputSubheader: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    modalSpecialInstructionTextInputContainer:{
      alignItems: 'center',
      gap: 5,
    },
  });