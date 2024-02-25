import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { EditOrInfoButton } from "../../Common Models/EditOrInfoButton";
import { CustomModal } from "../../Common Models/CustomModal";
import { AddEditInstructionModal } from "./AddEditInstructionModal";

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
  const isInfoDisabled = instructionInfo.specialInstructions.trim().length > 0;

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
            <InstructionSubBox text={instructionInfo.instruction} />
          </View>
        </View>
        <View style={rowStyles.bottomContainer}>
          <InstructionSubBox text={"x" + instructionInfo.repetition} />
          <InstructionSubBox text={instructionInfo.color} flex={2}/>
          <EditOrInfoButton
            isViewMode={isViewMode}
            onEditPress={() => setIsInstructionEditModalVisible(true)}
            onInfoPress={() => setIsSpecialInstructionModalVisible(true)}
            extraStyle={rowStyles.infoEditPressable}
            isInfoDisabled={isInfoDisabled}
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

      <CustomModal
        isVisible={isSpecialInstructionModalVisible}
        headerText={"Special Instructions:"}
        onClose={onCloseSpecialInstructionModal}
      >
        <ScrollView>
          <Text style={rowStyles.modalText}>
              {instructionInfo.specialInstructions}
          </Text>
        </ScrollView>
      </CustomModal>
    </View>
  );
};
const rowStyles = StyleSheet.create({
  rowContainer: {
    margin: 5,
    borderWidth: 2,
  },
  topContainer: {
    minHeight: 60,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    aspectRatio: 'none',
  },
  modalText: {
    textAlign: 'center',
  },
});

// Instructions subboxes
// Blocks of information used for the instruction rows
// Allows for custom text, and flex for sizing
export const InstructionSubBox = ({ text, flex }) => {
  return (
    <View style={[subBoxStyles.subBoxContainer, {flex: flex ? flex : 1}]}>
      <Text style={subBoxStyles.subBoxText}>
        {text}
      </Text>
    </View>
  );
};

const subBoxStyles = StyleSheet.create({
  subBoxContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  subBoxText:{
    textAlign: 'center',
    fontWeight: 'bold',
  }
});