import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';

const dotIcon = require('../assets/3dots.png');

const WorkCard = ({work, setModalVisible, setModalWork, getWorks}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Remarks', {
          remarks: JSON.parse(work.Remarks),
          work_order: work.Work_Order,
        })
      }
      style={styles(work).card}>
      <View style={styles(work).cardHeader}>
        <View style={styles(work).orderStatusContainer}>
          <View style={styles(work).workStatusContainer}>
            <Text style={styles(work).workStatus}>⦿</Text>
          </View>
          <Text style={styles(work).workOrder}>{work.Work_Order}</Text>
        </View>
        <Menu
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <MenuTrigger>
            <Image
              source={dotIcon}
              style={{height: 24, width: 30}}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{borderRadius: 5}}>
            <MenuOption
              onSelect={() => {
                setModalWork(work);
                setModalVisible(true);
              }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 7,
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Update Status</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles(work).cardTitle}>
        <Text style={styles(work).client}>{work.Client}</Text>
      </View>
      <View style={styles(work).cardBody}>
        <Text style={styles(work).desc}>{work.Desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkCard;

const styles = work =>
  StyleSheet.create({
    card: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 10,
      marginVertical: 10,
      borderWidth: 0.5,
      elevation: 4,
      borderColor:
        work.Priority === 'High'
          ? '#EF5350'
          : work.Priority === 'low'
          ? '#1976D2'
          : '#616161',
    },

    orderStatusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
    },

    workOrder: {
      fontWeight: 700,
      padding: 5,
      paddingStart: 10,
      fontSize: 12,
      color: 'white',
    },

    workStatusContainer: {
      backgroundColor: 'white',
      borderRadius: 50,
      width: 15,
      height: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },

    workStatus: {
      position: 'absolute',
      fontWeight: 700,
      fontSize: 14,

      color:
        work.Status === '0'
          ? '#1976D2'
          : work.Status === '1'
          ? '#388E3C'
          : work.Status === '2'
          ? '#FB8C00'
          : work.Status === '3'
          ? '#6D4C41'
          : '#212121',
    },

    cardHeader: {
      backgroundColor:
        work.Priority === 'High'
          ? '#EF5350'
          : work.Priority === 'Medium'
          ? '#212121'
          : work.Priority === 'Low'
          ? '#1976D2'
          : '#212121',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    client: {
      fontSize: 15,
      fontWeight: 900,
      textAlign: 'center',
      justifyContent: 'center',
      padding: 7,
    },

    desc: {
      padding: 10,
      fontWeight: 400,
      fontSize: 19,
      color: '#36454F',
    },
  });
