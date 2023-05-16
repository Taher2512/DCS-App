import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const TypeSelect = ({selectedType, setSelectedType}) => {
  const [isOpen, setIsOpen] = useState(false);

  const types = [
    {value: 'New Project', label: 'New Project'},
    {value: 'Add Module', label: 'Add Module'},
    {value: 'Small Updates', label: 'Small Updates'},
    {value: 'Bug Fixes', label: 'Bug Fixes'},
    {value: 'Outdoor Work', label: 'Outdoor Work'},
    {value: 'Payment Follow Up', label: 'Payment Follow Up'},
  ];

  return (
    <View>
      <DropDownPicker
        listMode="MODAL"
        items={types}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedType}
        setValue={val => setSelectedType(val)}
        autoScroll
        placeholder="Type"
        placeholderStyle={{color: 'gray'}}
      />
    </View>
  );
};

export default TypeSelect;

const styles = StyleSheet.create({});
