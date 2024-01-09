import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

export const InstructionSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={{ margin: 5, borderWidth: 2 }}>
      <TouchableOpacity onPress={toggleSection}>
        <View
          style={{
            height: 60,
            margin: 5,
            backgroundColor: 'orange',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Container</Text>
          <Text>{isCollapsed ? '^' : '-'}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        {/* Your existing content goes here */}
        <InstructionRow displayText="Box One" />
        <InstructionRow displayText="Box Two" />
        <InstructionRow displayText="Box Three" />
      </Collapsible>
    </View>
  );
};

export const InstructionContainer = ({ children }) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
    }}>
      {React.Children.map(children, (child, index) => React.cloneElement(child, {
        key: index,
      })
      )}
    </View>
  );
};

export const InstructionRow = ({ displayText }) => {
  return (
    <View
      style={{
        height: 60,
        margin: 5,
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <InstructionSubBox placeholder={displayText} />
      <InstructionSubBox placeholder={displayText} />
      <InstructionSubBox placeholder={displayText} />
    </View>
  );
};

//subbox stuff

export const InstructionSubBox = ({ placeholder }) => {
  const [text, onChangeText] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
      }}>
      <TextInput
        style={{
          flex: 1,
          alignSelf: 'stretch',
          textAlign: 'center',
        }}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
      />
    </View>
  );
}
