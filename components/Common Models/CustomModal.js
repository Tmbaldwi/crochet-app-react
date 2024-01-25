import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const CustomModal = ({isVisible, headerText, onClose, onSubmit, children}) => {
    return (
    <Modal
        visible={isVisible}
        onRequestClose={onClose}
        animationType="slide"
        transparent={true} // Make the modal's background transparent
    >
        <View style={modalStyles.modalOuter}>
          <View style={modalStyles.modalInner}>
            <View style={modalStyles.modalContent}>
              <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalHeaderText}>{headerText}</Text>
              </View>
              <View style={modalStyles.modalBody}>
                {children}
              </View>
            </View>
            <View style={modalStyles.modalButtonContainer}>
              <TouchableOpacity onPress={onClose} style={modalStyles.modalButtons}>
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSubmit} style={modalStyles.modalButtons}>
                <Text>Submit</Text>
              </TouchableOpacity>
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalInner: {
      width: '80%',
      height: '50%',
      backgroundColor: 'white',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: 10,
    },
    modalContent: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      width: '100%',
    },
    modalHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderBottomWidth: 2,
    },
    modalHeaderText: {
      fontWeight: 'bold',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 10,
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
});