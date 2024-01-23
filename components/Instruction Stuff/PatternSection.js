import React, {useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {InstructionSection} from "./InstructionSection";
import {CustomModal} from "../Common Models/CustomModal";
import { DeleteButton } from "../Common Models/DeleteButton";

export const PatternSection = ({sectionTitle, deletePatternSectionFunc}) => {
    const [sections, setSections] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [roundStartNum, setRoundStartNum] = useState("");
    const [roundEndNum, setRoundEndNum] = useState("");

    const addInstSec = (startNum, endNum) => {
        const newSec = { title: "Round", startNum: startNum, endNum: endNum};
        setSections(prevSections => [...prevSections, newSec]);
    };

    const removeInstSec = (index) => {
        const newSecs = sections.filter((_, i) => i !== index);
        setSections(newSecs);
    }

    const toggleSection = () => {
        setIsCollapsed(!isCollapsed);
    };

    const onCloseModal = () =>{
        setRoundStartNum("");
        setRoundEndNum("");
        
        setIsModalVisible(false);
      }
    
    const onSubmitModal = () =>{
        addInstSec(roundStartNum, roundEndNum);
    
        onCloseModal();
    }

    return(
        <View style={{width: '100%'}}>
            <View style={patternSectionStyling.sectionContent}>
                    <View style={[patternSectionStyling.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
                        <DeleteButton deleteFunc={deletePatternSectionFunc}/>
                        <TouchableOpacity onPress={toggleSection} style={patternSectionStyling.headerTextAndToggleContainer}>
                            <View style={patternSectionStyling.headerTextContainer}>
                                <Text>{sectionTitle}</Text>
                            </View>
                            <View style={patternSectionStyling.toggleIconContainer}>
                                <Text>{isCollapsed ? '^' : '-'}</Text>
                            </View>
                        </TouchableOpacity>
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
                        <Button title="Add Instruction Section" onPress={() => setIsModalVisible(true)} />
                    </View>
                </Collapsible>
            </View>


            <CustomModal
                isVisible={isModalVisible}
                headerText={"Add New Section:"}
                onClose={onCloseModal}
                onSubmit={onSubmitModal}
            >
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
    modalTextInputContainer:{
        flexDirection: "row",
        gap: 5,
    },
    modalTextInput:{
        flex: 1,
        borderWidth: 1,
        borderRadius: 2,
        textAlign: 'center',
    },
});