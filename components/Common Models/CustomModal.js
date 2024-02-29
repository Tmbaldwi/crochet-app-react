import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet } from 'react-native';

// Custom modal for use in creating instructions
// Allows for a custom header and body 
// TODO: Maybe custom close/submit text?
export const CustomModal = ({isVisible, headerText, height, maxWidth, onClose, onSubmit, onDelete, showDelete, closeText, submitText, children}) => {
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
                <Pressable onPress={onClose} style={modalStyles.buttons}>
                  <Text style={modalStyles.buttonText}>{closeText ? closeText: 'Close'}</Text>
                </Pressable>
                <Pressable onPress={onSubmit} style={[modalStyles.buttons, {display: onSubmit? 'flex' : 'none'}]}>
                  <Text style={modalStyles.buttonText}>{submitText ? submitText: 'Submit'}</Text>
                </Pressable>
              </View>
              <View style={[modalStyles.buttonContainerBottomRow, {display: showDelete? 'flex' : 'none'}]}>
                <Pressable onPress={onDelete} style={modalStyles.deleteButton}>
                  <Text style={modalStyles.buttonText}>Delete</Text>
                </Pressable>
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
    buttonContainerBottomRow: {
      height: 40,
    },
    buttons:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'lightblue',
      borderRadius: 8,
      borderWidth: 2,
    },
    deleteButton: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'red',
      borderRadius: 8,
      borderWidth: 2,
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