import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { CustomModal } from '../../Common Models/CustomModal'

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
export const AddEditPatternSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentSectionTitle}) => {
    const [patternSectionName, setPatternSectionName] = useState("");
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
          setPatternSectionName(currentSectionTitle);
      }

    }, [isModalVisible === true]);

    // Called when submitting the modal
    // Either runs the add function with the inputted pattern section name, 
    // or the edit function with its new pattern section name
    const onSubmitModal = () =>{
        switch(modalMode) {
          case "add":
            addFunc(patternSectionName);
            break;
          case "edit":
            editFunc(patternSectionName);
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
            closeText={"Cancel"}
        >
        <View style={patternSectionModalStyling.textInputContainer}>
          <Text>Section Name: </Text>
          <TextInput 
            style={patternSectionModalStyling.textInput}
            value={patternSectionName}
            onChangeText={setPatternSectionName}
            placeholder={"ex: Head"} 
            placeholderTextColor={"lightgrey"}
          />
        </View>
      </CustomModal>
    )
}

const patternSectionModalStyling = StyleSheet.create({
    textInputContainer:{
      flexDirection: "row",
      justifyContent: 'center',
      gap: 5,
    },
    textInput:{
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
    },
  });