import React, {useState, useEffect } from "react";
import { View, StyleSheet, Text, CheckBox } from 'react-native';
import {CustomModal} from "../../Common Models/Modals/CustomModal";
import { CommonTextInput } from "../../Common Models/CommonTextInput";

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
export const AddEditInstructionSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentStartNum, currentEndNum, previousRoundNum}) => {
    const [roundStartNum, setRoundStartNum] = useState(previousRoundNum? previousRoundNum + 1: "");
    const [roundEndNum, setRoundEndNum] = useState("");
    const [roundEndIsSelected, setRoundEndIsSelected] = useState(false);
    let requiredInputs = [{input: roundStartNum, disallowEmptyInput: true}];

    if(roundEndIsSelected){
        requiredInputs.push({input: roundEndNum, disallowEmptyInput: true})
    }
    
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
        switch(modalMode){
            case "edit":
                setRoundStartNum(currentStartNum);
                setRoundEndNum(currentEndNum);
                setRoundEndIsSelected(currentEndNum);
                break;
            case "add":
                setRoundStartNum(previousRoundNum? ""+ (parseInt(previousRoundNum) + 1): "1"); //TODO Fix
        }
      }, [isModalVisible === true]);

    useEffect(() => {
        setRoundEndNum("");
      }, [roundEndIsSelected]);


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
        setRoundEndIsSelected(false);

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
                <View style={instructionSectionModalStyling.rangeSelectionContainer}>
                    <Text style={[instructionSectionModalStyling.rangeSelectionHeaderText, {fontWeight: 'bold'}]}>
                        Previous Section End:
                    </Text>
                    <Text style={instructionSectionModalStyling.rangeSelectionHeaderText}>
                        {previousRoundNum? previousRoundNum: "N/A"}
                    </Text>
                    <View style={instructionSectionModalStyling.rangeSelectionInputContainer}>
                        <View style={instructionSectionModalStyling.modalTextInputContainer}>
                            <Text style={instructionSectionModalStyling.modalTextInputSubheader}>
                                Start:
                            </Text>
                            <CommonTextInput 
                                value={roundStartNum}
                                onChangeText={setRoundStartNum}
                                placeholder={"ex: 3"} 
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>
                        <View style={instructionSectionModalStyling.modalTextInputContainer}>
                            <View style={instructionSectionModalStyling.modalTextInputRoundEndSubheaderContainer}>
                                <CheckBox
                                    value={roundEndIsSelected}
                                    onValueChange={setRoundEndIsSelected}
                                />
                                <Text style={[instructionSectionModalStyling.modalTextInputSubheader, 
                                            roundEndIsSelected? null : instructionSectionModalStyling.modalTextInputSubheaderDisabled,
                                            ]}
                                >
                                    End:
                                </Text>
                            </View>
                            <CommonTextInput 
                                value={roundEndNum}
                                onChangeText={setRoundEndNum}
                                placeholder={"ex: 4"} 
                                keyboardType="numeric"
                                maxLength={4}
                                isDisabled={!roundEndIsSelected}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </CustomModal>
    );
};

const instructionSectionModalStyling = StyleSheet.create({
    modalBody: {
        gap: 5,
    },
    rangeSelectionContainer: {
        alignItems: 'center',
        gap: 5,
    },
    rangeSelectionHeaderText: {
        textAlign: 'center',
        fontSize: 16,
    },
    rangeSelectionInputContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    modalTextInputContainer:{
        flex: 1,
        alignItems: 'center',
        gap: 5,
    },
    modalTextInputSubheader:{
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalTextInputSubheaderDisabled:{
        color: 'grey',
    },
    modalTextInputRoundEndSubheaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});