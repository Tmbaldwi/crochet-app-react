import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CreatePatternScreen({ navigation }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleContent = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
  <View>
    <TouchableOpacity onPress={() => toggleContent()}>
      <Text>Collapse Me!</Text>
    </TouchableOpacity>
    <Collapsible collapsed={isCollapsed}>
      <Text>hello collapsible world!</Text>
    </Collapsible>
  </View>
  );
}

export default CreatePatternScreen;
