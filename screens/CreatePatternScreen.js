import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { PatternSection } from '../components/Instruction Stuff/Pattern Section/PatternSection';
import { CustomModal } from '../components/Common Models/CustomModal'

// Create Pattern Screen
// Description:
// Hosts all the pattern sections for pattern creation
// Allows user to add pattern sections, prompts user with a modal to give the pattern section a name
function CreatePatternScreen(){
  const [sections, setSections] = useState([{sectionTitle: "Test Section"}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patSecName, setPatSecName] = useState("");

  let isViewMode = false; //Add conditional behavior for view/(edit/create)

  const [modalMode, setModalMode] = useState("");  //Either 'add' or 'edit'
  const [modalHeader, setModalHeader] = useState("");
  const [editPatternIndex, setEditPatternIndex] = useState(-1);


  // adds pattern sections to the page
  const addPatternSection = (sectionTitle) => {
    let newSec = {sectionTitle: sectionTitle};
    setSections(prevSections => [...prevSections, newSec]);
  };

  const editPatternSection = (newSectionTitle, index) => {
    let newSections = sections.map((section, idx) => {
      if (idx === index) {
        return { ...section, sectionTitle: newSectionTitle };
      }

      return section;
    });
  
    setSections(newSections);
  };

  // deletes pattern sections, passed to the pattern section so it can remove itself
  const deletePatternSec = (index) => {
    const newSecs = sections.filter((_, i) => i !== index);
    setSections(newSecs);

    onCloseModal();
  }

  // Opens modal in the 'add' mode
  const onOpenAddModal = () => {
    setModalMode("add");
    setModalHeader("Add New Section");

    setIsModalVisible(true);
  };

  // Opens modal in the 'edit' mode
  // 'index' represents the index of the pattern section being edited
  const onOpenEditModal = (index) => {
    setModalMode("edit");
    setModalHeader("Edit Section");

    setEditPatternIndex(index);
    setPatSecName(sections[index].sectionTitle);

    setIsModalVisible(true);
  };

  const onCloseModal = () =>{
    setPatSecName("");
    setModalMode("");
    setModalHeader("");
    setEditPatternIndex(-1);
    
    setIsModalVisible(false);
  }

  const onSubmitModal = () =>{
    switch(modalMode) {
      case "add":
        addPatternSection(patSecName);
        break;
      case "edit":
        editPatternSection(patSecName, editPatternIndex);
        break;
    }

    onCloseModal();
  }

  return (
    <View style={{alignItems: 'center'}}>
      <View style={patternScreenStyling.pageContentContainer}>
        <ScrollView style={patternScreenStyling.contentBody}>
          {sections.map((sec, index) => (
                              <View key={index}>
                                  <PatternSection 
                                    sectionTitle={sec.sectionTitle}
                                    openEditModal={() => onOpenEditModal(index)}
                                  />
                              </View>
                          ))}
        </ScrollView>
        <View style={patternScreenStyling.addSectionButtonContainer}>
          <Pressable 
            style={patternScreenStyling.addSectionButton}
            onPress={() => onOpenAddModal()}
          >
            <Text>+</Text>
          </Pressable>
        </View>

        {/* 
          Modal for adding pattern sections
          Prompts user for section name 
        */}
        <CustomModal
          isVisible={isModalVisible}
          headerText={modalHeader}
          onClose={onCloseModal}
          onSubmit={onSubmitModal}
          onDelete={() => deletePatternSec(editPatternIndex)}
          showDelete={modalMode === "edit"}
          closeText={"Cancel"}
        >
          <View style={patternScreenStyling.modalTextInputContainer}>
            <Text>Section Name: </Text>
            <TextInput 
              style={patternScreenStyling.modalTextInput}
              value={patSecName}
              onChangeText={setPatSecName}
              placeholder={"ex: Head"} 
              placeholderTextColor={"lightgrey"}
            />
          </View>
        </CustomModal>
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
  addSectionButtonContainer: {
    bottom: 0,
    right: 0,
    height: 100,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  addSectionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextInputContainer:{
    flexDirection: "row",
    justifyContent: 'center',
    gap: 5,
  },
  modalTextInput:{
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
  },
});

export default CreatePatternScreen;