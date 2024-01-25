import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const DeleteButton = ({deleteFunc}) => {
    return(
        <TouchableOpacity onPress={deleteFunc} style={deleteButtonStyling.deleteButton}>
            <Text>X</Text>
        </TouchableOpacity>
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