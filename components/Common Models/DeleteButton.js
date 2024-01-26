import React from "react";
import { StyleSheet, Text, Pressable } from 'react-native';

// Custom model for delete buttons
// TODO: Make hideable for edit/view pattern modes
export const DeleteButton = ({deleteFunc}) => {
    return(
        <Pressable onPress={deleteFunc} style={deleteButtonStyling.deleteButton}>
            <Text>X</Text>
        </Pressable>
    );
};

const deleteButtonStyling = StyleSheet.create({
    deleteButton: {
        width: 60,
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'red',
    },
});