import React, {useState } from "react";
import { View, Button, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {InstructionSection} from "../Instruction Section/InstructionSection";
import {CustomModal} from "../../Common Models/CustomModal";
import { EditOrInfoButton } from "../../Common Models/EditOrInfoButton";
import { AddEditPatternSectionModal } from "./AddEditPatternSectionModal";

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
export const PatternSection = ({isViewMode, sectionTitle, editFunc, deleteFunc}) => {
    const [sections, setSections] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isInstructionSectionModalVisible, setIsInstructionSectionModalVisible] = useState(false);
    const [isPatternSectionEditModalVisible, setIsPatternSectionEditModalVisible] = useState(false);
    const [roundStartNum, setRoundStartNum] = useState("");
    const [roundEndNum, setRoundEndNum] = useState("");

    //creates instruction sections with inputted range
    const addInstSec = (startNum, endNum) => {
        const newSec = { title: "Round", startNum: startNum, endNum: endNum};
        setSections(prevSections => [...prevSections, newSec]);
    };

    //removes instruction section, passed into the instruction section so it can remove itself
    const removeInstSec = (index) => {
        const newSecs = sections.filter((_, i) => i !== index);
        setSections(newSecs);
    }

    //toggles the collapsable part of the pattern section
    const toggleSection = () => {
        setIsCollapsed(!isCollapsed);
    };

    const onCloseModal = () =>{
        setRoundStartNum("");
        setRoundEndNum("");
        
        setIsInstructionSectionModalVisible(false);
    }

    const onClosePatternSectionEditModal = () =>{
        setIsPatternSectionEditModalVisible(false);
    }
    
    const onSubmitModal = () =>{
        addInstSec(roundStartNum, roundEndNum);
    
        onCloseModal();
    }

    return(
        <View style={{width: '100%'}}>
            <View style={patternSectionStyling.sectionContent}>
                    <View style={[patternSectionStyling.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
                        <EditOrInfoButton 
                            isViewMode={isViewMode}
                            onEditPress={() => setIsPatternSectionEditModalVisible(true)}
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
                <Collapsible collapsed={isCollapsed}>
                    {sections.map((sec, index) => (
                        <View key={index}>
                            <InstructionSection
                                title={sec.title}
                                startNum = {sec.startNum}
                                endNum = {sec.endNum}
                                deleteInstructionSectionFunc={() => removeInstSec(index)}
                            />
                        </View>
                    ))}
                    <View style={{borderTopWidth: sections.length == 0 ? 0: 2}}>
                        <Button title="Add Instruction Section" onPress={() => setIsInstructionSectionModalVisible(true)} />
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

            <CustomModal
                isVisible={isInstructionSectionModalVisible}
                headerText={"Add New Section:"}
                onClose={onCloseModal}
                onSubmit={onSubmitModal}
            >
                <View style={patternSectionStyling.modalBody}>
                    <View style={patternSectionStyling.modalTextInputContainer}>
                        <Text>Round Start: </Text>
                        <TextInput 
                            style={patternSectionStyling.modalTextInput}
                            value={roundStartNum}
                            onChangeText={setRoundStartNum}
                            placeholder={"ex: 3"} 
                            placeholderTextColor={"lightgrey"}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={patternSectionStyling.modalTextInputContainer}>
                        <Text>Round End: </Text>
                        <TextInput 
                            style={patternSectionStyling.modalTextInput}
                            value={roundEndNum}
                            onChangeText={setRoundEndNum}
                            placeholder={"ex: 4"} 
                            placeholderTextColor={"lightgrey"}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </CustomModal>
        </View>
    );
};

const patternSectionStyling = StyleSheet.create({
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
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleIconContainer: {
        width: 60,
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    sectionContent: {
        margin: 5,
        borderWidth: 2,
    },
    modalBody: {
        gap: 5,
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