import React from "react";
import { StyleSheet, Text, Pressable } from 'react-native';

// Custom model for delete buttons
export const DeleteButton = ({onPress, extraStyle, isHidden}) => {
    if(isHidden){
        return null;
    }
    else{
        return(
            <Pressable onPress={onPress} style={[deleteButtonStyling.deleteButton, extraStyle]}>
                <Text style={deleteButtonStyling.deleteButtonText}>X</Text>
            </Pressable>
        );
    }
};

const deleteButtonStyling = StyleSheet.create({
    deleteButton: {
        aspectRatio: 1/1,
        borderRadius: 4,
        borderWidth: 2,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'red',
    },
    deleteButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});