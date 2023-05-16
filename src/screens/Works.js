import {
  StyleSheet,
  Alert,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import client from '../client';
import {ALIGNMENT} from '../constants';
import DateNode from '../components/DateNode';
import {useDispatch, useSelector} from 'react-redux';
import WorkCard from '../components/WorkCard';
import {worksSlice} from '../store/worksSlice';
import UpdateStatusModal from '../components/UpdateStatusModal';

const emptyIcon = require('../assets/empty_1.png');

const Works = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalWork, setModalWork] = useState({});
  const [highPriority, setHighPriority] = useState(0);
  const [mediumPriority, setMediumPriority] = useState(0);
  const [lowPriority, setLowPriority] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [empty, setEmpty] = useState(true);

  const sidebarDate = useSelector(state => state.works.date);
  const splitSidebarDate = sidebarDate.split('/');

  const selectedWorks = useSelector(state => state.works.works);
  const dates = useSelector(state => state.works.headerDates);

  const dispatch = useDispatch();
  const logUser = useSelector(state => state.works.user.username);

  async function getWorks() {
    try {
      var temp_dates = [];

      const {data: res, status} = await client.get('retrieveWorks.php', {
        params: {log_user: logUser},
      });

      if (parseInt(status) === 200) {
        res.data.map(work => {
          var searchDate = temp_dates.includes(work.Date);
          if (!searchDate) {
            temp_dates = [...temp_dates, work.Date];
          }
        });
        dispatch(worksSlice.actions.setHeaderDates(temp_dates));

        if (res.data.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      } else {
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      setEmpty(true);
      console.log(err);
    }
  }

  async function getInitialWorks() {
    try {
      var temp_works = [];

      var temp_high_pr = 0;
      var temp_medium_pr = 0;
      var temp_low_pr = 0;

      const {data: res, status} = await client.get('retrieveWorks.php', {
        params: {log_user: logUser},
      });

      if (parseInt(status) === 200) {
        res.data.map(work => {
          var searchWorks = work.Date === sidebarDate;
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

        if (res.data.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      } else {
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  useEffect(() => {
    getWorks();
    getInitialWorks();
  }, []);

  return (
    <View style={styles.container}>
      {/* Start:: Modal */}
      <UpdateStatusModal
        modalWork={modalWork}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getInitialWorks={getInitialWorks}
      />
      {/* End:: Modal */}

      {/* Begin:: Sidebar */}
      <View style={styles.header}>
        <View style={styles.displayDate}>
          <Text style={styles.dateDay}>{splitSidebarDate[0]}</Text>
          <Text style={styles.dateMonth}>{splitSidebarDate[1]}</Text>
          <View style={styles.priorityContainer}>
            <Text style={[styles.highPriority, styles.priorityText]}>
              {highPriority}
            </Text>
            <Text style={[styles.mediumPriority, styles.priorityText]}>
              {mediumPriority}
            </Text>
            <Text style={[styles.lowPriority, styles.priorityText]}>
              {lowPriority}
            </Text>
          </View>
        </View>

        {/* Begin:: Header */}
        <View style={styles.datesContainer}>
          <FlatList
            data={dates}
            renderItem={({item, index}) => (
              <DateNode
                key={index}
                index={index}
                date={item}
                setLoading={setLoading}
                setHighPriority={setHighPriority}
                setMediumPriority={setMediumPriority}
                setLowPriority={setLowPriority}
              />
            )}
            // keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* End:: Header */}
      </View>
      {/* End:: Sidebar */}

      {/* Begin:: Works list */}
      <View style={styles.cardContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : empty ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={emptyIcon}
              style={{width: '100%', height: '80%', resizeMode: 'contain'}}
            />
          </View>
        ) : (
          <FlatList
            data={selectedWorks}
            renderItem={({item, index}) => (
              <WorkCard
                key={index}
                work={item}
                setModalVisible={setModalVisible}
                setModalWork={setModalWork}
              />
            )}
            // keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getInitialWorks}
              />
            }
          />
        )}
      </View>
      {/* End:: Works list */}
    </View>
  );
};

export default Works;

const styles = StyleSheet.create({
  displayDate: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#B2BEB5',
  },

  header: {
    marginHorizontal: ALIGNMENT.marginHorizontal,
    marginTop: 10,
    marginBottom: 7,
    flexDirection: 'row',
  },

  dateDay: {
    fontWeight: 700,
    fontSize: 40,
  },

  dateMonth: {
    fontWeight: 700,
    fontSize: 30,
  },

  datesContainer: {
    flex: 1,
  },

  cardContainer: {
    marginBottom: '102%',
  },

  worksContainer: {
    flexDirection: 'column',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },

  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  tasksLength: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 10,
  },

  priorityContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },

  priorityText: {
    color: 'white',
    fontWeight: 600,
    borderRadius: 5,
    padding: 4,
    paddingVertical: 0.6,
    margin: 2,
    fontSize: 14,
  },

  highPriority: {
    backgroundColor: '#EF5350',
  },

  mediumPriority: {
    backgroundColor: '#616161',
  },

  lowPriority: {
    backgroundColor: '#1976D2',
  },
});
