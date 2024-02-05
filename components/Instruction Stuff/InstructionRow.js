import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { DeleteButton } from "../Common Models/DeleteButton";
import { CustomModal } from "../Common Models/CustomModal";

// Instruction Row
//
// Description:
// Contains the individual instructions, nested inside of the instruction section and then a pattern section
// Contains the amount of repetitions required, the yarn color, and a more info button
// User can delete the instruction
//
// Usage:
// MUST be passed a function to delete itself from a list
export const InstructionRow = ({ instruction, repetition, color, specialInstructions, deleteInstructionRowFunc }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let isInfoDisabled = !(specialInstructions.trim() && specialInstructions.trim().length > 0);

  if(isInfoDisabled){
    specialInstructions = "";
  }

  return (
    <View>
      <View style={rowStyles.rowContainer}>
        <View style={rowStyles.topContainer}>
          <DeleteButton deleteFunc={deleteInstructionRowFunc}/> 
          <View style={rowStyles.topContainerInstruction}>
            <InstructionSubBox text={instruction} />
          </View>
        </View>
        <View style={rowStyles.bottomContainer}>
          <InstructionSubBox text={"x" + repetition} />
          <InstructionSubBox text={color} flex={2}/>
          <Pressable
            style={rowStyles.infoPressable}
            onPress={() => setIsModalVisible(true)}
            disabled={isInfoDisabled}
          >
            <InstructionSubBox text={"Info"} textColor={isInfoDisabled ? 'grey' : 'black'}/>
          </Pressable>
        </View>
      </View>

      <CustomModal
        isVisible={isModalVisible}
        headerText={"Special Instructions:"}
        onClose={ () => setIsModalVisible(false)}
      >
      <ScrollView>
        <Text style={rowStyles.modalText}>
            {specialInstructions}
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
  infoPressable: {
    flex: 1,
    height: '100%',
  },
  modalText: {
    textAlign: 'center',
  },
});

// Instructions subboxes
// Blocks of information used for the instruction rows
// Allows for custom text, and flex for sizing
export const InstructionSubBox = ({ text, textColor, flex }) => {
  return (
    <View style={[subBoxStyles.subBoxContainer, {flex: flex ? flex : 1}]}>
      <Text style={[subBoxStyles.subBoxText, {color: textColor}]}>
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
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});