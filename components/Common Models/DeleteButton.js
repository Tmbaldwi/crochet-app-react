import React from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';

// Custom model for delete buttons
// TODO: Make hideable for edit/view pattern modes
export const DeleteButton = ({onPress, extraStyle}) => {
    return(
        <Pressable onPress={onPress} style={[deleteButtonStyling.deleteButton, extraStyle]}>
            <Text>X</Text>
        </Pressable>
    );
};

const deleteButtonStyling = StyleSheet.create({
    deleteButton: {
        aspectRatio: 1/1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'red',
    },
});