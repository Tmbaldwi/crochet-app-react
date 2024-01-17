import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {InstructionSection} from "./InstructionSection";

export const InstructionSectionManager = forwardRef((props, ref) => {
    const [sections, setSections] = useState([]);

    const addInstSec = (startNum, endNum) => {
        const newSec = { title: "Round", startNum: startNum, endNum: endNum};
        setSections(prevSections => [...prevSections, newSec]);
    };

    useImperativeHandle(ref, () => ({addInstSec}));

    return(
        <ScrollView style={instructionSectionManagerStyling.content}>
            {sections.map((sec, index) => (
                <View key={index}>
                    <InstructionSection
                        title={sec.title}
                        startNum = {sec.startNum}
                        endNum = {sec.endNum}
                    />
                </View>
            ))}
        </ScrollView>
    );
});

const instructionSectionManagerStyling = StyleSheet.create({
    content: {
        width: '100%',
      },
})