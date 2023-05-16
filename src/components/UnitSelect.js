import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const UnitSelect = ({selectedUnit, setSelectedUnit}) => {
  const [isOpen, setIsOpen] = useState(false);

  const units = [
    {value: 'PCS', label: 'PCS'},
    {value: 'NOS', label: 'NOS'},
    {value: 'SETS', label: 'SETS'},
    {value: 'MTR', label: 'MTR'},
  ];

  return (
    <View>
      <DropDownPicker
        listMode="MODAL"
        items={units}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedUnit}
        setValue={val => setSelectedUnit(val)}
        autoScroll
        placeholder="Unit"
        placeholderStyle={{color: 'gray'}}
      />
    </View>
  );
};

export default UnitSelect;

const styles = StyleSheet.create({});
