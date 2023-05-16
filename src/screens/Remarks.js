import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Remark from '../components/Remark';

const Remarks = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {remarks, work_order, getWorks} = route.params;
  const len = remarks.length;

  return (
    <View>
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.headerText}>{work_order}</Text>
      </View>
      <FlatList
        data={remarks.reverse()}
        renderItem={({item, index}) => (
          <Remark key={index} remark={item} index={index} len={len} />
        )}
        style={styles.remarksList}
      />
    </View>
  );
};

export default Remarks;

const styles = StyleSheet.create({
  remarksList: {
    marginBottom: 105,
  },

  header: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 23,
    fontWeight: 700,
    color: 'black',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
