import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomClientSelect = props => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: {name, onChange, value},
    form: {errors, touched, setFieldValue},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="MODAL"
        items={props.clients}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={value}
        autoScroll
        placeholder="Select Client..."
        placeholderStyle={{color: 'gray'}}
        searchable
        searchPlaceholder="Search Client..."
        onSelectItem={client => {
          onChange(name)(client.value);
          setFieldValue('mobile', client.mobile);
          setFieldValue('email', client.email);
        }}
        {...inputProps}
        style={hasError && styles.errorInput}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomClientSelect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    paddingTop: 10,
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
