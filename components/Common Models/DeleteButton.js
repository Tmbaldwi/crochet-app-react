import React from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';

// Custom model for delete buttons
// TODO: Make hideable for edit/view pattern modes
export const DeleteButton = ({deleteFunc}) => {
    return(
        <View style={deleteButtonStyling.deleteButton}>
            <Pressable onPress={deleteFunc}>
                <Text>X</Text>
            </Pressable>
        </View>
    );
};

const deleteButtonStyling = StyleSheet.create({
    deleteButton: {
        height: '100%',
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