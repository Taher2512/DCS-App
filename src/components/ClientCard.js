import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {trigger} from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const closeIcon = require('../assets/close_3.png');

const ClientCard = ({
  cardClient,
  color,
  isAllClientsScreen,
  flag,
  setFlag,
  setRemovedClients,
  clients,
  setClients,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container(isAllClientsScreen)}>
      <TouchableOpacity
        onPress={() => {
          if (isAllClientsScreen) {
            flag === 0
              ? navigation.navigate('Client Works', {cardClient: cardClient})
              : null;
          } else {
            flag === 0
              ? navigation.navigate('Client Works', {cardClient: cardClient})
              : null;
          }
        }}
        onLongPress={() => {
          trigger('impactMedium', options);
          setFlag(1);
        }}
        style={[styles.subContainer(color, isAllClientsScreen)]}>
        <Text style={styles.client}>{cardClient}</Text>
      </TouchableOpacity>
      {flag === 1 && isAllClientsScreen ? (
        <TouchableOpacity
          onPress={() => {
            setRemovedClients(prevClients => [...prevClients, cardClient]);
            if (isAllClientsScreen) {
              var index = clients.indexOf(cardClient);

              clients.splice(index, 1);
              setClients(clients);
            }
          }}
          style={[styles.closeContainer, styles.shadow]}>
          <Image source={closeIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ClientCard;

const styles = StyleSheet.create({
  container: isAllClientsScreen => ({
    margin: isAllClientsScreen ? 5 : 0,
    marginTop: isAllClientsScreen ? 10 : 0,
  }),

  subContainer: (color, isAllClientsScreen) => ({
    backgroundColor: color,
    marginRight: isAllClientsScreen ? 0 : 15,
    borderRadius: 10,
    width: isAllClientsScreen ? 120 : 110,
    height: isAllClientsScreen ? 110 : 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0.5,
  }),

  client: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
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

  closeContainer: {
    position: 'absolute',
    top: -6,
    right: -4,
    backgroundColor: '#EF5335',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
  },

  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
