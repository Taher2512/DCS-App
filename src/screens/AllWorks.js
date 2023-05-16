import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AllWorkCard from '../components/AllWorkCard';
import {worksSlice} from '../store/worksSlice';
import client from '../client';
import DateSelector from '../components/DateSelector';
import {RadioGroup} from 'react-native-radio-buttons-group';

const emptyIcon = require('../assets/empty_1.png');

const AllWorks = () => {
  const date = new Date();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [workStatus, setWorkStatus] = useState(999);
  const [dateFrom, setDateFrom] = useState(
    new Date(date.setDate(date.getDate() - 30)),
  );
  const [dateTo, setDateTo] = useState(
    new Date(date.setDate(date.getDate() + 30)),
  );

  const dispatch = useDispatch();
  const logUser = useSelector(state => state.works.user.username);
  const allWorks = useSelector(state => state.works.allWorks);

  const radioButtons = useMemo(
    () => [
      {
        id: 999, // Acts as primary key, should be unique and non-empty string
        label: 'All',
        color: 'black',
      },
      {
        id: 0,
        label: 'Pending',
        color: '#0047AB',
      },
      {
        id: 2,
        label: 'In-Progress',
        color: '#E49B0F',
      },
      {
        id: 1,
        label: 'Completed',
        color: 'green',
      },
      {
        id: 3,
        label: 'Approval',
        color: 'brown',
      },
    ],
    [],
  );

  async function getAllWorks() {
    setLoading(true);
    try {
      const {data: res, status} = await client.get('allWorks.php', {
        params: {log_user: logUser},
      });
      if (parseInt(status) === 200) {
        dispatch(worksSlice.actions.setAllWorks(res.data));
        setLoading(false);

        if (res.data.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      setLoading(false);
      setEmpty(true);
      console.log(err);
    }
  }

  async function getAllWorksByDate() {
    setLoading(true);
    try {
      const {data: res, status} = await client.get('allWorksByDate.php', {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
          status: workStatus,
          log_user: logUser,
        },
      });
      if (parseInt(status) === 200) {
        dispatch(worksSlice.actions.setAllWorks(res.data));
        setLoading(false);

        if (res.data.length > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      setLoading(false);
      setEmpty(true);
      console.log(err);
    }
  }

  // useEffect(() => {
  //   getAllWorks();
  // }, []);

  useEffect(() => {
    getAllWorksByDate();
  }, [dateFrom, dateTo, workStatus]);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <View style={styles.dateContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.dateText}>Date From:</Text>
              <DateSelector
                placeholder={'Date From'}
                value={dateFrom}
                onChange={setDateFrom}
                style={styles.dateSelector}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.dateText}>Date To:</Text>
              <DateSelector
                placeholder={'Date To'}
                value={dateTo}
                onChange={setDateTo}
                style={styles.dateSelector}
              />
            </View>
          </View>

          {/* Begin:: Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setWorkStatus}
              selectedId={workStatus}
              layout="row"
              containerStyle={{marginHorizontal: 10}}
            />
          </ScrollView>
          {/* End:: Filter */}
        </View>

        {loading ? (
          <ActivityIndicator />
        ) : empty ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={emptyIcon}
              style={{
                width: '100%',
                height: '80%',
                resizeMode: 'contain',
              }}
            />
          </View>
        ) : (
          <FlatList
            data={allWorks}
            renderItem={({item, index}) => (
              <AllWorkCard key={index} work={item} />
            )}
            // keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getAllWorksByDate}
              />
            }
            style={styles.workContainer}
          />
        )}
      </View>
    </View>
  );
};

export default AllWorks;

const styles = StyleSheet.create({
  container: {
    marginBottom: '92%',
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  inputContainer: {
    marginTop: 20,
  },

  dateText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 700,
    color: 'black',
    marginBottom: 6,
  },

  workContainer: {
    height: '92%',
    marginTop: 9,
  },

  filterContainer: {
    width: '100%',
    marginVertical: 0,
  },
});
