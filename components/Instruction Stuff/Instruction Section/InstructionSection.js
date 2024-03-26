import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "../Instruction Row/InstructionRow";
import { AddEditInstructionModal } from "../Instruction Row/AddEditInstructionModal";
import { AddEditInstructionSectionModal } from "./AddEditInstructionSectionModal";
import { EditOrInfoButton } from "../../Common Models/Buttons/EditOrInfoButton";
import { CommonButton } from "../../Common Models/Buttons/CommonButton";

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
export const InstructionSection = ( {isViewMode, title, startNum, endNum, editFunc, deleteFunc, backgroundColor, preivousRoundNum}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInstructionRowAddModalVisible, setIsInstructionRowModalVisible] = useState(false);
  const [isInstructionSectionEditModalVisible, setIsInstructionSectionEditModalVisible] = useState(false);
  const [instructionRows, setInstructionRows] = useState([]); //instruction rows contain instruction, repetition, color, specialInstr

  //toggles collapse on instruction section
  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  //adds instruction row based on input of instruction, repetitions, and yarn color to instruction row array
  const addInstructionRow = (inst, instSteps, rep, color, specialInst) => {
    const newRow = { instruction: inst, instructionSteps: instSteps, repetition: Number(rep), color: color, specialInstruction: specialInst};
    setInstructionRows([...instructionRows, newRow]);
  };

  const editInstructionRow = (newInst, newInstSteps, newRep, newColor, newSpecialInst, index) => {
    let newRows = instructionRows.map((instruction, idx) => {
      if (idx === index) {
        return { ...instruction, instruction: newInst, instructionSteps: newInstSteps, repetition: Number(newRep), color: newColor, specialInstruction: newSpecialInst };
      }

      return instruction;
    });
  
    setInstructionRows(newRows);
  }

  // removes given instruction row
  // passed to the instruction row so that internal delete button deletes itself
  const removeInstructionRow = (index) => {
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
      <View style={[sectionStyles.header, 
                    { 
                      borderBottomWidth: isCollapsed ? 1 : 2,
                      backgroundColor: backgroundColor,
                    }]}>
        <EditOrInfoButton 
          isViewMode={isViewMode}
          onEditPress={() => setIsInstructionSectionEditModalVisible(true)}
          extraStyle={{borderWidth: 0,}}
        />
        <Pressable onPress={toggleSection} style={sectionStyles.headerTextAndToggleContainer}>
          <View style={sectionStyles.headerTextContainer}>
            <Text style={sectionStyles.headerText}>{title + ": " + startNum + (endNum? "-" + endNum : "")}</Text>
          </View>
          <View style={sectionStyles.toggleIconContainer}>
            <Text>{isCollapsed ? '^' : '-'}</Text>
          </View>
        </Pressable>
      </View>
      <Collapsible 
        collapsed={isCollapsed}
        style={{backgroundColor: backgroundColor + '80'}}
      >
        <View style={[sectionStyles.instructionSectionContent, {padding: instructionRows.length == 0? 0: 15}]}>
          {instructionRows.map((instRow, index) => (
            <View key={index}>
              <InstructionRow
                isViewMode={isViewMode}
                instructionInfo={instRow}
                deleteFunc={() => removeInstructionRow(index)}
                editFunc={(inst, instSteps, rep, color, specialInst) => editInstructionRow(inst, instSteps, rep, color, specialInst, index)}
              />
            </View>
          ))}
        </View>
        <View style={[sectionStyles.addInstructionButtonContainer, 
                      {
                        borderTopWidth: instructionRows.length == 0 ? 0: 2,
                        backgroundColor: backgroundColor,
                      }
                      ]}>
          <View style={{flex: 1}}/>
          <View style={{flex: 3}}>
          {!isViewMode && 
            <CommonButton
              label={"ADD INSTRUCTION"}
              onPress={() => setIsInstructionRowModalVisible(true)}
            />
          }
          </View>
          <View style={{flex: 1}}/>
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
        previousRoundNum={preivousRoundNum}
      />

      <AddEditInstructionModal
        modalMode={"add"}
        onCloseModal={onCloseInstructionRowAddModal}
        isModalVisible={isInstructionRowAddModalVisible}
        addFunc={addInstructionRow}
      />
    </View>
  );
};

const sectionStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    backgroundColor: 'white',
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
      borderLeftWidth: 2,
      borderRightWidth: 2,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    toggleIconContainer: {
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    instructionSectionContent: {
      gap: 15,
    },
    addInstructionButtonContainer: {
      flexDirection: 'row',
      padding: 5,
      height: 50,
      backgroundColor: 'orange',
    },
});