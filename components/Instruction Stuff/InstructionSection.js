import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
//
// TODO: 
// Overhaul modal to build instructions, rather than allow any text. Also add additional instruction input
export const InstructionSection = ( {title, startNum, endNum, deleteInstructionSectionFunc}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [rows, setRows] = useState([]); //contains instruction rows
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [instructionText, setInstructionText] = useState("");
  const [repetitionsNum, setRepetitionsNum] = useState("");
  const [colorText, setColorText] = useState("");

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
    setInstructionText("");
    setRepetitionsNum("");
    setColorText("");
    setIsModalVisible(false);
  }

  const onSubmitModal = () =>{
    addInstRow(instructionText, repetitionsNum ? repetitionsNum : 1, colorText);
    onCloseModal();
  }

  return (
    <View style={sectionStyles.container}>
      <View style={[sectionStyles.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
        <DeleteButton deleteFunc={deleteInstructionSectionFunc}/>
        <TouchableOpacity onPress={toggleSection} style={sectionStyles.headerTextAndToggleContainer}>
          <View style={sectionStyles.headerTextContainer}>
            <Text>{title + ": " + startNum + "-" + endNum}</Text>
          </View>
          <View style={sectionStyles.toggleIconContainer}>
            <Text>{isCollapsed ? '^' : '-'}</Text>
          </View>
        </TouchableOpacity>
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
      
      {/* 
        Modal for adding instructions
        Prompts user for instruction, number of repetitions and yarn color  
      */}
      <CustomModal
        isVisible={isModalVisible}
        headerText={"Add New Instruction:"}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
      >
        <View style={sectionStyles.modalTextInputContainer}> {/* Input for instruction */}
          <Text>Instruction: </Text>
          <TextInput 
            style={sectionStyles.modalTextInput}
            value={instructionText}
            onChangeText={setInstructionText}
            placeholder={"ex: [1 inc, 2 dec]"} 
            placeholderTextColor={"lightgrey"}
          />
        </View>
        <View style={sectionStyles.modalTextInputContainer}> {/* Input for reptitions */}
          <Text>Repetitions: </Text>
          <TextInput 
            style={sectionStyles.modalTextInput} 
            value={repetitionsNum}
            onChangeText={setRepetitionsNum}
            placeholder={"ex: 3"} 
            placeholderTextColor={"lightgrey"}
            keyboardType="numeric"
          />
        </View>
        <View style={sectionStyles.modalTextInputContainer}> {/* Input for yarn color */}
          <Text>Yarn Color: </Text>
          <TextInput 
            style={sectionStyles.modalTextInput}
            value={colorText}
            onChangeText={setColorText}
            placeholder={"ex: blue"} 
            placeholderTextColor={"lightgrey"}
          />
        </View>
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