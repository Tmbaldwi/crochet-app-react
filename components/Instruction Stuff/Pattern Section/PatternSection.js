import React, {useState } from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionSection } from "../Instruction Section/InstructionSection";
import { EditOrInfoButton } from "../../Common Models/EditOrInfoButton";
import { AddEditPatternSectionModal } from "./AddEditPatternSectionModal";
import { AddEditInstructionSectionModal } from "../Instruction Section/AddEditInstructionSectionModal";
import { colorCalculator } from "../../Tools/ColorCalculator";
import { CommonButton } from "../../Common Models/CommonButton";

// Pattern section
//
// Description:
// Contains groups of individual instruction sections that make up a larger section (such as the head, sleeve, etc.)
// User can add instruction sections with the add button, this will open a modal that prompts the number of rounds they want
// User can collapse the pattern section
// User can delete the pattern section, will also delete nested instruction sections
//
// Usage:
// Must be passed its title, and a function to delete itself from the list
export const PatternSection = ({isViewMode, sectionTitle, editFunc, deleteFunc, backgroundColorInfo}) => {
    const [instructionSections, setInstructionSections] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isInstructionSectionModalVisible, setIsInstructionSectionModalVisible] = useState(false);
    const [isPatternSectionEditModalVisible, setIsPatternSectionEditModalVisible] = useState(false);
    const gradientArray = colorCalculator.createGradient(backgroundColorInfo.colorStart, backgroundColorInfo.colorEnd, instructionSections.length+1);

    //adds instruction sections with inputted range at the end of the list
    const addInstructionSection = (startNum, endNum) => {
        const newSec = { title: "Round", startNum: startNum, endNum: endNum}; //Make round or row selection
        setInstructionSections(prevSections => [...prevSections, newSec]);
    };

    // edits the instruction section at a given index with the new range
    // given to every instruction section with its index inputted
    const editInstructionSection = (newStartNum, newEndNum, index) => {
        let newSections = instructionSections.map((section, idx) => {
          if (idx === index) {
            return { ...section, startNum: newStartNum, endNum: newEndNum };
          }
    
          return section;
        });
      
        setInstructionSections(newSections);
      }

    //removes instruction section at a given index
    // given to every instruction section with its index inputted
    const removeInstructionSection = (index) => {
        const newSecs = instructionSections.filter((_, i) => i !== index);
        setInstructionSections(newSecs);
    }

    //toggles the collapsable part of the pattern section
    const toggleSection = () => {
        setIsCollapsed(!isCollapsed);
    };

    // closes the instruction section add modal
    // called after closing code in the modal is ran
    const onCloseInstructionSectionAddModal = () =>{
        setIsInstructionSectionModalVisible(false);
    }

    // closes the pattern section edit modal
    // called after the closing code in the modal is ran
    const onClosePatternSectionEditModal = () =>{
        setIsPatternSectionEditModalVisible(false);
    }

    return(
        <View style={patternSectionStyling.container}>
            <View style={patternSectionStyling.sectionContent}>
                    <View style={[patternSectionStyling.header, 
                                { 
                                    borderBottomWidth: isCollapsed ? 1 : 2,
                                    backgroundColor: backgroundColorInfo?.colorStart
                                }]}>
                        <EditOrInfoButton 
                            isViewMode={isViewMode}
                            onEditPress={() => setIsPatternSectionEditModalVisible(true)}
                            extraStyle={{borderWidth: 0}}
                        />
                        <Pressable onPress={toggleSection} style={patternSectionStyling.headerTextAndToggleContainer}>
                            <View style={patternSectionStyling.headerTextContainer}>
                                <Text style={patternSectionStyling.headerText}>{sectionTitle}</Text>
                            </View>
                            <View style={patternSectionStyling.toggleIconContainer}>
                                <Text>{isCollapsed ? '^' : '-'}</Text>
                            </View>
                        </Pressable>
                    </View>
                <Collapsible 
                    collapsed={isCollapsed}
                    style={{backgroundColor: backgroundColorInfo?.colorStart + '80'}}
                >
                    <View style={[patternSectionStyling.patternSectionContent, {padding: instructionSections.length == 0? 0: 15}]}>
                        {instructionSections.map((sec, index) => (
                            <View key={index}>
                                <InstructionSection
                                    isViewMode={isViewMode}
                                    title={sec.title}
                                    startNum = {sec.startNum}
                                    endNum = {sec.endNum}
                                    editFunc={(newStartNum, newEndNum) => editInstructionSection(newStartNum, newEndNum, index)}
                                    deleteFunc={() => removeInstructionSection(index)}
                                    backgroundColor={gradientArray[index+1]}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={[patternSectionStyling.addInstructionSectionButtonContainer, 
                                    {
                                        borderTopWidth: instructionSections.length == 0 ? 0: 2,
                                        backgroundColor: backgroundColorInfo?.colorStart
                                    }
                                ]}
                    >
                        <View style={{flex: 1}}/>
                        <View style={{flex: 3}}>
                            {!isViewMode && 
                                <CommonButton
                                    label={"ADD INSTRUCTION SECTION"}
                                    onPress={() => setIsInstructionSectionModalVisible(true)}
                                />
                            }
                        </View>
                        <View style={{flex: 1}}/>
                    </View>
                </Collapsible>
            </View>

            <AddEditPatternSectionModal
                modalMode={"edit"}
                onCloseModal={onClosePatternSectionEditModal}
                isModalVisible={isPatternSectionEditModalVisible}
                editFunc={editFunc}
                deleteFunc={deleteFunc}
                currentSectionTitle={sectionTitle}
            />

            <AddEditInstructionSectionModal
                modalMode={"add"}
                onCloseModal={onCloseInstructionSectionAddModal}
                isModalVisible={isInstructionSectionModalVisible}
                addFunc={addInstructionSection}
            />
        </View>
    );
};

const patternSectionStyling = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
    },
    sectionContent: {
        margin: 5,
        borderWidth: 2,
    },
    header: {
        height: 60,
        backgroundColor: 'darkorange',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextAndToggleContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleIconContainer: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    patternSectionContent: {
        gap: 15,
    },
    addInstructionSectionButtonContainer: {
        flexDirection: 'row',
        height: 55,
        padding: 5,
        backgroundColor: 'darkorange',
    },
});