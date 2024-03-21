import React, {useState } from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { InstructionSection } from "../Instruction Section/InstructionSection";
import { EditOrInfoButton } from "../../Common Models/EditOrInfoButton";
import { AddEditPatternSectionModal } from "./AddEditPatternSectionModal";
import { AddEditInstructionSectionModal } from "../Instruction Section/AddEditInstructionSectionModal";
import { ColorCalculator } from "../../Tools/ColorCalculator";
import { CommonButton } from "../../Common Models/CommonButton";
import { SpecialInstructionModal } from "../../Common Models/SpecialInstructionModal";

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
export const PatternSection = ({isViewMode, patternSectionInfo, editFunc, deleteFunc, backgroundColorInfo}) => {
    const [instructionSections, setInstructionSections] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isInstructionSectionModalVisible, setIsInstructionSectionModalVisible] = useState(false);
    const [isPatternSectionEditModalVisible, setIsPatternSectionEditModalVisible] = useState(false);
    const [isSpecialInstructionModalVisible, setIsSpecialInstructionModalVisible] = useState(false);
    const gradientArray = ColorCalculator.createGradient(backgroundColorInfo.colorStart, backgroundColorInfo.colorEnd, instructionSections.length+1);
    const isInfoDisabled = patternSectionInfo.specialInstruction.trim().length == 0;

    if(isInfoDisabled){
        patternSectionInfo.specialInstructions = "";
    }

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

    // Called after special instruction modal closing tasks are performed
    const onCloseSpecialInstructionModal = () =>{
        setIsSpecialInstructionModalVisible(false);
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
                            onInfoPress={() => setIsSpecialInstructionModalVisible(true)}
                            isInfoDisabled={isInfoDisabled}
                            extraStyle={{borderWidth: 0, width: 60, aspectRatio: 'auto'}}
                        />
                        <Pressable onPress={toggleSection} style={patternSectionStyling.headerTextAndToggleContainer}>
                            <View style={patternSectionStyling.headerTextContainer}>
                                <Text style={patternSectionStyling.headerText}>{patternSectionInfo.sectionTitle}</Text>
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
                    <View style={[patternSectionStyling.lowerPatternSectionContainer, 
                                    {
                                        borderTopWidth: instructionSections.length == 0 ? 0: 2,
                                        backgroundColor: backgroundColorInfo?.colorStart
                                    }
                                ]}
                    >
                        <View style={patternSectionStyling.repetitionContainer}>
                                <Text style={patternSectionStyling.repetitionText}>
                                    {"x" + patternSectionInfo.repetitions}
                                </Text>
                        </View>
                        <View style={patternSectionStyling.addInstructionSectionButtonContainer}>
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
                currentInfo={patternSectionInfo}
            />

            <AddEditInstructionSectionModal
                modalMode={"add"}
                onCloseModal={onCloseInstructionSectionAddModal}
                isModalVisible={isInstructionSectionModalVisible}
                addFunc={addInstructionSection}
            />

            <SpecialInstructionModal
                isVisible={isSpecialInstructionModalVisible}
                onClose={onCloseSpecialInstructionModal}
                specialInstruction={patternSectionInfo.specialInstruction}
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
        minHeight: 60,
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
        padding: 10,
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
    lowerPatternSectionContainer: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: 'darkorange',
    },
    addInstructionSectionButtonContainer: {
        flex: 3,
        padding: 5,
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    repetitionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    repetitionText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});