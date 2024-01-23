import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "./InstructionRow";
import { CustomModal } from "../Common Models/CustomModal"

//instruction section stuff
export const InstructionSection = ( {title, startNum, endNum}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [rows, setRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [instructionText, setInstructionText] = useState("");
  const [repetitionsNum, setRepetitionsNum] = useState("");
  const [colorText, setColorText] = useState("");

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addInstRow = (inst, rep, color) => {
    const newRow = { instruction: inst, repetition: Number(rep), color: color };
    setRows([...rows, newRow]);
  };

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
      <TouchableOpacity onPress={toggleSection}>
        <View style={[sectionStyles.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
          <View style={sectionStyles.headerTextContainer}>
            <Text>{title + ": " + startNum + "-" + endNum}</Text>
          </View>
          <View style={sectionStyles.toggleIconContainer}>
            <Text>{isCollapsed ? '^' : '-'}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {rows.map((row, index) => (
          <View key={index}>
            <InstructionRow
              instruction={row.instruction}
              repetition={row.repetition}
              color={row.color}
              deleteFunc={() => removeInstRow(index)}
            />
          </View>
        ))}
        <View style={{borderTopWidth: rows.length == 0 ? 0: 2}}>
          <Button title="Add Instruction" onPress={() => setIsModalVisible(true)} />
        </View>
      </Collapsible>

      <CustomModal
        isVisible={isModalVisible}
        headerText={"Add New Instruction:"}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
      >
        <View style={sectionStyles.modalTextInputContainer}>
                    <Text>Instruction: </Text>
                    <TextInput 
                      style={sectionStyles.modalTextInput}
                      value={instructionText}
                      onChangeText={setInstructionText}
                      placeholder={"ex: [1 inc, 2 dec]"} 
                      placeholderTextColor={"lightgrey"}
                    />
                  </View>
                  <View style={sectionStyles.modalTextInputContainer}>
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
                  <View style={sectionStyles.modalTextInputContainer}>
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