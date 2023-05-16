import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Works from '../screens/Works';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AllWorks from '../screens/AllWorks';
import Clients from '../screens/Clients';
import Profile from '../screens/Profile';
import AddEntity from '../screens/AddEntity';
import client from '../client';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const dotIcon = require('../assets/3dots.png');

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#0096FF',
        ...styles.shadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabNavigation() {
  const [photo, setPhoto] = useState(null);

  const logUser = useSelector(state => state.works.user.username);

  const getProfilePic = async () => {
    try {
      const {data: res, status} = await client.get('retrieveProfilePic.php', {
        params: {log_user: logUser},
      });

      if (status === 200) {
        var uri = res.data[0].Uri;

        if (
          uri === 'https://dotcomsolutions.biz/api/uploads/team/placeholder.jpg'
        ) {
          setPhoto(null);
        } else {
          setPhoto(uri);
        }
      } else {
        setPhoto(null);
      }
    } catch (err) {
      console.log(err);
      setPhoto(null);
      Alert.alert('Error', 'There were some error in fetching data :/');
    }
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
      initialRouteName="Works">
      <Tab.Screen
        name="Works"
        component={Works}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/worksActive.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : 'gray',
                }}
              />
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? 'black' : 'gray',
                  fontSize: 13,
                }}>
                Works
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={Clients}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/clients_1.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? 'black' : 'gray',
                }}
              />
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? 'black' : 'gray',
                  fontSize: 13,
                }}>
                Clients
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add Entity"
        component={AddEntity}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/addWork.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="All Works"
        component={AllWorks}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/allWorks.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? 'black' : 'gray',
                }}
              />

              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? 'black' : 'gray',
                  fontSize: 13,
                }}>
                All Works
              </Text>
            </View>
          ),
          tabBarActiveBackgroundColor: () => <Image source={dotIcon} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {photo ? (
                <Image
                  source={{
                    uri: `${photo}?random=${Math.random()
                      .toString(36)
                      .substring(7)}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: focused ? 'black' : null,
                    borderWidth: focused ? 1 : null,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? 'black' : 'gray',
                  }}
                />
              )}
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? 'black' : 'gray',
                  fontSize: 13,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
});
