export const StringValidator = {
    enforceNumerics: function(string, setString){
        setString(string.replace(/[^0-9]/g, ''));
    }
}