import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { StringValidator } from '../Tools/StringValidator';

export const CommonTextInput = ({value, onChangeText, placeholder, keyboardType, maxLength, multiline, scrollEnabled, onContentSizeChange, extraStyle}) => {
    const handleOnChangeText = (input, onChangeText) => {
        switch(keyboardType) {
            case "numeric":
                onChangeText(StringValidator.enforceNumericsLargerThanZero(input));
                break;
            default:
                onChangeText(input);
        }
    };

    return(
        <TextInput 
            style={[textInputStyling.textInput, extraStyle]}
            value={value}
            onChangeText={(input) => handleOnChangeText(input, onChangeText)}
            placeholder={placeholder} 
            placeholderTextColor={"lightgrey"}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={onContentSizeChange}
            returnKeyType='done'
        />
    );
};

const textInputStyling = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderRadius: 2,
      textAlign: 'center',
      minHeight: 30,
      alignSelf: 'stretch',
    },
  });