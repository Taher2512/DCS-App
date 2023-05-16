import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {worksSlice} from '../store/worksSlice';
import client from '../client';

const DateNode = ({
  date,
  index,
  setLoading,
  setHighPriority,
  setMediumPriority,
  setLowPriority,
}) => {
  var newDate = date.split('/');

  var selectedDate = useSelector(state => state.works.date);

  const dispatch = useDispatch();
  const logUser = useSelector(state => state.works.user.username);

  async function setDate() {
    try {
      setLoading(true);

      dispatch(worksSlice.actions.setDate(date));

      var temp_works = [];

      var temp_high_pr = 0;
      var temp_medium_pr = 0;
      var temp_low_pr = 0;

      const {data: res, status} = await client.get('retrieveWorks.php', {
        params: {log_user: logUser},
      });
      if (parseInt(status) === 200) {
        res.data.map(work => {
          var searchWorks = work.Date === date;
          if (searchWorks) {
            temp_works = [...temp_works, work];

            if (work.Priority === 'High') {
              temp_high_pr++;
            } else if (work.Priority === 'Medium') {
              temp_medium_pr++;
            } else if (work.Priority === 'Low') {
              temp_low_pr++;
            }
          }
        });
        dispatch(worksSlice.actions.setWorks(temp_works));
        setLoading(false);

        setHighPriority(temp_high_pr);
        setMediumPriority(temp_medium_pr);
        setLowPriority(temp_low_pr);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  return (
    <View style={styles.nodeContainer}>
      <TouchableOpacity
        onPress={setDate}
        style={
          date === selectedDate
            ? [styles.node, styles.selectedNode]
            : [styles.node, styles.unselectedNode]
        }>
        <Text
          style={
            date === selectedDate
              ? [styles.nodeText, styles.selectedNodeText]
              : [styles.nodeText]
          }>
          {newDate[0]}
        </Text>
      </TouchableOpacity>
      <View style={index !== 0 ? styles.nodeLine : null}></View>
      <Text style={styles.nodeMonth}>{newDate[1]}</Text>
    </View>
  );
};

export default DateNode;

const styles = StyleSheet.create({
  nodeContainer: {
    alignItems: 'center',
  },

  node: {
    padding: 10,
    margin: 10,
    marginVertical: 25,
    marginBottom: 7,
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    elevation: 5,
    position: 'relative',
    borderWidth: 0.5,
  },

  unselectedNode: {
    backgroundColor: 'white',
  },

  selectedNode: {
    backgroundColor: '#212121',
  },

  nodeText: {
    fontWeight: 600,
    fontSize: 18,
  },

  selectedNodeText: {
    color: 'white',
  },

  nodeLine: {
    width: '100%',
    borderTopWidth: 2,
    position: 'absolute',
    left: -10,
    top: 50,
    zIndex: -10,
    borderTopColor: 'gray',
  },

  nodeMonth: {
    fontWeight: 700,
    fontSize: 17,
  },
});
