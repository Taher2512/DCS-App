import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import client from '../client';
import {useDispatch} from 'react-redux';
import {worksSlice} from '../store/worksSlice';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const {data: res} = await client.post('login.php', {
        id: username.trim().toLowerCase(),
        password: password,
      });

      if (parseInt(res.status) === 200) {
        let user = {
          ...res.data,
          userlevel: res.userlevel,
          username: username.trim().toLowerCase(),
        };

        dispatch(worksSlice.actions.signIn(user));
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabs'}],
        });
      } else {
        Alert.alert(res.message);
        console.log(res);
      }
    } catch (error) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.input_container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={val => setUsername(val)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={val => setPassword(val)}
          style={styles.input}
        />
        <TouchableOpacity onPress={signIn} style={styles.button}>
          <Text style={styles.button_text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  input_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    margin: 10,
    width: '80%',
    textAlign: 'center',
    paddingVertical: 11,
  },
  button: {
    borderRadius: 30,
    width: '55%',
    textAlign: 'center',
    paddingVertical: 7,
    backgroundColor: '#ed2323',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
  },
  button_text: {
    color: '#fff',
    fontSize: 19,
  },
});
