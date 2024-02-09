import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CustomModal } from "../Common Models/CustomModal"
import { DeleteButton } from "../Common Models/DeleteButton";
import { DropdownComponent } from "../Common Models/Dropdown"

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
export const AddInstructionModal = ({onCloseModal, isModalVisible, instructionRows, setInstructionRows}) => {
    const [repetitionsNum, setRepetitionsNum] = useState("");
    const [colorText, setColorText] = useState("");
    const [instSteps, setInstSteps] = useState([{rep: "", stitch: ""}]);
    const [instPreview, setInstPreview] = useState("[]");
    const [specialInst, setSpecialInst] = useState("");
    const [specialInstHeight, setSpecialInstHeight] = useState(0);

    // adds a new step to the instruction creator
    const addNewStep = () => {
        setInstSteps([...instSteps, {rep: "", stitch: ""}])
    };

    // removes a given step on the instruction creator
    const removeInstStep = (index) => {
        const newSteps = instSteps.filter((_, i) => i !== index);
        setInstSteps(newSteps);
    };

    // clears text boxes and calls close callback function
    const onCloseInstructionModal = () => {
        setInstSteps([{rep: "", stitch: ""}]);
        setInstPreview("");
        setRepetitionsNum("");
        setColorText("");
        setSpecialInst("");
        setSpecialInstHeight(0);

        onCloseModal();
    };

    // adds instruction row to instruction row array, calls close function
    const onSubmitInstructionModal = () =>{
        addInstRow(instPreview, repetitionsNum ? repetitionsNum : 1, colorText, specialInst);
        onCloseInstructionModal();
    }

    //adds instruction row based on input of instruction, repetitions, and yarn color to instruction row array
    const addInstRow = (inst, rep, color, specialInst) => {
        const newRow = { instruction: inst, repetition: Number(rep), color: color, specialInst: specialInst};
        setInstructionRows([...instructionRows, newRow]);
    };

    // updates instruction steps array with new instruction when changed
    const handleNewStepChange = (index, field, newText) => {
        const newInstSteps = instSteps.map((step, idx) => {
        if (idx === index) {
            return {...step, [field]: newText};
        }
        return step;
        });
        setInstSteps(newInstSteps);
    };

    // updates the instruction preview with all existing instructions
    const updateInstrucitonPreview = () => {
        let preview = "[";

        if(instSteps.length > 0){
          instSteps.forEach((step) => {
            preview += " " + step.rep + " " + step.stitch + ",";
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
            headerText={"Add New Instruction:"}
            onClose={onCloseInstructionModal}
            onSubmit={onSubmitInstructionModal}
            height={'80%'}
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
                        <View style={modalStyles.instructionInputContainer} key={index}>
                          <View style={modalStyles.modalTextInputInstructionContainer}>
                            <DeleteButton
                                deleteFunc={() => removeInstStep(index)}
                            />
                            <TextInput 
                                  style={modalStyles.modalTextInputInstruction} 
                                  value={step.rep}
                                  onChangeText={(text) => handleNewStepChange(index, 'rep', text)}
                                  placeholder={"repetitions"} 
                                  placeholderTextColor={"lightgrey"}
                                  inputMode="numeric"
                              />
                          </View>
                          <View style={modalStyles.instructionDropdown}>
                            <DropdownComponent
                              callback={(text) => handleNewStepChange(index, 'stitch', text)}
                            />
                          </View>
                        </View>
                      ))}
                      <Pressable 
                          style={[modalStyles.instructionCreationAddButton, {marginTop: instSteps.length == 0 ? 10 : 0}]}
                          onPress={() => addNewStep()}
                      >
                          <Text style={modalStyles.instructionCreationAddButtonText}>Add Instruction</Text>
                      </Pressable>
                      </View>
                  </View>
                  
                  <View style={modalStyles.modalExtraInputsContainer}>
                      <View style={modalStyles.modalExtraInputsTopRow}>
                          <View style={modalStyles.modalTextInputContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Repetitions: </Text>
                            <TextInput 
                                style={modalStyles.modalTextInput} 
                                value={repetitionsNum}
                                onChangeText={setRepetitionsNum}
                                placeholder={"ex: 3"} 
                                placeholderTextColor={"lightgrey"}
                                keyboardType="numeric"
                            />
                          </View>
                          <View style={modalStyles.modalTextInputContainer}>
                            <Text style={modalStyles.modalSubheaderText}>Yarn Color: </Text>
                            <TextInput 
                                style={modalStyles.modalTextInput}
                                value={colorText}
                                onChangeText={setColorText}
                                placeholder={"ex: blue"} 
                                placeholderTextColor={"lightgrey"}
                            />
                          </View>
                      </View>
                      <View style={modalStyles.modalSpecialInstructionTextInputContainer}>
                          <Text style={modalStyles.modalSubheaderText}>Special Instructions: </Text>
                          <TextInput 
                          style={[modalStyles.modalSpecialInstructionTextInput, {minHeight: Math.max(60, specialInstHeight)}]}
                          value={specialInst}
                          onChangeText={setSpecialInst}
                          placeholder={"..."} 
                          placeholderTextColor={"lightgrey"}
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
        gap: 5,
        margin: 10,
      },
      modalTextInputInstructionContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
      },
      modalTextInputInstruction:{
        borderWidth: 1,
        borderRadius: 2,
        textAlign: 'center',
        minHeight: 30,
        width: '100%',
      },
      instructionDropdown: {
        flex: 1,
      },
      instructionCreationAddButton: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: 'lightblue'
      },
      instructionCreationAddButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
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
      modalTextInput:{
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 2,
        textAlign: 'center',
        minHeight: 30,
      },
      modalSpecialInstructionTextInputContainer:{
        alignItems: 'center',
        gap: 5,
      },
      modalSpecialInstructionTextInput:{
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 2,
        textAlign: 'center',
      },
  });