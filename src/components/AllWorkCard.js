import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AllWorkCard = ({work}) => {
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
          <Text style={styles(work).workOrder}>{work.Work_Order}</Text>
          <Text style={styles(work).workStatus}>
            {work.Status === '0'
              ? 'Pending'
              : work.Status === '1'
              ? 'Completed'
              : work.Status === '2'
              ? 'In-Progress'
              : work.Status === '3'
              ? 'Client Approval'
              : 'Cancelled'}
          </Text>
        </View>
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

export default AllWorkCard;

const styles = work =>
  StyleSheet.create({
    card: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 10,
      marginVertical: 10,
      elevation: 3,
      // borderWidth:
      //   work.Priority === 'High' ? 1.8 : work.Priority === 'Medium' ? 0.5 : 1.8,
      // borderColor:
      //   work.Priority === 'High'
      //     ? 'red'
      //     : work.Priority === 'Medium'
      //     ? 'black'
      //     : 'blue',

      // borderWidth: work.Status === '0' ? 2 : work.Status === '2' ? 2 : 0.5,
      borderWidth: 0.5,
      borderColor:
        work.Priority === 'High'
          ? '#EF5350'
          : work.Priority === 'Low'
          ? '#1976D2'
          : '#616161',
    },

    orderStatusContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },

    workOrder: {
      fontWeight: 700,
      fontSize: 12,
      color: 'white',
    },

    workStatus: {
      color: 'white',
      fontWeight: 700,
      fontSize: 14,

      //   color:
      //     work.Status === '0'
      //       ? 'blue'
      //       : work.Status === '1'
      //       ? 'green'
      //       : work.Status === '2'
      //       ? 'orange'
      //       : work.Status === '3'
      //       ? 'brown'
      //       : 'black',
    },

    cardHeader: {
      // backgroundColor:
      //   work.Status === '0'
      //     ? 'blue'
      //     : work.Status === '2'
      //     ? 'orange'
      //     : work.Status === '3'
      //     ? 'black'
      //     : 'black',

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
      // textDecorationLine: 'underline',
    },

    desc: {
      padding: 10,
      fontWeight: 400,
      fontSize: 19,
      color: '#36454F',
    },
  });
