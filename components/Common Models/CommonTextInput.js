import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { StringValidator } from '../Tools/StringValidator';

export const CommonTextInput = ({value, onChangeText, placeholder, inputType, maxLength, multiline, scrollEnabled, onContentSizeChange, isDisabled, extraStyle}) => {
    const handleOnChangeText = (input, onChangeText) => {
        switch(inputType) {
            case 'numeric':
                onChangeText(StringValidator.enforceNumericsLargerThanZero(input));
                break;
            default:
                onChangeText(input);
        }
    };

    return(
        <TextInput 
            style={[textInputStyling.textInput, extraStyle, isDisabled? textInputStyling.textInputDisabled : null]}
            value={value}
            onChangeText={(input) => handleOnChangeText(input, onChangeText)}
            placeholder={placeholder} 
            placeholderTextColor={"lightgrey"}
            inputType={inputType}
            keyboardType={inputType}
            maxLength={maxLength}
            multiline={multiline}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={onContentSizeChange}
            enterKeyHint='done'
            readOnly={isDisabled}
            selectTextOnFocus={!isDisabled}
        />
    );
};

const textInputStyling = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderRadius: 4,
        textAlign: 'center',
        minHeight: 30,
        alignSelf: 'stretch',
    },
    textInputDisabled: {
        borderColor: 'grey',
        color: 'grey',
    },
  });