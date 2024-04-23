import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "../Instruction Row/InstructionRow";
import { AddEditInstructionModal } from "../Instruction Row/AddEditInstructionModal";
import { AddEditInstructionSectionModal } from "./AddEditInstructionSectionModal";
import { EditOrInfoButton } from "../../Common Models/Buttons/EditOrInfoButton";
import { CommonButton } from "../../Common Models/Buttons/CommonButton";
import { useSelector, useDispatch } from 'react-redux';
import { addInstruction, editInstruction, deleteInstruction } from '../../../redux/slices/PatternSlice';

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

export const InstructionSection = ({ isViewMode, instructionSectionInfo, editFunc, deleteFunc, backgroundColor, previousRoundNum }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInstructionRowAddModalVisible, setIsInstructionRowModalVisible] = useState(false);
  const [isInstructionSectionEditModalVisible, setIsInstructionSectionEditModalVisible] = useState(false);
  const {instructionSet, instructionIds} = useSelector(state => state.pattern.instructionData);
  const relevantInstructionIds = instructionSectionInfo.instructions;
  const dispatch = useDispatch();

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddInstructionRow = (instruction) => {
    dispatch(addInstruction({instructionSectionId: instructionSectionInfo.id, instruction}));
  };

  const handleEditInstructionRow = (id, updates) => {
    dispatch(editInstruction({instructionId: id, updates}));
  };

  const handleRemoveInstructionRow = (id) => {
    dispatch(deleteInstruction({instructionSectionId: instructionSectionInfo.id, instructionId: id}));
  };

  const onCloseInstructionRowAddModal = () => {
    setIsInstructionRowModalVisible(false);
  };

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
          isInfoDisabled={true}
        />
        <Pressable onPress={toggleSection} style={sectionStyles.headerTextAndToggleContainer}>
          <View style={sectionStyles.headerTextContainer}>
            <Text style={sectionStyles.headerText}>
              {instructionSectionInfo.title + ": " + instructionSectionInfo.startNum + (instructionSectionInfo.endNum? "-" + instructionSectionInfo.endNum : "")}
            </Text>
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
        <View style={[sectionStyles.instructionSectionContent, {padding: relevantInstructionIds.length == 0? 0: 15}]}>
          {relevantInstructionIds.map((id, index) => (
            <View key={id}>
              <InstructionRow
                isViewMode={isViewMode}
                instructionInfo={instructionSet[id]}
                deleteFunc={() => handleRemoveInstructionRow(id)}
                editFunc={(updates) => handleEditInstructionRow(id, updates)}
              />
            </View>
          ))}
        </View>
        <View style={[sectionStyles.addInstructionButtonContainer, 
                      {
                        borderTopWidth: relevantInstructionIds.length == 0 ? 0: 2,
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
        currentInfo={instructionSectionInfo}
        previousRoundNum={previousRoundNum}
      />

      <AddEditInstructionModal
        modalMode={"add"}
        onCloseModal={onCloseInstructionRowAddModal}
        isModalVisible={isInstructionRowAddModalVisible}
        addFunc={handleAddInstructionRow}
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