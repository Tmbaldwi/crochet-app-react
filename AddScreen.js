import React from 'react';
import { View, Text, Button } from 'react-native';

function AddScreen({ navigation }) {
  return (
    <View>
      <Text>Add New Row</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default AddScreen;
