import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSelector, useDispatch } from 'react-redux';
import { InstructionSection } from "../Instruction Section/InstructionSection";
import { EditOrInfoButton } from "../../Common Models/Buttons/EditOrInfoButton";
import { AddEditPatternSectionModal } from "./AddEditPatternSectionModal";
import { AddEditInstructionSectionModal } from "../Instruction Section/AddEditInstructionSectionModal";
import { ColorCalculator } from "../../Tools/ColorCalculator";
import { CommonButton } from "../../Common Models/Buttons/CommonButton";
import { SpecialInstructionModal } from "../../Common Models/Modals/SpecialInstructionModal";
import { addInstructionSection, editInstructionSection, deleteInstructionSection } 
    from "../../../redux/slices/PatternSlice";

export const PatternSection = ({ isViewMode, patternSectionInfo, editFunc, deleteFunc, backgroundColorInfo }) => {
    const dispatch = useDispatch();
    const {instructionSectionSet, instructionSectionIds} = useSelector(state => state.pattern.instructionSectionData);
    const relevantInstructionSectionIds = patternSectionInfo.instructionSections;
    const [isInstructionSectionModalVisible, setInstructionSectionModalVisible] = useState(false);
    const [isPatternSectionEditModalVisible, setPatternSectionEditModalVisible] = useState(false);
    const [isSpecialInstructionModalVisible, setSpecialInstructionModalVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const gradientArray = ColorCalculator.createGradient(backgroundColorInfo.colorStart, backgroundColorInfo.colorEnd, relevantInstructionSectionIds.length + 1);
    const isInfoDisabled = patternSectionInfo.specialInstruction.trim().length === 0;

    if(isInfoDisabled){
        patternSectionInfo.specialInstructions = "";
    }

    const getPreviousRoundNum = (idx) =>{
        if(idx > 0){
            let prevSecId = relevantInstructionSectionIds[idx-1];
            let prevSec = instructionSectionSet[prevSecId];
            return prevSec.endNum? prevSec.endNum : prevSec.startNum;
        }
        else{
            return null;
        }
    }
    const handleToggleIsCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    }

    const handleSetPatternSectionEditModalVisible = (isVisible) => {
        setPatternSectionEditModalVisible(isVisible);
    }

    const handleSetInstructionSectionModalVisible = (isVisible) => {
        setInstructionSectionModalVisible(isVisible);
    }

    const handleSetSpecialInstructionModalVisible = (isVisible) => {
        setSpecialInstructionModalVisible(isVisible);
    }

    const handleAddInstructionSection = (instructionSection) => {
        dispatch(addInstructionSection({patternSectionId: patternSectionInfo.id, instructionSection}));
    }

    const handleEditInstructionSection = (id, updates) => {
        dispatch(editInstructionSection({ instructionSectionId: id, updates }));
    }

    const handleDeleteInstructionSection = (id) => {
        dispatch(deleteInstructionSection({patternSectionId: patternSectionInfo.id, instructionSectionId: id})); 
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionContent}>
                <View style={[styles.header, 
                    { 
                        borderBottomWidth: isCollapsed ? 1 : 2,
                        backgroundColor: backgroundColorInfo?.colorStart
                    }
                ]}>
                    <EditOrInfoButton 
                        isViewMode={isViewMode}
                        onEditPress={() => handleSetPatternSectionEditModalVisible(true)}
                        onInfoPress={() => handleSetSpecialInstructionModalVisible(true)}
                        isInfoDisabled={isInfoDisabled}
                        extraStyle={{ borderWidth: 0, width: 60, aspectRatio: 'auto' }}
                    />
                    <Pressable onPress={handleToggleIsCollapsed} style={styles.headerTextAndToggleContainer}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>{patternSectionInfo.title}</Text>
                        </View>
                        <View style={styles.toggleIconContainer}>
                            <Text>{isCollapsed ? '^' : '-'}</Text>
                        </View>
                    </Pressable>
                </View>
                <Collapsible 
                    collapsed={isCollapsed}
                    style={{ backgroundColor: backgroundColorInfo?.colorStart + '80' }}
                >
                    <View style={[styles.patternSectionContent, { padding: relevantInstructionSectionIds.length === 0 ? 0 : 15 }]}>
                        {relevantInstructionSectionIds.map((id, index) => (
                            <InstructionSection
                                key={id}
                                isViewMode={isViewMode}
                                instructionSectionInfo={instructionSectionSet[id]}
                                editFunc={(updates) => handleEditInstructionSection(id, updates)}
                                deleteFunc={() => handleDeleteInstructionSection(id)}
                                backgroundColor={gradientArray[index + 1]}
                            />
                        ))}
                    </View>
                    <View style={[styles.lowerPatternSectionContainer, 
                        {
                            borderTopWidth: relevantInstructionSectionIds.length === 0 ? 0 : 2,
                            backgroundColor: backgroundColorInfo?.colorStart
                        }
                    ]}>
                        <View style={styles.repetitionContainer}>
                            <Text style={styles.repetitionText}>
                                {"x" + patternSectionInfo.repetitions}
                            </Text>
                        </View>
                        <View style={styles.addInstructionSectionButtonContainer}>
                            {!isViewMode && 
                                <CommonButton
                                    label={"ADD INSTRUCTION SECTION"}
                                    onPress={() => handleSetInstructionSectionModalVisible(true)}
                                />
                            }
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </Collapsible>
            </View>

            <AddEditPatternSectionModal
                modalMode="edit"
                onCloseModal={() => handleSetPatternSectionEditModalVisible(false)}
                isModalVisible={isPatternSectionEditModalVisible}
                editFunc={editFunc}
                deleteFunc={deleteFunc}
                currentInfo={patternSectionInfo}
            />

            <AddEditInstructionSectionModal
                modalMode="add"
                onCloseModal={() => handleSetInstructionSectionModalVisible(false)}
                isModalVisible={isInstructionSectionModalVisible}
                previousRoundNum={getPreviousRoundNum(relevantInstructionSectionIds.length)}
                addFunc={handleAddInstructionSection}
            />

            <SpecialInstructionModal
                isVisible={isSpecialInstructionModalVisible}
                onClose={() => handleSetSpecialInstructionModalVisible(false)}
                specialInstruction={patternSectionInfo.specialInstruction}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    headerTextAndToggleContainer: {
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
