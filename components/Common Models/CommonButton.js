import React from 'react';
import {Text, Pressable, StyleSheet } from 'react-native';

export const CommonButton = ({ label, onPress, isHidden, isDisabled, buttonStyle, textStyle}) => {
    return(
        <Pressable 
            onPress={onPress}
            disabled={isDisabled}
            style={[modalStyles.defaultButtonStyle, {display: isHidden? 'none' : 'flex'}, buttonStyle]}
        >
            <Text style={[modalStyles.buttonText, textStyle]}>
                {label}
            </Text>
        </Pressable>
    );
};

const modalStyles = StyleSheet.create({
    defaultButtonStyle:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#2196F3',
      borderRadius: 8,
      borderWidth: 2,
      minHeight: 40,
    },
    buttonText:{
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
});