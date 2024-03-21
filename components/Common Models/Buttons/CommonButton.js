import React from 'react';
import {Text, Pressable, StyleSheet } from 'react-native';

export const CommonButton = ({ label, onPress, isHidden, isDisabled, buttonStyle, textStyle, requiredInputs = []}) => {
    // Sets button to disabled state if required inputs are not filled
    let isMissingInputs = false;
    for(let reqInput of requiredInputs){
        if(reqInput.disallowEmptyInput){
            isMissingInputs = reqInput.input.trim().length == 0;
        }
        else{
            isMissingInputs = reqInput.input.length == 0;
        }

        if(isMissingInputs){
            break;
        }
    };

    let isDisabledMode = isMissingInputs || isDisabled;

    return(
        <Pressable 
            onPress={onPress}
            disabled={isDisabledMode}
            style={[
                    modalStyles.defaultButtonStyle,
                    {display: isHidden? 'none' : 'flex'}, 
                    isDisabledMode? modalStyles.disabledButtonStyle: {},
                    buttonStyle,
            ]}
        >
            <Text 
                style={[
                    modalStyles.defaultButtonText,
                    isDisabledMode? modalStyles.disabledButtonText: {}, 
                    textStyle,
                ]}
            >
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
    defaultButtonText:{
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    disabledButtonStyle:{
        backgroundColor: 'lightblue',
        borderColor: 'grey',
    },
    disabledButtonText:{
        color: 'grey',
    },
});