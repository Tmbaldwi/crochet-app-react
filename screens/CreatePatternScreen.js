import React from 'react';
import { View, ScrollView } from 'react-native';
import { InstructionSection } from '../components/Instruction Stuff/InstructionContainer';

function CreatePatternScreen(){
  return (
    <ScrollView>
      <InstructionSection title={"Round 1-4"}/>
    </ScrollView>
  );
};

export default CreatePatternScreen;
