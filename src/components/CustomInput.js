import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, setFieldTouched, touched},
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
          if (props.checkCategory) {
            props.checkCategory(text);
          }
        }}
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

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  textInput: {
    backgroundColor: 'white',
    color: 'black',
    width: '96%',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
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
