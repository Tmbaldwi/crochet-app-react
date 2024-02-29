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
                <Text>X</Text>
            </Pressable>
        );
    }
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