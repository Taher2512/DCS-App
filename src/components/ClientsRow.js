import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ClientCard from './ClientCard';
import SeeAllClientsCard from './SeeAllClientsCard';
import {useNavigation} from '@react-navigation/native';
import {trigger} from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const closeIcon = require('../assets/close_3.png');
const emptyIcon = require('../assets/empty_1.png');

const ClientsRow = ({
  category,
  categories,
  setCategories,
  flag,
  setFlag,
  setRemovedCategories,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onLongPress={() => {
        setFlag(1);
        trigger('impactMedium', options);
      }}
      style={[styles.container, styles.shadow]}>
      <View style={styles.rowHeader}>
        <Text style={styles.name}>{category.Category}</Text>
        {flag === 1 ? (
          <TouchableOpacity
            onPress={() => {
              setRemovedCategories(prevCategories => [
                ...prevCategories,
                category.Category,
              ]);
              var index = categories.indexOf(category);
              categories.splice(index, 1);
              setCategories(categories);
            }}
            style={[styles.closeContainer, styles.shadow]}>
            <Image source={closeIcon} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (flag === 0) {
              navigation.navigate('All Category Clients', {
                category: category.Category,
                clients: JSON.parse(category.Clients),
                color: category.Color,
              });
            }
          }}>
          <Text style={styles.all}>See All &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.clientCards}>
        {JSON.parse(category.Clients) === null ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={emptyIcon}
              style={{
                width: '100%',
                height: 70,
                resizeMode: 'contain',
              }}
            />
          </View>
        ) : (
          <FlatList
            data={JSON.parse(category.Clients)?.slice(0, 5)}
            renderItem={({item, index}) => (
              <ClientCard
                key={index}
                cardClient={item}
                color={category.Color}
                flag={flag}
                setFlag={setFlag}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={
              <SeeAllClientsCard
                category={category.Category}
                clients={JSON.parse(category.Clients)}
                length={JSON.parse(category.Clients)?.length - 5}
                color={category.Color}
                flag={flag}
              />
            }
          />
        )}
      </View>
    </Pressable>
  );
};

export default ClientsRow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 5,
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

  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: 600,
  },

  all: {
    fontSize: 13,
    color: 'black',
    fontWeight: 500,
  },

  clientCards: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },

  companyName: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 16,
  },

  closeContainer: {
    position: 'absolute',
    top: -15,
    right: '42%',
    backgroundColor: '#EF5335',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
  },

  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
