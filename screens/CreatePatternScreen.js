import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionBox } from '../components/InstructionContainer';
import { InstructionContainer } from '../components/InstructionContainer';

const CreatePatternScreen = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleContent}>
        <View style={{
          height: 60,
          backgroundColor: 'orange',
          margin: 5,
        }}>
          <Text>Example Box 1</Text>
        </View>
      </TouchableOpacity>
      <Pressable>
        <Collapsible collapsed={isCollapsed}>
            <InstructionContainer>
              <InstructionBox displayText="Box One"/>
              <InstructionBox displayText="Box Two"/>
              <InstructionBox displayText="Box Three"/>
            </InstructionContainer>
        </Collapsible>
      </Pressable>
    </View>
  );
};

export default CreatePatternScreen;
