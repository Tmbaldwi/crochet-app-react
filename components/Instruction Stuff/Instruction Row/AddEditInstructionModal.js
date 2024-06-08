import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CustomModal } from "../../Common Models/Modals/CustomModal"
import { DeleteButton } from "../../Common Models/Buttons/DeleteButton";
import { DropdownComponent } from "../../Common Models/Dropdown"
import { CommonButton } from "../../Common Models/Buttons/CommonButton";
import { CommonTextInput } from "../../Common Models/CommonTextInput";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Add instruction modal
// Description:
// This modal allows the user to create instruction rows
// It first requires you to add individual steps, which can be created and removed as needed
// In these steps, the number of times it is repeated is added, then the type of stitch to be made is added from a dropdown
// After, the user adds how many times the entire instruction is repeated, the color of the yarn, and any special instructions
// User then submits the modal, which adds the new instruction row based on their inputs
// User can also cancel the interaction at anytime, clearning the inputs
// 
// Usage:
// Must pass a close callback function, the modal's visibility variable, and the array where instructions will be added to
export const AddEditInstructionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentInfo}) => {
    const [repetitionsNum, setRepetitionsNum] = useState("1");
    const [colorText, setColorText] = useState("");
    const [instSteps, setInstSteps] = useState([{id: uuidv4(), rep: "", stitch: "", stitchAbbr: ""}]);
    const [instPreview, setInstPreview] = useState("[]");
    const [specialInstruction, setSpecialInstruction] = useState("");
    const [specialInstHeight, setSpecialInstHeight] = useState(0);

    // Adds all instruction steps to required inputs
    let requiredInputs = [];
    for(let step of instSteps){
      requiredInputs.push({input: step.rep, disallowEmptyInput: true})
      requiredInputs.push({input: step.stitch, disallowEmptyInput: true})
      requiredInputs.push({input: step.stitchAbbr, disallowEmptyInput: true})
    }

    let modalHeader = "";
    let hideDelete = false;

    // changes modal look/function depending on if its in add/edit mode
    switch(modalMode){
      case "add":
          modalHeader = "Add New Instruction:";
          hideDelete = true;
          break;
      case "edit":
          modalHeader = "Edit Instruction:";
          hideDelete = false;
          break;
     };

    // When the modal is opened, if it is in edit mode then load the current range
    useEffect(() => {
      if (modalMode === "edit") {
        setRepetitionsNum('' + currentInfo.repetition);
        setColorText(currentInfo.color);
        setSpecialInstruction(currentInfo.specialInstruction)
        setInstSteps(currentInfo.instructionSteps)
      }
    }, [isModalVisible === true]);

    // Called when submitting the modal
    // Either runs the add function with the inputted instruction info,
    // or the edit function with the new instruction info
    const onSubmitInstructionModal = () =>{
      switch(modalMode) {
        case "add":
          addFunc({
            id: uuidv4(),
            instruction: instPreview, 
            instructionSteps: instSteps, 
            repetition: repetitionsNum ? Number(repetitionsNum) : 1, 
            color: colorText, 
            specialInstruction: specialInstruction});
          break;
        case "edit":
          editFunc({
            instruction: instPreview, 
            instructionSteps: instSteps, 
            repetition: repetitionsNum ? Number(repetitionsNum) : 1, 
            color: colorText, 
            specialInstruction: specialInstruction});
          break;
      }
  
      onCloseInstructionModal();
    };

    // deletes the instruction
    const deleteInstruction = () => {
      deleteFunc();

      onCloseInstructionModal();
    }

    // adds a new step to the instruction creator
    const addNewStep = () => {
        setInstSteps([...instSteps, { id: uuidv4(), rep: "", stitch: "", stitchAbbr: "" }]);
    };

    // removes a given step on the instruction creator
    const removeInstStep = (index) => {
        const newSteps = instSteps.filter((_, i) => i !== index);
        setInstSteps(newSteps);
    };

    // clears text boxes and calls close callback function
    const onCloseInstructionModal = () => {
        setInstSteps([{id: uuidv4(), rep: "", stitch: "", stitchAbbr: ""}]);
        setInstPreview("");
        setRepetitionsNum("1");
        setColorText("");
        setSpecialInstruction("");
        setSpecialInstHeight(0);

        onCloseModal();
    };

    // updates instruction steps array with new instruction when changed
    const handleNewStepChange = (index, field, newItem) => {
        let newInstSteps = instSteps;
        switch(field){
          case 'rep':
            newInstSteps = instSteps.map((step, idx) => {
              if (idx === index) {
                  return {...step, rep: newItem.rep};
              }
              return step;
              });
            break;
          case 'stitch':
            newInstSteps = instSteps.map((step, idx) => {
              if (idx === index) {
                  return {...step, stitchAbbr: newItem.label, stitch: newItem.value};
              }
              return step;
              });
            break;
        }

        setInstSteps(newInstSteps);
    };

    // updates the instruction preview with all existing instructions
    const updateInstrucitonPreview = () => {
        let preview = "[";

        if(instSteps.length > 0){
          instSteps.forEach((step) => {
            preview += " " + step.rep + " " + step.stitchAbbr + ",";
          });

          preview = preview.substring(0, preview.length-1);
        }

        setInstPreview( preview + " ]");
    };

    // makes instruction row preview change whenvever steps change
    useEffect(() => {
        updateInstrucitonPreview();
    }, [instSteps]);

    return (
        <CustomModal
            isVisible={isModalVisible}
            headerText={modalHeader}
            onClose={onCloseInstructionModal}
            onSubmit={onSubmitInstructionModal}
            onDelete={deleteInstruction}
            hideDelete={hideDelete}
            height={'80%'}
            disableSubmit={requiredInputs.length == 0}
            requiredInputsForSubmit={requiredInputs}
        >
            <View style={modalStyles.modalSubheaderPreviewInstruction}>
              <Text style={modalStyles.modalSubheaderText}>Preview Instruction:</Text>
              <Text style={modalStyles.modalPreviewInstructionText}>{instPreview}</Text>
            </View>
            <ScrollView 
                style={modalStyles.modalBody} 
                contentContainerStyle={modalStyles.modalBodyContainerStyle}
                automaticallyAdjustKeyboardInsets={true}
            >
              <View>
                  <View style={modalStyles.instructionCreationContainer}>
                      <View style={modalStyles.instructionCreationHeader}>
                        <View style={modalStyles.instrutionCreationHeaderTextContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Repetition</Text>
                        </View>
                        <View style={modalStyles.instrutionCreationHeaderTextContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Stitch Type</Text>
                        </View>
                      </View>
                      <View style={modalStyles.instrutionCreationContent}>
                      {instSteps.map((step, index) => (
                        <View style={modalStyles.instructionInputContainer} key={step.id}>
                          <View style={modalStyles.modalTextInputInstructionContainer}>
                            <DeleteButton 
                              onPress={() => removeInstStep(index)}
                              extraStyle={{minHeight: 30, minWidth: 30}}
                              />
                            <CommonTextInput 
                                extraStyle={modalStyles.stepRepetitionTextInput} 
                                value={step.rep}
                                onChangeText={(text) => {handleNewStepChange(index, 'rep', {rep: text})}}
                                placeholder={"repetitions"} 
                                inputType="numeric"
                                maxLength={4}
                              />
                          </View>
                          <View style={modalStyles.instructionDropdown}>
                            <DropdownComponent
                            key={step.id}
                              callback={(item) => handleNewStepChange(index, 'stitch', item)}
                              currentSelection={step.stitch}
                              dataType={"stitch"}
                            />
                          </View>
                        </View>
                      ))}
                      <CommonButton
                        label={"ADD INSTRUCTION STEP"}
                        onPress={() => addNewStep()}
                        buttonStyle={[modalStyles.instructionCreationAddButton, {marginTop: instSteps.length == 0 ? 10 : 0}]}
                      />
                      </View>
                  </View>
                  
                  <View style={modalStyles.modalExtraInputsContainer}>
                      <View style={modalStyles.modalExtraInputsTopRow}>
                          <View style={modalStyles.modalTextInputContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Repetitions: </Text>
                            <CommonTextInput 
                                value={repetitionsNum}
                                onChangeText={setRepetitionsNum}
                                placeholder={"ex: 3"} 
                                inputType="numeric"
                                maxLength={4}
                            />
                          </View>
                          <View style={modalStyles.modalTextInputContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Yarn Color: </Text>
                            <CommonTextInput 
                                value={colorText}
                                onChangeText={setColorText}
                                placeholder={"ex: blue"} 
                                maxLength={100}
                            />
                          </View>
                      </View>
                      <View style={modalStyles.modalSpecialInstructionTextInputContainer}>
                          <Text style={modalStyles.modalSubheaderText}>Special Instructions: </Text>
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
                  </View>
              </View>
            </ScrollView>
        </CustomModal>
    )
};

const modalStyles = StyleSheet.create({
      modalBody: {
      },
      modalBodyContainerStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalSubheaderPreviewInstruction: {
        alignItems: 'center',
        paddingBottom: 10,
      },
      modalPreviewInstructionText: {
        textAlign: 'center',
      },
      instructionCreationContainer: {
        alignItems: 'center',
        margin: 10,
        borderWidth: 2,
      },
      instructionCreationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        borderBottomWidth: 1,
      },
      instrutionCreationHeaderTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
      modalSubheaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
      instrutionCreationContent: {
        alignSelf: 'stretch',
        alignItems: 'center',
      },
      instructionInputContainer:{
        flexDirection: 'row',
        gap: 8,
        margin: 10,
      },
      modalTextInputInstructionContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
      },
      stepRepetitionTextInput:{
        flex: 1,
        width: '100%',
      },
      instructionDropdown: {
        flex: 1,
      },
      instructionCreationAddButton: {
        flex: 'none',
        marginBottom: 10,
        padding: 5,
      },
      modalExtraInputsContainer: {
        margin: 10,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        gap: 10,
      },
      modalExtraInputsTopRow: {
        width: '100%',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-evenly',
      },
      modalTextInputContainer:{
        flex: 1,
        alignItems: 'center',
        gap: 5,
      },
      modalSpecialInstructionTextInputContainer:{
        alignItems: 'center',
        gap: 5,
      },
  });