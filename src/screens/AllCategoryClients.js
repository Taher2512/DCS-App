import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ClientCard from '../components/ClientCard';
import client from '../client';

const emptyIcon = require('../assets/empty_1.png');

const AllCategoryClients = ({route}) => {
  const [isAllClientsScreen, setIsAllClientsScreen] = useState(true);
  const [flag, setFlag] = useState(0);
  const [removedClients, setRemovedClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const {category, color} = route.params;

  const getCategoryClients = async () => {
    try {
      const {data: res, status} = await client.get(
        'retrieveCategoryClients.php',
        {
          params: {category},
        },
      );

      if (status === 200) {
        setClients(JSON.parse(res.data[0].Clients));
        setLoading(false);

        if (!JSON.parse(res.data[0].Clients)) {
          setEmpty(true);
        }
      } else {
        setLoading(false);
        setEmpty(true);
      }
    } catch (err) {
      Alert.alert('Error', 'There were some errors fetching the data :/');
      setLoading(false);
      console.log(err);
    }
  };

  async function removeSelectedClients() {
    try {
      let {data: res, status} = await client.get('removeCategoryClients.php', {
        params: {clients, category},
      });

      if (status === 200) {
        // console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      Alert.alert('Error', "Couldn't remove clients :/");
      console.log(err);
    }
  }

  useEffect(() => {
    getCategoryClients();
  }, [cancel]);

  return (
    <View style={styles.container}>
      <View style={[styles.header(color), styles.shadow]}>
        <Text style={styles.headerText}>{category}</Text>
      </View>
      {flag === 1 ? (
        <View style={styles.btnContainer}>
          <Button
            onPress={() => {
              setFlag(0);
              setCancel(!cancel);
            }}
            color="#EF5335"
            title="Cancel"
          />
          <Button
            onPress={() => {
              removeSelectedClients();
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
              width: Dimensions.get('window').width,
              resizeMode: 'contain',
            }}
          />
        </View>
      ) : (
        <FlatList
          data={clients}
          renderItem={({item, index}) => (
            <ClientCard
              key={index}
              cardClient={item}
              color={color}
              isAllClientsScreen={isAllClientsScreen}
              flag={flag}
              setFlag={setFlag}
              setRemovedClients={setRemovedClients}
              clients={clients}
              setClients={setClients}
            />
          )}
          numColumns={3}
        />
      )}
    </View>
  );
};

export default AllCategoryClients;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 35,
  },

  header: color => ({
    backgroundColor: 'white',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: color,
    marginBottom: 50,
  }),

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

  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
});
