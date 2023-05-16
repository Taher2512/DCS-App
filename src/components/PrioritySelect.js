import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const PrioritySelect = ({selectedPriority, setSelectedPriority}) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorities = [
    {value: 'Medium', label: 'Medium'},
    {value: 'High', label: 'High'},
    {value: 'Low', label: 'Low'},
  ];

  return (
    <View>
      <DropDownPicker
        listMode="MODAL"
        items={priorities}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedPriority}
        setValue={val => setSelectedPriority(val)}
        autoScroll
        placeholder="Priority"
        placeholderStyle={{color: 'gray'}}
      />
    </View>
  );
};

export default PrioritySelect;

const styles = StyleSheet.create({});
