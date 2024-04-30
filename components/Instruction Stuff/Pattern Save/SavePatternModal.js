import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { CustomModal } from '../../Common Models/Modals/CustomModal';
import { CommonTextInput } from '../../Common Models/CommonTextInput';

export const SavePatternModal = ({ onCloseModal, isModalVisible, addFunc}) => {
    const [patternName, setPatternName] = useState("");
    let requiredInputs = [{input: patternName, disallowEmptyInput: true}];

    let modalHeader = "Save New Pattern";
    let hideDelete = true;

    const onSubmitModal = () =>{
        addFunc(patternName);
    
        onClosePatternSectionModal();
    };

    // close function called after submit
    const onClosePatternSectionModal = () =>{
        setPatternName("");

        onCloseModal();
    };

    return(
        <CustomModal
            isVisible={isModalVisible}
            headerText={modalHeader}
            onClose={onClosePatternSectionModal}
            onSubmit={onSubmitModal}
            hideDelete={hideDelete}
            closeText={"CANCEL"}
            submitText={"SAVE"}
            requiredInputsForSubmit={requiredInputs}
        >
        <ScrollView contentContainerStyle={patternSectionModalStyling.modalBody}>
          <View style={patternSectionModalStyling.inputContainerUpper}>
                <Text style={patternSectionModalStyling.inputSubheader}>
                    Pattern Name:
                </Text>
                <CommonTextInput 
                    value={patternName}
                    onChangeText={setPatternName}
                    placeholder={"ex: Dinosaur Plush"} 
                />
            </View>
        </ScrollView>
      </CustomModal>
    )
}

const patternSectionModalStyling = StyleSheet.create({
    modalBody: {
      gap: 10,
    },
    inputContainerUpper:{
      justifyContent: 'center',
      gap: 5,
    },
    inputSubheader: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });