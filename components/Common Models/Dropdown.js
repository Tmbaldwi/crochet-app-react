import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    {label: 'ch', value: 'Chain'},
    {label: 'sl st', value: 'Slip Stitch'},
    {label: 'sc', value: 'Single Crochet'},
    {label: 'hdc', value: 'Half Double Crochet'},
    {label: 'dc', value: 'Double Crochet'},
    {label: 'tr', value: 'Treble Crochet'},
    {label: 'dtr', value: 'Double Treble Crochet'},
    {label: 'trtr', value: 'Triple Treble Crochet'},
    {label: 'yo', value: 'Yarn Over'},
    //{label: 'sp(s)', value: 'Space(s)'},
    {label: 'st(s)', value: 'Stitch(es)'},
    {label: 'sk', value: 'Skip'},
    {label: 'tog', value: 'Together'},
    {label: 'inc', value: 'Increase'},
    {label: 'dec', value: 'Decrease'},
    {label: 'fp', value: 'Front Post (as in fpdc - Front Post Double Crochet)'},
    {label: 'bp', value: 'Back Post (as in bpdc - Back Post Double Crochet)'},
    {label: 'lp(s)', value: 'Loop(s)'},
    {label: 'mc', value: 'Magic Circle'},
    {label: 'blo', value: 'Back Loop Only'},
    {label: 'flo', value: 'Front Loop Only'},
    {label: 'pm', value: 'Place Marker'},
    {label: 'rm', value: 'Remove Marker'},
    {label: 'rep', value: 'Repeat'},
    {label: 'alt', value: 'Alternate'},
    {label: 'cont', value: 'Continue'},
    {label: 'sc2tog', value: 'Single Crochet Two Together (a decrease)'},
    {label: 'dc2tog', value: 'Double Crochet Two Together (a decrease)'},
    {label: 'hdc2tog', value: 'Half Double Crochet Two Together (a decrease)'},
    {label: 'tr2tog', value: 'Treble Crochet Two Together (a decrease)'},
    {label: 'bobble', value: 'A bobble stitch'},
    {label: 'puff', value: 'Puff stitch'},
    {label: 'shell', value: 'Shell stitch'},
    {label: 'cl', value: 'Cluster'}
  ];
  

export const DropdownComponent = ({callback}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select stitch' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          callback(item.label);
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    minWidth: 100,
  },
  selectedTextStyle: {
    fontSize: 16,
    minWidth: 100,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});