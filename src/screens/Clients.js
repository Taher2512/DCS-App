import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import client from '../client';
import ClientsRow from '../components/ClientsRow';

const emptyIcon = require('../assets/empty_1.png');

const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [flag, setFlag] = useState(0);
  const [cancel, setCancel] = useState(false);
  const [removedCategories, setRemovedCategories] = useState([]);

  async function getCategories() {
    try {
      const {data: res, status} = await client.get('retrieveCategories.php');
      if (parseInt(status) === 200) {
        setCategories(res.data);
        setLoading(false);

        if (res.data.length === 0) {
          setEmpty(true);
        }
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  async function removeSelectedCategories() {
    try {
      let {data: res, status} = await client.get('removeCategories.php', {
        params: {categories: removedCategories},
      });

      if (status === 200) {
        // console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      Alert.alert('Error', "Couldn't remove categories :/");
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, [cancel]);

  return (
    <View style={styles.container}>
      {flag === 1 ? (
        <View style={styles.btnContainer}>
          <Button
            onPress={() => {
              setFlag(0);
              setCancel(!cancel);
              setRemovedCategories([]);
            }}
            color="#EF5335"
            title="Cancel"
          />
          <Button
            onPress={() => {
              removeSelectedCategories();
              setRemovedCategories([]);
              setFlag(0);
              setCancel(!cancel);
            }}
            color="#388E3C"
            title="Done"
          />
        </View>
      ) : null}

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
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={({item, index}) => (
            <ClientsRow
              key={index}
              category={item}
              flag={flag}
              setFlag={setFlag}
              categories={categories}
              setCategories={setCategories}
              setRemovedCategories={setRemovedCategories}
            />
          )}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getCategories} />
          }
        />
      )}
    </View>
  );
};

export default Clients;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '84%',
  },

  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
});
