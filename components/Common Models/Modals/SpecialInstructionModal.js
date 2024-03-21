import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { CustomModal } from "./CustomModal";

//Special Instruction Modal
//
// Description:
// A modal to simply desplay any special instructions that a pattern section, instructions section, instruction, etc may have
//
// Usage:
// Provide a visibility controller, a function to close it, and the special instreuction itself
export const SpecialInstructionModal = ({isVisible, onClose, specialInstruction}) => {
    return(
        <CustomModal
            isVisible={isVisible}
            headerText={"Special Instructions:"}
            onClose={onClose}
        >
            <ScrollView>
              <Text style={modalStyles.modalText}>
                  {specialInstruction}
              </Text>
            </ScrollView>
        </CustomModal>
    );
};

const modalStyles = StyleSheet.create({
    modalText: {
      textAlign: 'center',
    },
});