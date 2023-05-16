import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomSelect = props => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: {name, onChange, value},
    form: {errors, touched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="MODAL"
        items={props.items}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={value}
        autoScroll
        placeholder="Select Type..."
        placeholderStyle={{color: 'gray'}}
        onSelectItem={item => {
          onChange(name)(item.value);
        }}
        {...inputProps}
        style={hasError && styles.errorInput}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomSelect;

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
