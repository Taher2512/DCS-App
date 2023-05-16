import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DateSelector = ({placeholder, onChange, value: date}) => {
  const [open, setOpen] = useState(false);
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <View style={styles.inputContainer}>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        caretHidden
        value={
          date.getDate().toString() +
          '-' +
          month[date.getMonth()] +
          '-' +
          date.getFullYear().toString()
        }
        onPressOut={() => setOpen(true)}
      />
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 15,
    fontSize: 17,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 19,
    elevation: 5,
  },
});
