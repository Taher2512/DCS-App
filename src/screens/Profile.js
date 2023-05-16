import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomProfileInput from '../components/CustomProfileInput';
import {launchImageLibrary} from 'react-native-image-picker';
import client from '../client';
import {useSelector} from 'react-redux';
import {URL} from '../constants';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileWorkInfo from '../components/ProfileWorkInfo';
import {persistor} from '../store';

const saveProfileValidationSchema = yup.object().shape({
  mobile: yup.string().required('Please enter mobile!'),
  email: yup.string().email('Invalid email!').required('Please enter email!'),
  password: yup
    .string()
    .min(6, 'Password must be 6 characters long')
    .required('Please enter password!'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords are not matching!')
    .required('Please confirm password!'),
});

const Profile = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [origPhoto, setOrigPhoto] = useState(
    'https://dotcomsolutions.biz/api/uploads/team/placeholder.jpg',
  );
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pendingToday, setPendingToday] = useState('');
  const [pendingWeek, setPendingWeek] = useState('');
  const [pendingApproval, setPendingApproval] = useState('');
  const [completedToday, setCompletedToday] = useState('');
  const [completedWeek, setCompletedWeek] = useState('');
  const [completedAll, setCompletedAll] = useState('');

  const logUser = useSelector(state => state.works.user.username);
  const logUserName = useSelector(state => state.works.user.name);
  var uri = '';
  const navigation = useNavigation();

  const pt = require('../assets/pending_today.png');
  const pw = require('../assets/pending_week.png');
  const pa = require('../assets/pending_approval.png');
  const ct = require('../assets/completed_today.png');
  const cw = require('../assets/completed_week.png');
  const ca = require('../assets/completed_all.png');

  const getProfilePic = async () => {
    try {
      const {data: res, status} = await client.get('retrieveProfilePic.php', {
        params: {log_user: logUser},
      });

      if (status === 200) {
        uri = res.data[0].Uri;
        setOrigPhoto(uri);
      } else {
        uri = 'https://dotcomsolutions.biz/api/uploads/team/placeholder.jpg';
        setOrigPhoto(uri);
      }
    } catch (err) {
      console.log(err);
      uri = 'https://dotcomsolutions.biz/api/uploads/team/placeholder.jpg';
      setOrigPhoto(uri);
      Alert.alert('Error', 'There were some error in fetching data :/');
    }
  };

  const getProfileDetails = async () => {
    try {
      const {data: res, status} = await client.get(
        'retrieveProfileDetails.php',
        {
          params: {log_user: logUser},
        },
      );

      if (status === 200) {
        setMobile(res.data.mobile);
        setEmail(res.data.email);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'There were some error in fetching data :/');
    }
  };

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: false}, response => {
      if (!response.didCancel) {
        if (response) {
          setPhoto(response);
        } else {
          setPhoto(null);
        }
      }
    });
  };

  const handleUploadPhoto = async () => {
    const formData = new FormData();
    setUploading(true);

    formData.append('log_user', logUser);
    formData.append('photo', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri:
        Platform.OS === 'ios'
          ? photo.assets[0].uri.replace('file://', '')
          : photo.assets[0].uri,
    });

    await fetch(`${URL}api/uploadProfilePic.php`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(response => {
        setPhoto(null);
        setUploading(false);
      })
      .catch(error => {
        console.log('error', error);
        setPhoto(null);
        setUploading(false);
      });
  };

  const handleCancelPhoto = () => {
    setPhoto(null);
  };

  const getWorkInfo = async () => {
    try {
      const {data: res, status} = await client.get('retrieveWorkDetails.php', {
        params: {log_user: logUser},
      });

      if (status === 200) {
        setPendingToday(res.data.Pending_Today);
        setPendingWeek(res.data.Pending_Week);
        setPendingApproval(res.data.Pending_Approval);
        setCompletedToday(res.data.Completed_Today);
        setCompletedWeek(res.data.Completed_Week);
        setCompletedAll(res.data.Completed_All);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'There were some error in fetching data :/');
    }
  };

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            // AsyncStorage.clear();
            persistor.purge();
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    getProfilePic();
    getProfileDetails();
    getWorkInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.profileContainer, styles.shadow]}>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Image
            source={require('../assets/logout.png')}
            style={styles.logoutBtn}
          />
        </TouchableOpacity>
        <View style={styles.picContainer}>
          {photo ? (
            <>
              <Image source={{uri: photo.assets[0].uri}} style={styles.pic} />
              <TouchableOpacity
                onPress={handleUploadPhoto}
                disabled={uploading}
                style={
                  uploading
                    ? [
                        styles.uploadBtn,
                        styles.shadow,
                        {backgroundColor: 'gray'},
                      ]
                    : [styles.uploadBtn, styles.shadow]
                }>
                {uploading ? (
                  <Text style={[styles.uploadBtnText]}>
                    Uploading&nbsp;&nbsp;
                    <ActivityIndicator color={'white'} size={10} />
                  </Text>
                ) : (
                  <Text style={styles.uploadBtnText}>Upload Photo</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelPhoto}
                disabled={uploading}
                style={
                  uploading
                    ? [
                        styles.cancelBtn,
                        styles.shadow,
                        {backgroundColor: 'gray'},
                      ]
                    : [styles.cancelBtn, styles.shadow]
                }>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.profile}>
              <TouchableOpacity
                onPress={handleChoosePhoto}
                style={styles.chooseBtn}>
                <Image
                  source={{
                    uri: `${origPhoto}?random=${Math.random()
                      .toString(36)
                      .substring(7)}`,
                  }}
                  style={styles.pic}
                />
              </TouchableOpacity>
              <Text style={styles.profileText}>{logUserName}</Text>
            </View>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Formik
            validationSchema={saveProfileValidationSchema}
            initialValues={{
              mobile: mobile,
              email: email,
              password: '',
              confirm: '',
            }}
            enableReinitialize
            onSubmit={async (values, actions) => {
              setFormSubmitted(true);

              try {
                let {data: res, status} = await client.post(
                  'uploadProfileDetails.php',
                  {},
                  {
                    params: {
                      log_user: logUser,
                      mobile: values.mobile,
                      email: values.email,
                      password: values.password,
                    },
                  },
                );
                if (parseInt(status) === 200) {
                  setFormSubmitted(false);
                  actions.resetForm();
                  getProfileDetails();
                }
              } catch (err) {
                console.log(err);
                setFormSubmitted(false);
                Alert.alert('Error!', 'Some error occurred :/');
              }
            }}>
            {({handleSubmit, isValid}) => (
              <View style={styles.form}>
                <View style={styles.formRow}>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Mobile:</Text>
                    <Field
                      component={CustomProfileInput}
                      name="mobile"
                      placeholder="Enter Mobile"
                    />
                  </View>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Email:</Text>
                    <Field
                      component={CustomProfileInput}
                      name="email"
                      placeholder="Enter Email"
                    />
                  </View>
                </View>

                <View style={styles.formRow}>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Password:</Text>
                    <Field
                      component={CustomProfileInput}
                      name="password"
                      placeholder="Password"
                    />
                  </View>

                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Confirm Password:</Text>
                    <Field
                      component={CustomProfileInput}
                      name="confirm"
                      placeholder="Password"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.submitButtonContainer}>
                  <View
                    style={[
                      styles.submitButton(isValid, formSubmitted),
                      styles.shadow,
                    ]}>
                    {formSubmitted ? (
                      <Text style={styles.submitText}>
                        Saving&nbsp;&nbsp;&nbsp;
                        <ActivityIndicator color={'white'} size={12} />
                      </Text>
                    ) : (
                      <Text style={styles.submitText}>Save</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>

      <View style={styles.workInfoContainer}>
        <View style={styles.formRow}>
          <ProfileWorkInfo
            icon={pt}
            color={'#0047AB'}
            number={pendingToday}
            text={'Works Today'}
          />
          <ProfileWorkInfo
            icon={pw}
            color={'#E49B0F'}
            number={pendingWeek}
            text={'Works This Week'}
          />
        </View>

        <View style={styles.formRow}>
          <ProfileWorkInfo
            icon={pa}
            color={'#F28C28'}
            number={pendingApproval}
            text={'Pending Approval'}
          />
          <ProfileWorkInfo
            icon={ct}
            color={'#6082B6'}
            number={completedToday}
            text={'Completed Today'}
          />
        </View>

        <View style={styles.formRow}>
          <ProfileWorkInfo
            icon={cw}
            color={'#C2B280'}
            number={completedWeek}
            text={'Completed This Week'}
          />
          <ProfileWorkInfo
            icon={ca}
            color={'#40E0D0'}
            number={completedAll}
            text={'Completed All Time'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginBottom: '30%',
  },

  profileContainer: {
    width: '92%',
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5,
  },

  profileText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
    width: '100%',
    fontSize: 18,
  },

  uploadBtn: {
    backgroundColor: '#FB8C00',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
    minWidth: '88%',
  },

  uploadBtnText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 7,
  },

  cancelBtn: {
    backgroundColor: '#9F2B68',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
    minWidth: '88%',
  },

  cancelBtnText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 7,
  },

  picContainer: {
    width: '30%',
    alignItems: 'center',
  },

  pic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'black',
  },

  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  formRow: {
    flexDirection: 'row',
  },

  submitButtonContainer: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: (isValid, formSubmitted) => ({
    backgroundColor: !isValid || formSubmitted ? 'gray' : '#397fe2',
    minWidth: '25%',
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  }),

  submitText: {
    color: 'white',
    fontSize: 15,
  },

  submittingText: {
    color: 'white',
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBlock: {
    width: '50%',
    marginVertical: 5,
  },

  label: {
    paddingLeft: 5,
    fontWeight: 600,
    fontSize: 13,
    paddingBottom: 6,
  },

  chooseBtn: {
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
  },

  logout: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  logoutBtn: {
    width: 22,
    height: 22,
    opacity: 0.3,
  },

  workInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },
});
