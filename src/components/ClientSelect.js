import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ClientSelect = ({
  clients,
  selectedClient,
  setSelectedClient,
  setMobile,
  setEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <DropDownPicker
        listMode="MODAL"
        items={clients}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedClient}
        setValue={val => setSelectedClient(val)}
        autoScroll
        placeholder="Select Client"
        placeholderStyle={{color: 'gray'}}
        searchable
        searchPlaceholder="Search Client..."
        onSelectItem={client => {
          setMobile(client.mobile);
          setEmail(client.email);
        }}
      />
    </View>
  );
};

export default ClientSelect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
