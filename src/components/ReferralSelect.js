import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ReferralSelect = ({members, selectedReferral, setSelectedReferral}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <DropDownPicker
        listMode="MODAL"
        items={members}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedReferral}
        setValue={val => setSelectedReferral(val)}
        autoScroll
        placeholder="Select Member"
        placeholderStyle={{color: 'gray'}}
      />
    </View>
  );
};

export default ReferralSelect;

const styles = StyleSheet.create({});
