import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { CustomModal } from '../../Common Models/CustomModal'

export const AddEditPatternSectionModal = ({modalMode, onCloseModal, isModalVisible, addFunc, editFunc, deleteFunc, currentSectionTitle}) => {
    const [patternSectionName, setPatternSectionName] = useState(modalMode ==="edit" ? currentSectionTitle: "");

    let modalHeader = "";
    let showDelete = false;
    
    switch(modalMode){
        case "add":
            modalHeader = "Add New Section";
            showDelete = false;
            break;
        case "edit":
            modalHeader = "Edit Section";
            showDelete = true;
            break;
    };

    const onSubmitModal = () =>{
        switch(modalMode) {
          case "add":
            addFunc(patternSectionName);
            break;
          case "edit":
            editFunc(patternSectionName);
            break;
        }
    
        onClosePatternSectionModal();
    };


    const deletePatternSection = () => {
        deleteFunc();

        onClosePatternSectionModal();
    };

    const onClosePatternSectionModal = () =>{
        setPatternSectionName(modalMode ==="edit" ? currentSectionTitle: "");

        onCloseModal();
    };

    return(
        <CustomModal
            isVisible={isModalVisible}
            headerText={modalHeader}
            onClose={onClosePatternSectionModal}
            onSubmit={onSubmitModal}
            onDelete={() => deletePatternSection()}
            showDelete={showDelete}
            closeText={"Cancel"}
        >
        <View style={patternSectionModalStyling.textInputContainer}>
          <Text>Section Name: </Text>
          <TextInput 
            style={patternSectionModalStyling.textInput}
            value={patternSectionName}
            onChangeText={setPatternSectionName}
            placeholder={"ex: Head"} 
            placeholderTextColor={"lightgrey"}
          />
        </View>
      </CustomModal>
    )
}

const patternSectionModalStyling = StyleSheet.create({
    textInputContainer:{
      flexDirection: "row",
      justifyContent: 'center',
      gap: 5,
    },
    textInput:{
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
    },
  });