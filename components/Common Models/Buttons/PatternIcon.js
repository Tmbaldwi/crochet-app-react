import React from 'react';
import {Text, Pressable, StyleSheet } from 'react-native';

export const PatternIcon = ({ label, onPress, isDisabled, color}) => {
    return(
        <Pressable 
            onPress={onPress}
            disabled={isDisabled}
            style={[
                styles.patternIcon, 
                {backgroundColor: color},
                isDisabled? styles.disabledBoxStyle: {},
            ]}
        >
            <Text style={[
                styles.patternIconText,
                isDisabled? styles.disabledBoxText: {}, 
            ]}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    patternIcon: {
        width: 160,
        height: 160,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    patternIconText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    disabledBoxStyle:{
        backgroundColor: 'lightblue',
        borderColor: 'grey',
    },
    disabledBoxText:{
        color: 'grey',
    },
});