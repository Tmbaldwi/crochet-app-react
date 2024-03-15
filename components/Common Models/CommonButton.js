import React from 'react';
import {Text, Pressable, StyleSheet } from 'react-native';

export const CommonButton = ({ text, onPress, isHidden, isDisabled, extraStyles, children}) => {
    return(
        <Pressable 
            onPress={onPress}
            disabled={isDisabled}
            style={[modalStyles.defaultButtonStyle, {display: isHidden? 'none' : 'flex'}, extraStyles]}
        >
            <Text style={modalStyles.buttonText}>
                {text}
            </Text>
        </Pressable>
    );
};

const modalStyles = StyleSheet.create({
    defaultButtonStyle:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'lightblue',
      borderRadius: 8,
      borderWidth: 2,
    },
    buttonText:{
      fontWeight: 'bold',
      textAlign: 'center',
    },
});