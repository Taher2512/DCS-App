import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const SeeAllClientsCard = ({category, clients, length, color, flag}) => {
  const navigation = useNavigation();

  if (Math.sign(length) === 1) {
    return (
      <View>
        {}
        <TouchableOpacity
          onPress={() => {
            if (flag === 0) {
              navigation.navigate('All Category Clients', {
                category: category,
                clients: clients,
                color: color,
              });
            }
          }}
          style={styles.container(color)}>
          <Text style={styles.text}>See All</Text>
          <Text style={styles.text}>(+{length})</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return;
};

export default SeeAllClientsCard;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: '#D0D0D0',
    marginRight: 15,
    borderRadius: 10,
    width: 110,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: color,
  }),

  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
});
