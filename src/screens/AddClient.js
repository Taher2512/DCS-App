import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import client from '../client';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import {useSelector} from 'react-redux';

const addClientValidationSchema = yup.object().shape({
  company: yup.string().required('Please enter company name!'),
  client: yup.string().required('Please enter client name!'),
  mobile: yup.string().required('Please enter mobile!'),
  country: yup.string().required('Please enter country!'),
  state: yup.string().required('Please enter state!'),
  city: yup.string().required('Please enter city!'),
});

const AddClient = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const logUser = useSelector(state => state.works.user.username);

  const gstTypes = [
    {value: 'Unregistered', label: 'Un-Registered'},
    {value: 'Registered', label: 'Registered'},
    {value: 'Composite', label: 'Composite'},
  ];

  return (
    <ScrollView>
      <ImageBackground source={require('../assets/form_bg.jpg')}>
        <View style={[styles.header, styles.shadow]}>
          <Text style={styles.headerText}>Add Client</Text>
        </View>

        <Formik
          validationSchema={addClientValidationSchema}
          initialValues={{
            company: '',
            client: '',
            mobile: '',
            email: '',
            country: 'India',
            state: '',
            city: '',
            pincode: '',
            address_1: '',
            address_2: '',
            gstin: '',
            gstin_type: '',
            bank_name: '',
            bank_acc_name: '',
            bank_acc_no: '',
            ifsc: '',
          }}
          onSubmit={async (values, actions) => {
            setFormSubmitted(true);

            try {
              let {data: res, status} = await client.post(
                'addClient.php',
                {},
                {
                  params: {
                    log_user: logUser,
                    company: values.company,
                    client: values.client,
                    mobile: values.mobile,
                    email: values.email,
                    country: values.country,
                    state: values.state,
                    city: values.city,
                    pincode: values.pincode,
                    address_1: values.address_1,
                    address_2: values.address_2,
                    gstin: values.gstin,
                    gstin_type: values.gstin_type,
                    bank_name: values.bank_name,
                    bank_acc_name: values.bank_acc_name,
                    bank_acc_no: values.bank_acc_no,
                    ifsc: values.ifsc,
                  },
                },
              );
              if (parseInt(status) === 200) {
                setFormSubmitted(false);
                actions.resetForm();
                console.log(res);
              }
            } catch (err) {
              console.log(err);
              Alert.alert('Error!', 'Some error occurred :/');
            }
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Company:</Text>
                <Field
                  component={CustomInput}
                  name="company"
                  placeholder="Enter Company Name..."
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Client:</Text>
                <Field
                  component={CustomInput}
                  name="client"
                  placeholder="Enter Client Name..."
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

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Country:</Text>
                  <Field
                    component={CustomInput}
                    name="country"
                    placeholder="Enter Country..."
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>State:</Text>
                  <Field
                    component={CustomInput}
                    name="state"
                    placeholder="Enter State..."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>City:</Text>
                  <Field
                    component={CustomInput}
                    name="city"
                    placeholder="Enter City..."
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Pincode:</Text>
                  <Field
                    component={CustomInput}
                    name="pincode"
                    placeholder="Enter Pincode..."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Address Line 1:</Text>
                  <Field
                    component={CustomInput}
                    name="address_1"
                    placeholder="Enter Line 1..."
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Address Line 2:</Text>
                  <Field
                    component={CustomInput}
                    name="address_2"
                    placeholder="Enter Line 2..."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>GSTIN:</Text>
                  <Field
                    component={CustomInput}
                    name="gstin"
                    placeholder="Enter GSTIN..."
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>GSTIN Type:</Text>
                  <Field
                    component={CustomSelect}
                    items={gstTypes}
                    name="gstin_type"
                    placeholder="Select Type..."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Bank Name:</Text>
                  <Field
                    component={CustomInput}
                    name="bank_name"
                    placeholder="Enter Bank Name..."
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Bank Acc Name:</Text>
                  <Field
                    component={CustomInput}
                    name="bank_acc_name"
                    placeholder="Enter Acc Name..."
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Bank Acc Number:</Text>
                  <Field
                    component={CustomInput}
                    name="bank_acc_no"
                    placeholder="Enter Acc No..."
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>IFSC Code:</Text>
                  <Field
                    component={CustomInput}
                    name="ifsc"
                    placeholder="Enter IFSC..."
                  />
                </View>
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
      </ImageBackground>
    </ScrollView>
  );
};

export default AddClient;

const styles = StyleSheet.create({
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
