import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet } from 'react-native';

// Custom modal for use in creating instructions
// Allows for a custom header and body 
// TODO: Maybe custom close/submit text?
export const CustomModal = ({isVisible, headerText, height, onClose, onSubmit, children}) => {
    return (
    <Modal
        visible={isVisible}
        onRequestClose={onClose}
        animationType="slide"
        transparent={true}
    >
        <View style={modalStyles.modalOuter}>
          <View style={[modalStyles.modalInner, {height: height ? height : '50%'}]}>
            <View style={modalStyles.modalContent}>
              <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalHeaderText}>{headerText}</Text>
              </View>
              <View style={modalStyles.modalBody}>
                {children}
              </View>
            </View>
            <View style={modalStyles.modalButtonContainer}>
              <Pressable onPress={onClose} style={modalStyles.modalButtons}>
                <Text>Close</Text>
              </Pressable>
              <Pressable onPress={onSubmit} style={modalStyles.modalButtons}>
                <Text>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
    </Modal>
    );
};

const modalStyles = StyleSheet.create({
    modalOuter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalInner: {
      maxWidth: '90%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    modalContent: {
      justifyContent: 'flex-start',
      flex: 1,
    },
    modalHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
    },
    modalHeaderText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 40,
      columnGap: 10,
    },
    modalButtons:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      borderRadius: 8,
      borderWidth: 2,
    },
    modalBody: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
    },
});