import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "../Instruction Row/InstructionRow";
import { AddEditInstructionModal } from "../Instruction Row/AddEditInstructionModal";
import { AddEditInstructionSectionModal } from "./AddEditInstructionSectionModal";
import { EditOrInfoButton } from "../../Common Models/Buttons/EditOrInfoButton";
import { CommonButton } from "../../Common Models/Buttons/CommonButton";
import { useSelector, useDispatch } from 'react-redux';
import { addInstructionRow, editInstructionRow, deleteInstructionRow } from '../../../redux/slices/InstructionRowSlice';

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

export const InstructionSection = ({ isViewMode, sectionInfo, editFunc, deleteFunc, backgroundColor, previousRoundNum }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInstructionRowAddModalVisible, setIsInstructionRowModalVisible] = useState(false);
  const [isInstructionSectionEditModalVisible, setIsInstructionSectionEditModalVisible] = useState(false);
  const instructionRows = useSelector(state => state.instructionRow.instructionRows);
  const dispatch = useDispatch();

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddInstructionRow = (newRow) => {
    dispatch(addInstructionRow(newRow));
  };

  const handleEditInstructionRow = (updatedRow, index) => {
    dispatch(editInstructionRow({updatedRow, index}));
  };

  const handleRemoveInstructionRow = (index) => {
    dispatch(deleteInstructionRow(index));
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
              {sectionInfo.title + ": " + sectionInfo.startNum + (sectionInfo.endNum? "-" + sectionInfo.endNum : "")}
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
        <View style={[sectionStyles.instructionSectionContent, {padding: instructionRows.length == 0? 0: 15}]}>
          {instructionRows.map((instRow, index) => (
            <View key={index}>
              <InstructionRow
                isViewMode={isViewMode}
                instructionInfo={instRow}
                deleteFunc={() => handleRemoveInstructionRow(index)}
                editFunc={(...args) => handleEditInstructionRow(...args, index)}
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
        currentInfo={sectionInfo}
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