import React from 'react';
import {Modal, View, Text, StyleSheet } from 'react-native';
import { CommonButton } from './CommonButton';

// Custom modal for use in creating instructions
// Allows for a custom header and body 
export const CustomModal = ({isVisible, headerText, height, maxWidth, onClose, onSubmit, onDelete, hideDelete, closeText, submitText, children}) => {
    return (
    <Modal
        visible={isVisible}
        onRequestClose={onClose}
        animationType="slide"
        transparent={true}
    >
        <View style={modalStyles.modalOuter}>
          <View style={[modalStyles.modalInner, {height: height ? height : '50%', maxWidth: maxWidth ? maxWidth : '90%'}]}>
            <View style={modalStyles.content}>
              <View style={modalStyles.header}>
                <Text style={modalStyles.headerText}>{headerText}</Text>
              </View>
              <View style={modalStyles.body}>
                {children}
              </View>
            </View>
            <View style={modalStyles.buttonContainer}>
              <View style={modalStyles.buttonContainerTopRow}>
                <CommonButton 
                  label={closeText ? closeText: 'CLOSE'}
                  onPress={onClose}
                  buttonStyle={modalStyles.closeButton}
                  textStyle={modalStyles.closeButtonText}
                />
                <CommonButton
                  label={submitText ? submitText: 'SUBMIT'}
                  onPress={onSubmit}
                  isHidden={!onSubmit}
                  isDisabled={false}
                />
              </View>
              <View style={[modalStyles.buttonContainerBottomRow, {display: hideDelete? 'none': 'flex'}]}>
                <CommonButton
                  label={'DELETE'}
                  onPress={onDelete}
                  isHidden={hideDelete}
                  buttonStyle={modalStyles.deleteButton}
                />
              </View>
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
      minWidth: 300,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    content: {
      justifyContent: 'flex-start',
      flex: 1,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    buttonContainer: {
      justifyContent: 'space-around',
      paddingTop: 10,
      borderTopWidth: 2,
      gap: 10,
    },
    buttonContainerTopRow: {
      flexDirection: 'row',
      height: 40,
      columnGap: 10,
    },
    closeButton:{
      backgroundColor: 'lightblue',
    },
    closeButtonText: {
      color: 'black',
    },
    buttonContainerBottomRow: {
      height: 40,
    },
    deleteButton: {
      backgroundColor: 'red',
    },
    buttonText:{
      fontWeight: 'bold',
      textAlign: 'center',
    },
    body: {
      flex: 1,
      paddingTop: 10,
    },
});