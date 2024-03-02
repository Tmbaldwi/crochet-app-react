import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Switch } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/Pattern Section/PatternSection';
import { AddEditPatternSectionModal } from '../components/Instruction Stuff/Pattern Section/AddEditPatternSectionModal';
import { colorCalculator } from '../components/Tools/ColorCalculator';

// Create Pattern Screen
// Description:
// Hosts all the pattern sections for pattern creation
// Allows user to add pattern sections, prompts user with a modal to give the pattern section a name
function CreatePatternScreen(){
  const [patternSections, setPatternSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotViewMode, setIsNotViewMode] = useState(true);
  const gradientArray = colorCalculator.createGradient('#ffea00', '#0febff', patternSections.length);

  //called after pattern section modal close function is executed
  const onClosePatternSectionAddModal = () =>{
    setIsModalVisible(false);
  }

  // adds new pattern sections to the array
  const addPatternSection = (sectionTitle) => {
    let newSec = {sectionTitle: sectionTitle};
    setPatternSections(prevSections => [...prevSections, newSec]);
  };

  // edits a pattern section at the given index with a new title
  // passed to every pattern section with its index inputted
  const editPatternSection = (newSectionTitle, index) => {
    let newSections = patternSections.map((section, idx) => {
      if (idx === index) {
        return { ...section, sectionTitle: newSectionTitle };
      }

      return section;
    });
  
    setPatternSections(newSections);
  }

  // deletes a pattern section at the given index
  // passed to every pattern section with its index inputted
  const deletePatternSection = (index) => {
    const newSecs = patternSections.filter((_, i) => i !== index);
    setPatternSections(newSecs);
};

  return (
    <View style={{alignItems: 'center'}}>
      <View style={patternScreenStyling.pageContentContainer}>
        <ScrollView style={patternScreenStyling.contentBody}>
          {patternSections.map((sec, index) => (
                              <View key={index}>
                                  <PatternSection
                                    isViewMode={!isNotViewMode}
                                    sectionTitle={sec.sectionTitle}
                                    editFunc={(newSectionTitle) => editPatternSection(newSectionTitle, index)}
                                    deleteFunc={() => deletePatternSection(index)}
                                    backgroundColorInfo={{colorStart: gradientArray[index], colorEnd: gradientArray[index+1]}}
                                  />
                              </View>
                          ))}
        </ScrollView>
        <View style={patternScreenStyling.bottomButtonContainer}>
          <View style={patternScreenStyling.editModeSwitchContainer}>
            <Switch
              onValueChange={setIsNotViewMode}
              value={isNotViewMode}
            />
          </View>
          {isNotViewMode && <View style={patternScreenStyling.addSectionButtonContainer}>
            <Pressable 
              style={patternScreenStyling.addSectionButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text>+</Text>
            </Pressable>
          </View>}
        </View>

        <AddEditPatternSectionModal
          modalMode={"add"}
          onCloseModal={onClosePatternSectionAddModal}
          isModalVisible={isModalVisible}
          addFunc={addPatternSection}
          patternSections={patternSections}
          setPatternSections={setPatternSections}
        />
      </View>
    </View>
  );
};

const patternScreenStyling = StyleSheet.create({
  pageContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 1400,
    height: '100%',
  },
  contentBody: {
    width: "100%", 
    flex: 1,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
  },
  editModeSwitchContainer:{
    flex: 1,
    padding: 20,
  },
  addSectionButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
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