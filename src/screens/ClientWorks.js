import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo, useEffect, useState} from 'react';
import client from '../client';
import WorkCard from '../components/WorkCard';
import UpdateStatusModal from '../components/UpdateStatusModal';
import {RadioGroup} from 'react-native-radio-buttons-group';

const emptyIcon = require('../assets/empty_1.png');

const ClientWorks = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [modalWork, setModalWork] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [works, setWorks] = useState([]);
  const [workStatus, setWorkStatus] = useState(999);
  const [refreshing, setRefreshing] = useState(false);

  const {cardClient} = route.params;

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

  async function getWorks() {
    setLoading(true);
    try {
      let {data: res, status} = await client.get('retrieveClientWorks.php', {
        params: {client: cardClient, status: workStatus},
      });

      if (parseInt(status) === 200) {
        setWorks(res.data);
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

  useEffect(() => {
    getWorks();
  }, [workStatus]);

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.header, styles.shadow]}>
          <Text style={styles.headerText}>{cardClient}</Text>
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

      {/* Start:: Modal */}
      <UpdateStatusModal
        modalWork={modalWork}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {/* End:: Modal */}

      {/* Begin:: Works list */}
      <View style={styles.worksContainer}>
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
            data={works}
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
              <RefreshControl refreshing={refreshing} onRefresh={getWorks} />
            }
          />
        )}
      </View>
      {/* End:: Works list */}
    </View>
  );
};

export default ClientWorks;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },

  header: {
    backgroundColor: 'white',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: 'black',
    textAlign: 'center',
  },

  worksContainer: {
    height: '87%',
    paddingTop: 5,
  },
});
