import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea';
import CustomClientSelect from '../components/CustomClientSelect';
import client from '../client';
import {useSelector} from 'react-redux';

const paymentLinkValidationSchema = yup.object().shape({
  client: yup.string().required('Please select client!'),
  mobile: yup.string().required('Please enter mobile!'),
  amount: yup.number().required('Please enter amount!'),
});

const AddPaymentLink = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clients, setClients] = useState([]);

  const logUser = useSelector(state => state.works.user.username);

  async function getClients() {
    try {
      var temp_clients = [];

      const {data: res, status} = await client.get('retrieveClients.php');
      if (parseInt(status) === 200) {
        res.data.map(client => {
          temp_clients = [...temp_clients, client];
        });
        setClients(temp_clients);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <View>
      <ImageBackground
        source={require('../assets/form_bg.jpg')}
        style={styles.imageContainer}>
        <ScrollView>
          <View style={[styles.header, styles.shadow]}>
            <Text style={styles.headerText}>Add Payment Link</Text>
          </View>
          <Formik
            validationSchema={paymentLinkValidationSchema}
            initialValues={{
              client: '',
              mobile: '',
              email: '',
              amount: '',
              message: '',
            }}
            onSubmit={async (values, actions) => {
              setFormSubmitted(true);

              try {
                let {data: res, status} = await client.post(
                  'createPaymentLink.php',
                  {},
                  {
                    params: {
                      logUser: logUser,
                      client: values.client,
                      mobile: values.mobile,
                      email: values.email,
                      amount: values.amount,
                      message: values.message,
                    },
                  },
                );
                if (parseInt(status) === 200) {
                  setFormSubmitted(false);
                  actions.resetForm();
                }
              } catch (err) {
                console.log(err);
                Alert.alert('Error!', 'Some error occurred :/');
              }
            }}>
            {({handleSubmit, isValid}) => (
              <>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Client:</Text>
                  <Field
                    component={CustomClientSelect}
                    clients={clients}
                    name="client"
                    placeholder="Select Client..."
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.contactBlock}>
                    <Text style={styles.label}>Mobile:</Text>
                    <Field
                      component={CustomInput}
                      name="mobile"
                      placeholder="Enter Mobile..."
                    />
                  </View>
                  <View style={styles.contactBlock}>
                    <Text style={styles.label}>Email:</Text>
                    <Field
                      component={CustomInput}
                      name="email"
                      placeholder="Enter Email..."
                    />
                  </View>
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Amount:</Text>
                  <Field
                    component={CustomInput}
                    name="amount"
                    placeholder="Enter Amount..."
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Message:</Text>
                  <Field
                    component={CustomTextarea}
                    name="message"
                    placeholder="Enter Message..."
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.submitButtonContainer}>
                  <View
                    style={[
                      styles.submitButton(formSubmitted, isValid),
                      styles.shadow,
                    ]}>
                    {formSubmitted ? (
                      <Text style={styles.submittingText}>
                        Submitting&nbsp;&nbsp;&nbsp;
                        <ActivityIndicator color={'white'} size={16} />
                      </Text>
                    ) : (
                      <Text style={styles.submitText}>Submit</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AddPaymentLink;

const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    borderWidth: 1,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  inputBlock: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  contactBlock: {
    width: '53%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  label: {
    paddingLeft: 10,
    fontWeight: 700,
    fontSize: 16,
    paddingBottom: 10,
  },

  submitButtonContainer: {
    marginVertical: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: (formSubmitted, isValid) => ({
    width: '60%',
    backgroundColor: !isValid || formSubmitted ? 'gray' : '#79a7cb',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  }),

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

  submitText: {
    color: 'white',
    fontSize: 17,
  },

  submittingText: {
    color: 'white',
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    marginBottom: 40,
  },

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
});
