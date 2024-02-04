import React, { useState, useEffect, useRef } from "react";
import { View, Button, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "./InstructionRow";
import { CustomModal } from "../Common Models/CustomModal"
import { DeleteButton } from "../Common Models/DeleteButton";

// Instruction Section
//
// Descripton:
// Contains groups of individual instructions that may make up a round/row
// User can add instructions, when doing so they open a modal to input the instruction, repetitions, and yarn color
// User can collapse the instruction section
// User can delete the instruction section, will also delete nested instructions
// 
// Usage:
// Must pass the title, the instruction section's round/row range (ie. Round 1-2), and a function to delete itself from the list
export const InstructionSection = ( {title, startNum, endNum, deleteInstructionSectionFunc}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rows, setRows] = useState([]); //contains instruction rows
  const [repetitionsNum, setRepetitionsNum] = useState("");
  const [colorText, setColorText] = useState("");
  const [instSteps, setInstSteps] = useState([{rep: "", stitch: ""}]);
  const [instPreview, setInstPreview] = useState("[]");
  const [specialInst, setSpecialInst] = useState("");
  const [specialInstHeight, setSpecialInstHeight] = useState(0);
  const extraInputScrollViewRef = useRef();
  const instructionCreationScrollViewRef = useRef();

  //toggles collapse on instruction section
  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  //adds instruction row based on input of instruction, repetitions, and yarn color
  const addInstRow = (inst, rep, color) => {
    const newRow = { instruction: inst, repetition: Number(rep), color: color };
    setRows([...rows, newRow]);
  };

  // removes given instruction row
  // passed to the instruction row so that internal delete button deletes itself
  const removeInstRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const onCloseModal = () =>{
    setInstSteps([{rep: "", stitch: ""}]);
    setInstPreview("");
    setRepetitionsNum("");
    setColorText("");
    setSpecialInst("");
    setSpecialInstHeight(0);
    setIsModalVisible(false);
  }

  const onSubmitModal = () =>{
    addInstRow(instPreview, repetitionsNum ? repetitionsNum : 1, colorText);
    onCloseModal();
  }

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

    instSteps.forEach((step) => {
        preview += " " + step.rep + " " + step.stitch + ",";
    });

    setInstPreview(preview.substring(0, preview.length-1) + " ]");
  };

  useEffect(() => {
    updateInstrucitonPreview();
  }, [instSteps]);


  const addNewStep = () => {
    setInstSteps([...instSteps, {rep: "", stitch: ""}])
  };

  return (
    <View style={sectionStyles.container}>
      <View style={[sectionStyles.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
        <DeleteButton deleteFunc={deleteInstructionSectionFunc}/>
        <Pressable onPress={toggleSection} style={sectionStyles.headerTextAndToggleContainer}>
          <View style={sectionStyles.headerTextContainer}>
            <Text>{title + ": " + startNum + "-" + endNum}</Text>
          </View>
          <View style={sectionStyles.toggleIconContainer}>
            <Text>{isCollapsed ? '^' : '-'}</Text>
          </View>
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {rows.map((row, index) => (
          <View key={index}>
            <InstructionRow
              instruction={row.instruction}
              repetition={row.repetition}
              color={row.color}
              deleteInstructionRowFunc={() => removeInstRow(index)}
            />
          </View>
        ))}
        <View style={{borderTopWidth: rows.length == 0 ? 0: 2}}>
          <Button title="Add Instruction" onPress={() => setIsModalVisible(true)} />
        </View>
      </Collapsible>
      
      <CustomModal
        isVisible={isModalVisible}
        headerText={"Add New Instruction:"}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
        height={'80%'}
      >
        <ScrollView 
          style={sectionStyles.modalBody} 
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{      justifyContent: 'flex-end',
      alignItems: 'center',}}>
          <Text style={{fontWeight: 'bold'}}>Preview Instruction:</Text>
          <Text>{instPreview}</Text>
          <View style={sectionStyles.instructionCreationContainer}>
            <View style={sectionStyles.instructionCreationHeader}>
              <View style={sectionStyles.instrutionCreationHeaderTextContainer}>
                <Text style={sectionStyles.modalSubheaderText}>Repetition</Text>
              </View>
              <View style={sectionStyles.instrutionCreationHeaderTextContainer}>
                <Text style={sectionStyles.modalSubheaderText}>Stitch Type</Text>
              </View>
            </View>
            <ScrollView 
              contentContainerStyle={sectionStyles.instrutionCreationContentContainerStyle} 
              style={sectionStyles.instrutionCreationContent}
              ref={instructionCreationScrollViewRef}
              onContentSizeChange={() => instructionCreationScrollViewRef.current.scrollToEnd({ animated: true})}
            >
              {instSteps.map((step, index) => (
                <View style={sectionStyles.instructionInputContainer} key={index}>
                  <TextInput 
                    style={sectionStyles.modalTextInputInstruction} 
                    value={step.rep}
                    onChangeText={(text) => handleNewStepChange(index, 'rep', text)}
                    placeholder={"repetitions"} 
                    placeholderTextColor={"lightgrey"}
                    inputMode="numeric"
                  />
                  <TextInput 
                    style={sectionStyles.modalTextInputInstruction} 
                    value={step.stitch}
                    onChangeText={(text) => handleNewStepChange(index, 'stitch', text)}
                    placeholder={"stitch"} 
                    placeholderTextColor={"lightgrey"}
                  />
                </View>
              ))}
              <Pressable 
                style={sectionStyles.instructionCreationAddButton}
                onPress={() => addNewStep()}
              >
                <Text>Add Instruction</Text>
              </Pressable>
            </ScrollView>
          </View>
          
          <ScrollView 
            style={sectionStyles.modalExtraInputsContainer}
            contentContainerStyle={sectionStyles.modalExtraInputsContainerContentContainerStyle}
            ref={extraInputScrollViewRef}
            onContentSizeChange={() => extraInputScrollViewRef.current.scrollToEnd({ animated: true})}
          >
              <View style={sectionStyles.modalExtraInputsTopRow}>
                <View style={sectionStyles.modalTextInputContainer}>
                  <Text style={sectionStyles.modalSubheaderText}>Repetitions: </Text>
                  <TextInput 
                    style={sectionStyles.modalTextInput} 
                    value={repetitionsNum}
                    onChangeText={setRepetitionsNum}
                    placeholder={"ex: 3"} 
                    placeholderTextColor={"lightgrey"}
                    keyboardType="numeric"
                  />
                </View>
                <View style={sectionStyles.modalTextInputContainer}>
                  <Text style={sectionStyles.modalSubheaderText}>Yarn Color: </Text>
                  <TextInput 
                    style={sectionStyles.modalTextInput}
                    value={colorText}
                    onChangeText={setColorText}
                    placeholder={"ex: blue"} 
                    placeholderTextColor={"lightgrey"}
                  />
                </View>
              </View>
              <View style={sectionStyles.modalSpecialInstructionTextInputContainer}>
                <Text style={sectionStyles.modalSubheaderText}>Special Instructions: </Text>
                <TextInput 
                  style={[sectionStyles.modalSpecialInstructionTextInput, {minHeight: Math.max(60, specialInstHeight)}]}
                  value={specialInst}
                  onChangeText={setSpecialInst}
                  placeholder={"..."} 
                  placeholderTextColor={"lightgrey"}
                  multiline={true}
                  onContentSizeChange={(event) => setSpecialInstHeight(event.nativeEvent.contentSize.height)
                  }
                  scrollEnabled={false}
                />
              </View>
          </ScrollView>
        </ScrollView>
      </CustomModal>
    </View>
  );
};

