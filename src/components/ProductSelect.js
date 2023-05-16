import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const ProductSelect = ({products, selectedProduct, setSelectedProduct}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <DropDownPicker
        listMode="MODAL"
        items={products}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={selectedProduct}
        setValue={val => setSelectedProduct(val)}
        autoScroll
        placeholder="Select Product"
        placeholderStyle={{color: 'gray'}}
      />
    </View>
  );
};

export default ProductSelect;

const styles = StyleSheet.create({});
