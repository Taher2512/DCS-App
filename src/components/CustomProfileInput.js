import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomProfileInput = props => {
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
        value={value}
        onChangeText={text => {
          onChange(name)(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        secureTextEntry={
          name === 'password' || name === 'confirm' ? true : false
        }
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export default CustomProfileInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  textInput: {
    backgroundColor: 'white',
    color: 'black',
    width: '93%',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 9,
    marginBottom: 5,
    fontSize: 14,
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
