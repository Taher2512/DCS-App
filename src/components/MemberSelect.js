import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const MemberSelect = ({
  members,
  selectedMember,
  setSelectedMember,
  isAddCategoryScreen,
  memberSelectFocused,
  setMemberSelectFocused,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="MODAL"
        items={members}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedMember}
        setValue={val => setSelectedMember(val)}
        onOpen={() => setMemberSelectFocused(true)}
        autoScroll
        placeholder="Select Member(s)"
        placeholderStyle={{color: 'gray'}}
        multiple
        searchable
        searchPlaceholder="Search..."
        mode="BADGE"
        badgeColors={['#EF5350', '#1976D2', '#8BC34A', '#616161']}
        badgeDotColors={['white']}
        badgeTextStyle={{color: 'white'}}
        style={[
          {height: isAddCategoryScreen ? 55 : 50},
          selectedMember?.length === 0 &&
            memberSelectFocused &&
            styles.errorInput,
        ]}
      />
      {selectedMember?.length === 0 && memberSelectFocused && (
        <Text style={styles.errorText}>Please select assigned to!</Text>
      )}
    </View>
  );
};

export default MemberSelect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
  },

  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 7,
  },

  errorInput: {
    borderColor: 'red',
  },
});
