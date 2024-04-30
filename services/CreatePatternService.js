import db from '../database/Database';

export const CreatePatternService = () => {
    // will be called when the pattern is saved in create mode
    const addPatternData = (patternData) => {
        console.log(patternData)
    }

    // will be called when the pattern is saved in edit mode
    const updatePatternData = ({}) => {}

    // will be called to get pattern data when loading
    const getPatternData = ({}) => {}

    return {addPatternData , updatePatternData, getPatternData};
}