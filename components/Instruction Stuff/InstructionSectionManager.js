import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {InstructionSection} from "./InstructionSection";

export const InstructionSectionManager = () => {
    return(
        <ScrollView style={instructionSectionManagerStyling.content}>
            <InstructionSection title={"Round 1-4"}/>
        </ScrollView>
    );
};

const instructionSectionManagerStyling = StyleSheet.create({
    content: {
        width: '100%',
      },
})