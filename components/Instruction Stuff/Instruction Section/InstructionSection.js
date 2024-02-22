import React, { useState } from "react";
import { View, Button, Text, Pressable, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "../Instruction Row/InstructionRow";
import { AddInstructionModal } from "../Instruction Row/AddInstructionModal";
import { AddEditInstructionSectionModal } from "./AddEditInstructionSectionModal";
import { EditOrInfoButton } from "../../Common Models/EditOrInfoButton";

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
export const InstructionSection = ( {isViewMode, title, startNum, endNum, editFunc, deleteFunc}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInstructionRowModalVisible, setIsInstructionRowModalVisible] = useState(false);
  const [isInstructionSectionEditModalVisible, setIsInstructionSectionEditModalVisible] = useState(false);
  const [instructionRows, setInstructionRows] = useState([]); //contains instruction rows

  //toggles collapse on instruction section
  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  // removes given instruction row
  // passed to the instruction row so that internal delete button deletes itself
  const removeInstRow = (index) => {
    const newRows = instructionRows.filter((_, i) => i !== index);
    setInstructionRows(newRows);
  };

  // closes the instruction row add modal
  // called after the closing code of the modal is ran
  const onCloseInstructionRowAddModal = () =>{
    setIsInstructionRowModalVisible(false);
  }

  // closes the instruction section edit modal
  // called after the closing code of the modal is ran
  const onCloseInstructionSectionEditModal = () => {
    setIsInstructionSectionEditModalVisible(false);
  };

  return (
    <View style={sectionStyles.container}>
      <View style={[sectionStyles.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
        <EditOrInfoButton 
          isViewMode={isViewMode}
          onEditPress={() => setIsInstructionSectionEditModalVisible(true)}
        />
        <Pressable onPress={toggleSection} style={sectionStyles.headerTextAndToggleContainer}>
          <View style={sectionStyles.headerTextContainer}>
            <Text style={sectionStyles.headerText}>{title + ": " + startNum + "-" + endNum}</Text>
          </View>
          <View style={sectionStyles.toggleIconContainer}>
            <Text>{isCollapsed ? '^' : '-'}</Text>
          </View>
        </Pressable>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {instructionRows.map((row, index) => (
          <View key={index}>
            <InstructionRow
              instruction={row.instruction}
              repetition={row.repetition}
              color={row.color}
              specialInstructions={row.specialInst}
              deleteInstructionRowFunc={() => removeInstRow(index)}
            />
          </View>
        ))}
        <View style={{borderTopWidth: instructionRows.length == 0 ? 0: 2}}>
          <Button title="Add Instruction" onPress={() => setIsInstructionRowModalVisible(true)} />
        </View>
      </Collapsible>

      <AddEditInstructionSectionModal
        modalMode={"edit"}
        onCloseModal={onCloseInstructionSectionEditModal}
        isModalVisible={isInstructionSectionEditModalVisible}
        editFunc={editFunc}
        deleteFunc={deleteFunc}
        currentStartNum={startNum}
        currentEndNum={endNum}
      />

      <AddInstructionModal
        onCloseModal={onCloseInstructionRowAddModal}
        isModalVisible={isInstructionRowModalVisible}
        instructionRows={instructionRows}
        setInstructionRows={setInstructionRows}
      />
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
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    toggleIconContainer: {
      width: 60,
      borderLeftWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
});