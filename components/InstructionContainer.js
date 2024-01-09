import React, {useState} from "react";
import { View, TextInput, Text, TouchableOpacity, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';

export const InstructionSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={{
      margin:5,
      borderWidth: 3,
    }}>
      <View style={{
        height: 60,
        backgroundColor: 'orange',
        flexDirection: 'row', //splits horzontally
        justifyContent: 'space-between', //Center horizontally
        alignItems: 'center',
        borderBottomWidth: 3,
      }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <Text>Example Box 1</Text>
        </View>
        <TouchableOpacity onPress={toggleContent} style={{
          height: 60,
          width: 60,
          borderLeftWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}>
          <Text>^</Text>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <InstructionContainer>
          <InstructionRow displayText="Box One" style={{marginTop: 10}}/>
          <InstructionRow displayText="Box Two"/>
          <InstructionRow displayText="Box Three" style={{marginBottom: 10}}/>
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
    }}>
      {React.Children.map(children, (child, index) => React.cloneElement(child, {
        key: index,
      })
      )}
    </View>
  );
};

export const InstructionRow = ({displayText}) => {
  return (
    <View
      style={{
        height: 60,
        margin: 5,
        backgroundColor: 'lightblue',
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

