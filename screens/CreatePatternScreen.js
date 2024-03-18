import React, {useState, useRef} from 'react';
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
  const scrollViewRef = useRef();
  const gradientArray = colorCalculator.createGradient('#ffc800', '#0febff', patternSections.length);

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
    <View style={patternScreenStyling.outerPageContentContainer}>
      <View style={patternScreenStyling.pageContentContainer}>
        <ScrollView 
          style={patternScreenStyling.contentBody}
          ref={scrollViewRef}
        >
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
          <View style={patternScreenStyling.bottomLeftContainer}>
            <View style={patternScreenStyling.editSwitchContainer}>
              <Text style={patternScreenStyling.editSwitchText}>
                EDIT:
              </Text>
              <Switch
                onValueChange={setIsNotViewMode}
                value={isNotViewMode}
              />
            </View>
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