export const StringValidator = {
    enforceNumerics: function(value){
        return value.replace(/[^0-9]/g, '');
    },

    enforceNumericsLargerThanZero: function(value){
        const numericText = value.replace(/[^0-9]/g, '');

        if(numericText == '' || (parseInt(numericText, 10) > 0)) {
            return numericText;
        }
    },
}