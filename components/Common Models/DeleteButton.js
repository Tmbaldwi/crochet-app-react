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
        width: 60, //50
        // height: 50,
        // margin: 5,
        // borderWidth: 2,
        borderRightWidth: 1, //remove
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'red',
    },
});