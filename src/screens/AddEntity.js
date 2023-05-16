import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EntityCard from '../components/EntityCard';

const AddEntity = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <EntityCard
          logo_uri={require('../assets/add_work_logo_1.png')}
          text={'Add Work'}
          navigateText={'Add Work'}
        />
        <EntityCard
          logo_uri={require('../assets/add_payment_link_logo_1.png')}
          text={'Payment Link'}
          navigateText={'Add Payment Link'}
        />
      </View>

      <View style={styles.block}>
        <EntityCard
          logo_uri={require('../assets/add_client_logo_1.png')}
          text={'Add Client'}
          navigateText={'Add Client'}
        />
        <EntityCard
          logo_uri={require('../assets/add_category_logo_1.png')}
          text={'Add Category'}
          navigateText={'Add Category'}
        />
      </View>
    </View>
  );
};

export default AddEntity;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  block: {
    flexDirection: 'row',
  },
});
