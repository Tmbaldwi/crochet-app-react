import React from "react";
import { StyleSheet, Text, Pressable } from 'react-native';

// Custom model for edit/info buttons
// If in view mode, the button displays "Info" and calls the onInfoPress callback
// If not in view mode, the button displays "Edit" and calls the onEditPress callback
export const EditOrInfoButton = ({onEditPress, onInfoPress, extraStyle, isViewMode, isHidden}) => {
    if(isHidden){
        return null;
    }
    else if(isViewMode){
        return(
            <Pressable 
                onPress={onInfoPress} 
                style={[
                        buttonStyling.editOrInfoButton, 
                        extraStyle
                    ]}
            >
                <Text>Info</Text>
            </Pressable>
        );
    }
    else{
        return(
            <Pressable 
                onPress={onEditPress} 
                style={[
                        buttonStyling.editOrInfoButton, 
                        {backgroundColor: 'green'}, 
                        extraStyle
                    ]}
            >
                <Text>Edit</Text>
            </Pressable>
        );
    }
};

const buttonStyling = StyleSheet.create({
    editOrInfoButton: {
        aspectRatio: 1/1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});