const sectionStyles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 2,
  },
  header: {
    height: 60,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextAndToggleContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
  },
    headerTextContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    toggleIconContainer: {
      width: 60,
      borderLeftWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    modalBody: {
      flex: 1,

    },
    instructionCreationContainer: {
      alignItems: 'center',
      flex: 2,
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
      fontWeight: 'bold'
    },
    instrutionCreationContent: {
      flex: 1,
      alignSelf: 'stretch',
    },
    instrutionCreationContentContainerStyle: {
      alignItems: 'center',
    },
    instructionInputContainer:{
      flexDirection: 'row',
      gap: 5,
      margin: 10,
      justifyContent: 'space-evenly',
    },
    modalTextInputInstruction:{
      flex: 1,
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
      minHeight: 30,
    },
    instructionCreationAddButton: {
      marginBottom: 10,
      borderWidth: 1,
    },
    modalExtraInputsContainer: {
      flex: 1,
      margin: 10,
      borderWidth: 1,
      padding: 10,
    },
    modalExtraInputsContainerContentContainerStyle: {
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
      flex: 1,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
      minHeight: 30,
    },
    modalSpecialInstructionTextInputContainer:{
      flex: 1,
      alignItems: 'center',
      gap: 5,
    },
    modalSpecialInstructionTextInput:{
      flex: 1,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
    },
});