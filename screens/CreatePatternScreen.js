import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Pressable, ScrollView, Switch, StyleSheet } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/Pattern Section/PatternSection';
import { AddEditPatternSectionModal } from '../components/Instruction Stuff/Pattern Section/AddEditPatternSectionModal';
import { ColorCalculator } from '../components/Tools/ColorCalculator';
import { addPatternSection, editPatternSection, deletePatternSection } from '../redux/slices/PatternSectionSlice';

function CreatePatternScreen() {
  const patternSections = useSelector(state => state.patternSection.patternSections);
  const dispatch = useDispatch();
  const gradientArray = ColorCalculator.createGradient('#ffc800', '#0febff', patternSections.length);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotViewMode, setIsNotViewMode] = useState(true);

  return (
    <View style={styles.outerPageContentContainer}>
      <View style={styles.pageContentContainer}>
        <ScrollView style={styles.contentBody}>
          {patternSections.map((sec, index) => (
            <View key={index}>
              <PatternSection
                isViewMode={!isNotViewMode}
                patternSectionInfo={sec}
                editFunc={(section) => dispatch(editPatternSection({ index, section }))}
                deleteFunc={() => dispatch(deletePatternSection(index))}
                backgroundColorInfo={{colorStart: gradientArray[index], colorEnd: gradientArray[index + 1]}}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomLeftContainer}>
            <View style={styles.editSwitchContainer}>
              <Text style={styles.editSwitchText}>EDIT:</Text>
              <Switch onValueChange={() => setIsNotViewMode(!isNotViewMode)} value={isNotViewMode} />
            </View>
          </View>
          {isNotViewMode && (
            <View style={styles.addSectionButtonContainer}>
              <Pressable 
                style={styles.addSectionButton} 
                onPress={() => setIsModalVisible(true)}>
                <Text>+</Text>
              </Pressable>
            </View>
          )}
        </View>
        <AddEditPatternSectionModal
          modalMode="add"
          onCloseModal={() => setIsModalVisible(false)}
          isModalVisible={isModalVisible}
          addFunc={(section) => dispatch(addPatternSection(section))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerPageContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pageContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxWidth: 1400,
    width: '100%',
  },
  contentBody: {
    width: "100%", 
    flex: 1,
    margin: 10,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
  },
  bottomLeftContainer:{
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  editSwitchContainer:{
  },
  editSwitchText:{
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addSectionButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  addSectionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CreatePatternScreen;