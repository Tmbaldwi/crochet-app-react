import React from "react";
import { View, Text, StyleSheet } from "react-native";

//instruction row stuff

export const InstructionRow = ({ instruction, repetition, color }) => {
  return (
    <View style={rowStyles.rowContainer}>
      <View style={rowStyles.topContainer}>
        <InstructionSubBox text={instruction} />
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
    alignItems: 'center',
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
