import React, {useState} from "react";
import { View, TextInput, Text, TouchableOpacity, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';

export const InstructionSection = () => {
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
      <Collapsible collapsed={isCollapsed}>
        <InstructionContainer>
          <InstructionBox displayText="Box One"/>
          <InstructionBox displayText="Box Two"/>
          <InstructionBox displayText="Box Three"/>
        </InstructionContainer>
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
      borderColor: 'black',
      borderWidth: 1
    }}>
      {React.Children.map(children, (child, index) => React.cloneElement(child, {
        key: index,
      })
      )}
    </View>
  );
};

export const InstructionBox = ({displayText}) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'lightblue',
        margin: 5,
        flexDirection: 'row', //splits horzontally
        justifyContent: 'space-between', //Center horizontally
        alignItems: 'center',
      }}
    >
      <InstructionSubBox placeholder={displayText}/>
      <InstructionSubBox placeholder={displayText}/>
      <InstructionSubBox placeholder={displayText}/>
    </View>
  );
};

//subbox stuff

export const InstructionSubBox = ({placeholder}) => {
  const [text, onChangeText] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        margin: 5,
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
  )
}

