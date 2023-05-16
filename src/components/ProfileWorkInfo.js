import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileWorkInfo = ({icon, color, number, text}) => {
  return (
    <View style={styles.container(color)}>
      <View style={styles.imgContainer}>
        <Image source={icon} style={styles.img} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default ProfileWorkInfo;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: 'white',
    width: '47%',
    height: 160,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: color,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }),

  imgContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 20,
  },

  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  textContainer: {
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  number: {
    fontSize: 19,
    fontWeight: 700,
    color: 'black',
    padding: 5,
  },

  text: {
    fontSize: 16,
    fontWeight: 700,
    color: 'black',
    padding: 5,
    textAlign: 'center',
  },
});
