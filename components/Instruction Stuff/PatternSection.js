import React, {useState } from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {InstructionSection} from "./InstructionSection";
import {CustomModal} from "../Common Models/CustomModal";

export const PatternSection = ({sectionTitle}) => {
    const [sections, setSections] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [roundStartNum, setRoundStartNum] = useState("");
    const [roundEndNum, setRoundEndNum] = useState("");

    const addInstSec = (startNum, endNum) => {
        const newSec = { title: "Round", startNum: startNum, endNum: endNum};
        setSections(prevSections => [...prevSections, newSec]);
    };

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
                <TouchableOpacity onPress={toggleSection}>
                    <View style={[patternSectionStyling.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
                        <View style={patternSectionStyling.headerTextContainer}>
                            <Text>{sectionTitle}</Text>
                        </View>
                        <View style={patternSectionStyling.toggleIconContainer}>
                            <Text>{isCollapsed ? '^' : '-'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={isCollapsed}>
                    {sections.map((sec, index) => (
                        <View key={index}>
                            <InstructionSection
                                title={sec.title}
                                startNum = {sec.startNum}
                                endNum = {sec.endNum}
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
})