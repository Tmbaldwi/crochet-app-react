import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { EditOrInfoButton } from "../../Common Models/Buttons/EditOrInfoButton";
import { CustomModal } from "../../Common Models/Modals/CustomModal";
import { AddEditInstructionModal } from "./AddEditInstructionModal";
import { SpecialInstructionModal } from "../../Common Models/Modals/SpecialInstructionModal";

// Instruction Row
//
// Description:
// Contains the individual instructions, nested inside of the instruction section and then a pattern section
// Contains the amount of repetitions required, the yarn color, and a more info button
// User can delete the instruction
//
// Usage:
// Must be passed a function to delete and edit itself
export const InstructionRow = ({ isViewMode, instructionInfo, editFunc, deleteFunc }) => {
  const [isSpecialInstructionModalVisible, setIsSpecialInstructionModalVisible] = useState(false);
  const [isInstructionEditModalVisible, setIsInstructionEditModalVisible] = useState(false);
  const isInfoDisabled = instructionInfo.specialInstruction.trim().length == 0;

  if(isInfoDisabled){
    instructionInfo.specialInstructions = "";
  }

  // Called after special instruction modal closing tasks are performed
  const onCloseSpecialInstructionModal = () =>{
    setIsSpecialInstructionModalVisible(false);
  }

  // Called after instruction edit modal closing tasks are performed
  const onCloseInstructionEditModal = () =>{
    setIsInstructionEditModalVisible(false);
  }

  return (
    <View>
      <View style={rowStyles.rowContainer}>
        <View style={rowStyles.topContainer}>
          <View style={rowStyles.topContainerInstruction}>
            <InstructionSubBox 
              label={instructionInfo.instruction}
            />
          </View>
        </View>
        <View style={rowStyles.bottomContainer}>
          <EditOrInfoButton
              isViewMode={isViewMode}
              onEditPress={() => setIsInstructionEditModalVisible(true)}
              onInfoPress={() => setIsSpecialInstructionModalVisible(true)}
              extraStyle={rowStyles.infoEditPressable}
              isInfoDisabled={isInfoDisabled}
            /> 
          <InstructionSubBox 
            label={instructionInfo.color} 
            extraStyle={rowStyles.instructionColorBox}
          />
          <InstructionSubBox 
            label={"x" + instructionInfo.repetition}  
          />
        </View>
      </View>

      <AddEditInstructionModal
        modalMode={"edit"}
        onCloseModal={onCloseInstructionEditModal}
        isModalVisible={isInstructionEditModalVisible}
        editFunc={editFunc}
        deleteFunc={deleteFunc}
        currentInfo={instructionInfo}
      />

      <SpecialInstructionModal
        isVisible={isSpecialInstructionModalVisible}
        onClose={onCloseSpecialInstructionModal}
        specialInstruction={instructionInfo.specialInstruction}
      />
    </View>
  );
};
const rowStyles = StyleSheet.create({
  rowContainer: {
    borderWidth: 2,
  },
  topContainer: {
    minHeight: 60,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  topContainerInstruction: {
    flex: 1,
    alignSelf: 'stretch',
  },
  bottomContainer: {
    height: 60,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoEditPressable: {
    flex: 1,
    height: '100%',
    aspectRatio: 'auto',
    borderWidth: 0,
  },
  instructionColorBox: {
    flex: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  modalText: {
    textAlign: 'center',
  },
});

// Instructions subboxes
// Blocks of information used for the instruction rows
// Allows for custom text, and flex for sizing
export const InstructionSubBox = ({ label, extraStyle }) => {
  return (
    <View style={[subBoxStyles.subBoxContainer, extraStyle]}>
      <Text style={subBoxStyles.subBoxText}>
        {label}
      </Text>
    </View>
  );
};

const subBoxStyles = StyleSheet.create({
  subBoxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  subBoxText:{
    textAlign: 'center',
    fontWeight: 'bold',
  }
});