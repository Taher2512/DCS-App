import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MemberSelect from '../components/MemberSelect';
import client from '../client';
import ColorPicker from 'react-native-wheel-color-picker';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';

const addCategoryValidationSchema = yup.object().shape({
  name: yup.string().required('Please enter category name!'),
});

const AddCategory = () => {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [color, setColor] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberSelectFocused, setMemberSelectFocused] = useState(false);
  const [colorSelectFocused, setColorSelectFocused] = useState(false);
  const [isAddCategoryScreen, setIsAddCategoryScreen] = useState(true);

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

  async function checkCategory(category) {
    try {
      const {data: res, status} = await client.get(
        'retrieveCategoryClients.php',
        {params: {category}},
      );
      if (parseInt(status) === 200 && res.data[0].Clients !== null) {
        setSelectedClients(JSON.parse(res.data[0].Clients));
        setColor(res.data[0].Color);
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
    <View style={styles.formContainer}>
      <ImageBackground
        source={require('../assets/form_bg.jpg')}
        style={styles.imageContainer}>
        <View style={[styles.header, styles.shadow]}>
          <Text style={styles.headerText}>Add Category</Text>
        </View>

        <Formik
          validationSchema={addCategoryValidationSchema}
          initialValues={{
            name: '',
          }}
          onSubmit={async (values, actions) => {
            setFormSubmitted(true);

            try {
              let {data: res, status} = await client.post(
                'addCategory.php',
                {},
                {
                  params: {
                    category: values.name,
                    clients: selectedClients,
                    color: color,
                  },
                },
              );
              if (parseInt(status) === 200) {
                setFormSubmitted(false);
                setSelectedClients([]);
                setMemberSelectFocused(false);
                setColorSelectFocused(false);
                setColor('');
                actions.resetForm();
              }
            } catch (err) {
              console.log(err);
              setFormSubmitted(false);
              Alert.alert('Error!', 'Some error occurred :/');
            }
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Category:</Text>
                <Field
                  component={CustomInput}
                  name="name"
                  placeholder="Enter Category Name..."
                  checkCategory={checkCategory}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Clients:</Text>
                <MemberSelect
                  members={clients}
                  selectedMember={selectedClients}
                  setSelectedMember={setSelectedClients}
                  memberSelectFocused={memberSelectFocused}
                  setMemberSelectFocused={setMemberSelectFocused}
                  isAddCategoryScreen={isAddCategoryScreen}
                />
              </View>

              <View style={styles.inputBlock}>
                {/* Begin:: Color Picker Modal */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Pressable
                        style={styles.modalClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={require('../assets/close_2.png')} />
                      </Pressable>
                      <ColorPicker
                        ref={r => {
                          this.picker = r;
                        }}
                        color={color}
                        onColorChange={val => {
                          setColor(val);
                          if (val === '') {
                            setColorSelectFocused(true);
                          } else {
                            setColorSelectFocused(false);
                          }
                        }}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                        discrete
                      />
                    </View>
                  </View>
                </Modal>
                {/* End:: Color Picker Modal */}
                <Text style={styles.label}>Color:</Text>
                <TextInput
                  placeholder="Pick Category Color..."
                  value={color}
                  onPressOut={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.input}
                />
                {colorSelectFocused && (
                  <Text style={styles.errorText}>Please select color!</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={
                  !isValid || selectedClients?.length === 0 || color === ''
                    ? true
                    : false
                }
                style={styles.submitButtonContainer}>
                <View
                  style={[
                    styles.submitButton(
                      isValid,
                      formSubmitted,
                      selectedClients,
                      color,
                    ),
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

        {/* <View style={styles.inputContainer}>
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Category:</Text>
            <TextInput
              placeholder="Enter Category Name..."
              onChangeText={val => setCategory(val)}
              value={category}
              style={styles.input}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Select Clients:</Text>
            <MemberSelect
              members={clients}
              selectedMember={selectedClients}
              setSelectedMember={setSelectedClients}
              memberSelectFocused={memberSelectFocused}
              setMemberSelectFocused={setMemberSelectFocused}
              isAddCategoryScreen={isAddCategoryScreen}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Color:</Text>
          </View>
        </View> */}

        {/* Begin::Submit Button */}
        {/* <TouchableOpacity
          onPress={submitForm}
          disabled={formSubmitted}
          style={styles.submitButtonContainer}>
          <View style={[styles.submitButton(formSubmitted), styles.shadow]}>
            {formSubmitted ? (
              <Text style={styles.submittingText}>
                Submitting&nbsp;&nbsp;&nbsp;
                <ActivityIndicator color={'white'} size={16} />
              </Text>
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </View>
        </TouchableOpacity> */}
      </ImageBackground>
      {/* End::Submit Button */}
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    borderWidth: 1,
  },

  inputContainer: {
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingHorizontal: 10,
  },

  inputBlock: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  label: {
    paddingLeft: 5,
    fontWeight: 700,
    fontSize: 16,
    paddingBottom: 10,
  },

  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '96%',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 17,
    alignSelf: 'center',
  },

  submitButtonContainer: {
    marginVertical: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: (isValid, formSubmitted, selectedClients, color) => ({
    width: '60%',
    backgroundColor:
      !isValid || formSubmitted || selectedClients?.length === 0 || color === ''
        ? 'gray'
        : '#79a7cb',
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

  centeredView: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalClose: {
    position: 'absolute',
    padding: 20,
  },

  errorText: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 7,
  },
});
