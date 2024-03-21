import React, {useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from 'react-native';
import {CustomModal} from "../../Common Models/Modals/CustomModal";
import { StringValidator } from './../../Tools/StringValidator';

// Add/Edit Instruction Section Modal
//
// Description:
// The modal used to create/edit instruction sections
// In add mode, a user can type a new range, and on submit it will be added to the end of the instruction seciton list
// In edit mode, a user can edit an existing instruction section's range, or delete the section entirely
// 
// Usage:
// Must pass the desired mode (add/edit), a close function, and a visibility variable
// Add mode: must pass an add function to add a new instruction section
// Edit mode: must pass an edit function to edit the instruction section, a delete function to delete the instruction section,
//  and the current section range
export const AddEditInstructionSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentStartNum, currentEndNum}) => {
    const [roundStartNum, setRoundStartNum] = useState("");
    const [roundEndNum, setRoundEndNum] = useState("");
    let requiredInputs = [{input: roundStartNum, disallowEmptyInput: true}, {input: roundEndNum, disallowEmptyInput: true}];
    
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
    
    // When the modal is opened, if it is in edit mode then load the current range
    useEffect(() => {
        if (modalMode === "edit") {
            setRoundStartNum(currentStartNum);
            setRoundEndNum(currentEndNum);
        }
      }, [isModalVisible === true]);


    // Called when submitting the modal
    // Either runs the add function with the inputted round range,
    // or the edit function with the new round range
    const onSubmitModal = () =>{
        switch(modalMode) {
          case "add":
            addFunc(roundStartNum, roundEndNum);
            break;
          case "edit":
            editFunc(roundStartNum, roundEndNum);
            break;
        }
    
        onCloseInstructionSectionModal();
    };

    // deletes the instruction section
    const deleteInstructionSection = () => {
        deleteFunc();

        onCloseInstructionSectionModal();
    }

    // close function called after submit/delete/close
    const onCloseInstructionSectionModal = () => {
        setRoundStartNum("");
        setRoundEndNum("");

        onCloseModal();
    };

    return (
        <CustomModal
            isVisible={isModalVisible}
            headerText={modalHeader}
            onClose={onCloseInstructionSectionModal}
            onSubmit={onSubmitModal}
            onDelete={deleteInstructionSection}
            hideDelete={hideDelete}
            requiredInputsForSubmit={requiredInputs}
        >
            <View style={instructionSectionModalStyling.modalBody}>
                <View style={instructionSectionModalStyling.modalTextInputContainer}>
                    <Text>Round Start: </Text>
                    <TextInput 
                        style={instructionSectionModalStyling.modalTextInput}
                        value={roundStartNum}
                        onChangeText={(num) => StringValidator.enforceNumerics(num, setRoundStartNum)}
                        placeholder={"ex: 3"} 
                        placeholderTextColor={"lightgrey"}
                        keyboardType="numeric"
                        returnKeyType='done'
                    />
                </View>
                <View style={instructionSectionModalStyling.modalTextInputContainer}>
                    <Text>Round End: </Text>
                    <TextInput 
                        style={instructionSectionModalStyling.modalTextInput}
                        value={roundEndNum}
                        onChangeText={(num) => StringValidator.enforceNumerics(num, setRoundEndNum)}
                        placeholder={"ex: 4"} 
                        placeholderTextColor={"lightgrey"}
                        keyboardType="numeric"
                        returnKeyType='done'
                    />
                </View>
            </View>
        </CustomModal>
    );
};

const instructionSectionModalStyling = StyleSheet.create({
    modalBody: {
        gap: 5,
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