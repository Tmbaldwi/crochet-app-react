import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Pressable, ScrollView, Switch, StyleSheet } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/Pattern Section/PatternSection';
import { AddEditPatternSectionModal } from '../components/Instruction Stuff/Pattern Section/AddEditPatternSectionModal';
import { ColorCalculator } from '../components/Tools/ColorCalculator';
import { addPatternSection, editPatternSection, deletePatternSection } from '../redux/slices/PatternSlice';

function CreatePatternScreen() {
  const {byId, allIds} = useSelector(state => state.pattern.patternSections);
  const dispatch = useDispatch();
  const gradientArray = ColorCalculator.createGradient('#ffc800', '#0febff', allIds.length);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotViewMode, setIsNotViewMode] = useState(true);

  const handleSetIsModalVisible = (isVisible) => {
    setIsModalVisible(isVisible);
  }
  const handleToggleIsNotViewMode = () => {
    setIsNotViewMode(!isNotViewMode);
  }

  const handleAddPatternSection = (section) => {
    dispatch(addPatternSection(section));
  }

  const handleEditPatternSection = (id, updates) => {
    dispatch(editPatternSection({ id, updates }));
  }
  const handleDeletePatternSection = (id) => {
    dispatch(deletePatternSection(id));
  }

  return (
    <View style={styles.outerPageContentContainer}>
      <View style={styles.pageContentContainer}>
        <ScrollView style={styles.contentBody}>
          {allIds.map((id, index) => (
            <View key={id}>
              <PatternSection
                isViewMode={!isNotViewMode}
                patternSectionInfo={byId[id]}
                editFunc={(updates) => handleEditPatternSection(id, updates)}
                deleteFunc={() => handleDeletePatternSection(id)}
                backgroundColorInfo={{colorStart: gradientArray[index], colorEnd: gradientArray[index + 1]}}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomLeftContainer}>
            <View style={styles.editSwitchContainer}>
              <Text style={styles.editSwitchText}>EDIT:</Text>
              <Switch onValueChange={handleToggleIsNotViewMode} value={isNotViewMode} />
            </View>
          </View>
          {isNotViewMode && (
            <View style={styles.addSectionButtonContainer}>
              <Pressable 
                style={styles.addSectionButton} 
                onPress={() => handleSetIsModalVisible(true)}>
                <Text>+</Text>
              </Pressable>
            </View>
          )}
        </View>
        <AddEditPatternSectionModal
          modalMode="add"
          onCloseModal={() => handleSetIsModalVisible(false)}
          isModalVisible={isModalVisible}
          addFunc={handleAddPatternSection}
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