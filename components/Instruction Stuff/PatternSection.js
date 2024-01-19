import React, {useState } from "react";
import { View, Button, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {InstructionSection} from "./InstructionSection";

export const PatternSection = () => {
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
        <ScrollView style={{width: '100%'}}>
            <View style={patternSectionStyling.sectionContent}>
                <TouchableOpacity onPress={toggleSection}>
                    <View style={[patternSectionStyling.header, { borderBottomWidth: isCollapsed ? 1 : 2 }]}>
                        <View style={patternSectionStyling.headerTextContainer}>
                            <Text>SECTION</Text>
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

            <Modal
                visible={isModalVisible}
                onRequestClose={onCloseModal}
                animationType="slide"
                transparent={true} // Make the modal's background transparent
                >
                <View style={patternSectionStyling.modalOuter}>
                    <View style={patternSectionStyling.modalInner}>
                        <View style={patternSectionStyling.modalContent}>
                            <View>
                                <Text style={patternSectionStyling.modalContentHeaderText}>Add New Instruction:</Text>
                            </View>
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
                        </View>
                        <View style={patternSectionStyling.modalButtonContainer}>
                            <TouchableOpacity onPress={onCloseModal} style={patternSectionStyling.modalButtons}> 
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onSubmitModal} style={patternSectionStyling.modalButtons}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
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
    modalOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalInner: {
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        width: '100%',
    },
    modalContentHeaderText: {
        fontWeight: 'bold',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        columnGap: 10,
        width: '100%',
    },
    modalButtons:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderWidth: 1,
        borderRadius: 8,
    },
    modalBody: {
        padding: 10,
        gap: 10,
        width: '100%',
        maxWidth: 300,
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