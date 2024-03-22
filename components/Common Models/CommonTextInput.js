import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export const CommonTextInput = ({value, onChangeText, placeholder, keyboardType, maxLength, multiline, scrollEnabled, onContentSizeChange, extraStyle}) => {
    return(
        <TextInput 
            style={[textInputStyling.textInput, extraStyle]}
            value={value}
            onChangeText={onChangeText}
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