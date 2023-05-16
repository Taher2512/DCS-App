import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Remark = ({remark, index, len}) => {
  const logDate = new Date(remark.log_date);
  const eta = new Date(remark.eta);

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

  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {logDate.getDate() + ', ' + month[parseInt(logDate.getMonth())]}
          </Text>
          <Text style={styles.date}>{weekday[parseInt(logDate.getDay())]}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={index !== len - 1 ? styles.line : null}></View>
          <Text style={styles.remarkStatus(remark)}>⦿</Text>
        </View>

        <View style={styles.remarkContainer}>
          <Text style={styles.remark}>
            {remark.remarks !== '' ? remark.remarks : '(No Remark)'}
          </Text>
          <Text style={styles.user}>
            {remark.user === 'AUTOMATED' ? 'Automated' : remark.user + ' '} |
            ETA:
            {' ' +
              eta.getDate() +
              '-' +
              month[parseInt(eta.getMonth())] +
              '-' +
              eta.getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Remark;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
  },

  dateContainer: {
    width: '22%',
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: -10,
  },

  date: {
    color: 'black',
    fontSize: 14,
  },

  statusContainer: {
    position: 'absolute',
    left: '21%',
    width: '10%',
    height: '100%',
    top: 10,
  },

  line: {
    position: 'absolute',
    borderLeftWidth: 1.8,
    height: '100%',
    top: '15%',
    left: '17.5%',
  },

  remarkStatus: remark => ({
    fontWeight: 700,
    fontSize: 18,

    color:
      remark.status === '0'
        ? '#1976D2'
        : remark.status === '1'
        ? '#388E3C'
        : remark.status === '2'
        ? '#FB8C00'
        : remark.status === '3'
        ? '#6D4C41'
        : '#212121',
  }),

  remarkContainer: {
    width: '72%',
    paddingVertical: 10,
  },

  remark: {
    marginTop: 3,
    color: 'black',
    fontSize: 15,
  },

  user: {
    paddingTop: 5,
    fontSize: 13,
  },
});
