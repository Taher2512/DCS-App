import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomTextarea = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        multiline={true}
        numberOfLines={3}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomTextarea;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  textInput: {
    backgroundColor: 'white',
    color: 'black',
    width: '97%',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },

  errorText: {
    fontSize: 10,
    color: 'red',
  },

  errorInput: {
    borderColor: 'red',
  },
});
