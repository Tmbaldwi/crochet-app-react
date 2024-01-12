import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionRow } from "./InstructionRow";

//instruction section stuff
export const InstructionSection = ( {title}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
            <Text>{title}</Text>
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
            />
          </View>
        ))}
        <View style={[sectionStyles.addButtonContainer, { borderTopWidth: rows.length == 0 ? 0: 2}]}>
          <Button title="Add Instruction" onPress={() => setIsModalVisible(true)} />
        </View>
        <Modal
          visible={isModalVisible}
          onRequestClose={onCloseModal}
          animationType="slide"
          transparent={true} // Make the modal's background transparent
        >
          <View style={sectionStyles.modalOuter}>
            <View style={sectionStyles.modalInner}>
              <View style={sectionStyles.modalContent}>
                <View>
                  <Text style={sectionStyles.modalContentHeaderText}>Add New Instruction:</Text>
                </View>
                <View style={sectionStyles.modalBody}>
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
                </View>
              </View>
              <View style={sectionStyles.modalButtonContainer}>
                <TouchableOpacity onPress={onCloseModal} style={sectionStyles.modalButtons}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSubmitModal} style={sectionStyles.modalButtons}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Collapsible>
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
  addButtonContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  modalOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalInner: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
  modalContentHeaderText: {
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    columnGap: 10,
    width: '100%',
  },
  modalButtons:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 8,
  },
  modalBody: {
    padding: 10,
    gap: 10,
    width: '100%',
    maxWidth: 300,
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

//instruction container stuff 
export const InstructionContainer = ({ children }) => {
  return (
    <View style={containerStyles.container}>
      {React.Children.map(children, (child, index) => React.cloneElement(child, {key: index,}))}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});