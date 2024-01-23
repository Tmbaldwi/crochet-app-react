import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DeleteButton } from "../Common Models/DeleteButton";

//instruction row stuff

export const InstructionRow = ({ instruction, repetition, color, deleteInstructionRowFunc }) => {
  return (
    <View style={rowStyles.rowContainer}>
      <View style={rowStyles.topContainer}>
        <DeleteButton deleteFunc={deleteInstructionRowFunc}/>
        <View style={rowStyles.topContainerInstruction}>
          <InstructionSubBox text={instruction} />
        </View>
      </View>
      <View style={rowStyles.bottomContainer}>
        <InstructionSubBox text={"x" + repetition} />
        <InstructionSubBox text={color} />
        <InstructionSubBox text={"Info"} />
      </View>
    </View>
  );
};
const rowStyles = StyleSheet.create({
  rowContainer: {
    margin: 5,
    borderWidth: 2,
  },
  topContainer: {
    height: 60,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainerDeleteButton: {
    width: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'red',
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
});
//subbox stuff

export const InstructionSubBox = ({ text }) => {
  return (
    <View style={subBoxStyles.subBoxContainer}>
      <Text>{text}</Text>
    </View>
  );
};
const subBoxStyles = StyleSheet.create({
  subBoxContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});