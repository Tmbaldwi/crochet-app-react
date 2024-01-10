import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Collapsible from 'react-native-collapsible';

//instruction section stuff
export const InstructionSection = ( {title}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [rows, setRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addInstRow = () => {
    const newRow = { instruction: 'New Instruction', repetition: 1, color: 'blue' };
    setRows([...rows, newRow]);
  };

  const removeInstRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

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
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          transparent={true} // Make the modal's background transparent
        >
          <View style={sectionStyles.modalOuter}>
            <View style={sectionStyles.modalInner}>
              <Text>Modal time!</Text>
              <Button title="Close Modal" onPress={() => setIsModalVisible(false)}/>
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
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

//instruction row stuff
export const InstructionRow = ({ instruction, repetition, color}) => {
  return (
    <View style={rowStyles.rowContainer}>
      <View style={rowStyles.topContainer}>
        <InstructionSubBox text={instruction} />
      </View>
      <View style={rowStyles.bottomContainer}> 
        <InstructionSubBox text={"x"+repetition} />
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
}

const subBoxStyles = StyleSheet.create({
  subBoxContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});