import React, {useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch } from 'react-native';
import {CustomModal} from "../../Common Models/Modals/CustomModal";
import { CommonTextInput } from "../../Common Models/CommonTextInput";
import { DropdownComponent } from "../../Common Models/Dropdown";

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
export const AddEditInstructionSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentInfo, previousRoundNum}) => {
    const [roundStartNum, setRoundStartNum] = useState(previousRoundNum? previousRoundNum + 1: "");
    const [roundEndNum, setRoundEndNum] = useState("");
    const [roundEndIsSelected, setRoundEndIsSelected] = useState(false);
    const [sectionTypeSelection, setSectionTypeSelection] = useState({value: "", label: ""});
    const [isSectionTypeTextInputDisabled, setIsSectionTypeTextInputDisabled] = useState(true);
    let requiredInputs = [
                            {input: roundStartNum, disallowEmptyInput: true}, 
                            {input: sectionTypeSelection.value, disallowEmptyInput: true},
                            {input: sectionTypeSelection.label, disallowEmptyInput: true},
    ];

    if(roundEndIsSelected){
        let roundIncreasing = parseInt(roundStartNum) < parseInt(roundEndNum);
        requiredInputs.push({input: roundEndNum, disallowEmptyInput: true, extraReqNotFulfilled: !roundIncreasing})
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
                setRoundStartNum(currentInfo.startNum);
                setRoundEndNum(currentInfo.endNum);
                setRoundEndIsSelected(currentInfo.endNum);
                setSectionTypeSelection(currentInfo.sectionTypeSelection)
                console.log(currentInfo)
                setIsSectionTypeTextInputDisabled(currentInfo.sectionTypeSelection.value !== "other")
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
            addFunc(sectionTypeSelection.label, sectionTypeSelection, roundStartNum, roundEndNum);
            break;
          case "edit":
            editFunc(sectionTypeSelection.label, sectionTypeSelection, roundStartNum, roundEndNum);
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
        setSectionTypeSelection({value: "", label: ""});
        setIsSectionTypeTextInputDisabled(true);

        onCloseModal();
    };

    // function to handle dropdown selections, notably allows the text input to be used  during "other" selection
    const handleSectionTypeChange = (item) => {
        switch(item.value){
            case "other":
                setIsSectionTypeTextInputDisabled(false);
                setSectionTypeSelection({value: item.value, label: ""});
                break;
            default:
                setIsSectionTypeTextInputDisabled(true);
                setSectionTypeSelection(item);
                break;
        }
    };

    const handleSectionTypeTextInputChange = (newText) => {
        setSectionTypeSelection({value: sectionTypeSelection.value, label: newText});
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
                <View style={instructionSectionModalStyling.instructionSectionTypeSelectionContainer}>
                    <Text style={instructionSectionModalStyling.instructionSectionTypeSelectionSubheader}>
                        Select Section Type:
                    </Text>
                    <View style={instructionSectionModalStyling.instructionSectionTypeSelectionInputContainer}>
                        <View style={instructionSectionModalStyling.instructionSectionTypeDropdown}>
                            <DropdownComponent
                                callback={handleSectionTypeChange}
                                dataType={"instructionSectionType"}
                                currentSelection={currentInfo?.sectionTypeSelection.value}
                            />
                        </View>
                        <View style={instructionSectionModalStyling.instructionSectionOtherTextInput}>
                            <CommonTextInput
                                value={sectionTypeSelection.label}
                                onChangeText={handleSectionTypeTextInputChange}
                                placeholder={"..."}
                                isDisabled={isSectionTypeTextInputDisabled}
                            />
                        </View>
                    </View>
                </View>
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
                                <View style={{flex: 1,}}/>
                                <View style={{flex: 1,}}>
                                    <Text style={[instructionSectionModalStyling.modalTextInputSubheader, 
                                                roundEndIsSelected? null : instructionSectionModalStyling.modalTextInputSubheaderDisabled,
                                                ]}
                                    >
                                        End:
                                    </Text>
                                </View>
                                <View style={instructionSectionModalStyling.modalTextInputSwitchContainer}>
                                    <Switch
                                        value={roundEndIsSelected}
                                        onValueChange={setRoundEndIsSelected}
                                    />
                                </View>
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
    instructionSectionTypeSelectionContainer:{
        gap: 5,
        paddingBottom: 15,
        borderBottomWidth: 1,
    },
    instructionSectionTypeSelectionSubheader:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    instructionSectionTypeSelectionInputContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    instructionSectionTypeDropdown: {
        flex: 1,
    },
    instructionSectionOtherTextInput: {
        flex: 1,
    },
    rangeSelectionContainer: {
        alignItems: 'center',
        gap: 5,
        paddingTop: 10,
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
        justifyContent: 'flex-end',
        gap: 5,
    },
    modalTextInputSwitchContainer: {
        flex: 1,
        alignItems: 'center',
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
        width: '100%',
    },
});