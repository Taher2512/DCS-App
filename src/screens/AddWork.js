import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import client from '../client';
import MemberSelect from '../components/MemberSelect';
import {useDispatch, useSelector} from 'react-redux';
import {worksSlice} from '../store/worksSlice';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import CustomClientSelect from '../components/CustomClientSelect';
import CustomTextarea from '../components/CustomTextarea';

const addWorkValidationSchema = yup.object().shape({
  client: yup.string().required('Please enter client name!'),
  mobile: yup.string().required('Please enter mobile!'),
  product: yup.string().required('Please select product!'),
  qty: yup.string().required('Please enter quantity!'),
  price: yup.string().required('Please enter price!'),
  eta: yup.string().required('Please enter eta!'),
  type: yup.string().required('Please enter type!'),
  priority: yup.string().required('Please enter priority!'),
});

const AddWork = () => {
  const [clients, setClients] = useState([]);
  const [workOrder, setWorkOrder] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [products, setProducts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [memberSelectFocused, setMemberSelectFocused] = useState(false);

  const dispatch = useDispatch();
  const logUser = useSelector(state => state.works.user.username);

  const units = [
    {value: 'PCS', label: 'PCS'},
    {value: 'NOS', label: 'NOS'},
    {value: 'SETS', label: 'SETS'},
    {value: 'MTR', label: 'MTR'},
  ];

  const types = [
    {value: 'New Project', label: 'New Project'},
    {value: 'Add Module', label: 'Add Module'},
    {value: 'Small Updates', label: 'Small Updates'},
    {value: 'Bug Fixes', label: 'Bug Fixes'},
    {value: 'Outdoor Work', label: 'Outdoor Work'},
    {value: 'Payment Follow Up', label: 'Payment Follow Up'},
  ];

  const priorities = [
    {value: 'Medium', label: 'Medium'},
    {value: 'High', label: 'High'},
    {value: 'Low', label: 'Low'},
  ];

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

  async function getWorkOrder() {
    try {
      const {data: res, status} = await client.get('getWorkOrder.php');
      if (parseInt(status) === 200) {
        setWorkOrder(res.data);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  async function getTeam() {
    try {
      var temp_members = [];

      const {data: res, status} = await client.get('retrieveMembers.php');
      if (parseInt(status) === 200) {
        res.data.map(member => {
          temp_members = [...temp_members, member];
        });
        setMembers(temp_members);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  async function getProducts() {
    try {
      var temp_products = [];

      const {data: res, status} = await client.get('retrieveProducts.php');
      if (parseInt(status) === 200) {
        res.data.map(product => {
          temp_products = [...temp_products, product];
        });
        setProducts(temp_products);
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  async function headerDates() {
    try {
      var temp_dates = [];

      const {data: res, status} = await client.get('retrieveWorks.php');
      if (parseInt(status) === 200) {
        res.data.map(work => {
          var searchDate = temp_dates.includes(work.Date);
          if (!searchDate) {
            temp_dates = [...temp_dates, work.Date];
          }
        });
        dispatch(worksSlice.actions.setHeaderDates(temp_dates));
      }
    } catch (err) {
      Alert.alert('There was an error!');
      console.log(err);
    }
  }

  useEffect(() => {
    getClients();
    getWorkOrder();
    getTeam();
    getProducts();
  }, []);

  return (
    <ScrollView style={styles.formContainer}>
      <ImageBackground source={require('../assets/form_bg.jpg')}>
        <View style={[styles.header, styles.shadow]}>
          <Text style={styles.headerText}>Add Work</Text>
        </View>

        <Formik
          validationSchema={addWorkValidationSchema}
          initialValues={{
            client: '',
            mobile: '',
            email: '',
            referred_by: '',
            product: '',
            desc: '',
            qty: '',
            unit: '',
            price: '',
            eta: '',
            type: '',
            priority: '',
          }}
          onSubmit={async (values, actions) => {
            setFormSubmitted(true);

            try {
              let {data: res, status} = await client.post(
                'addWork.php',
                {},
                {
                  params: {
                    log_user: logUser,
                    client: values.client,
                    mobile: values.mobile,
                    email: values.email,
                    work_order: workOrder,
                    referral: values.referred_by,
                    assigned_to: selectedMember,
                    product: values.product,
                    desc: values.desc,
                    qty: values.qty,
                    unit: values.unit,
                    price: values.price,
                    eta: values.eta,
                    type: values.type,
                    priority: values.priority,
                  },
                },
              );
              if (parseInt(status) === 200) {
                setFormSubmitted(false);
                setSelectedMember([]);
                setMemberSelectFocused(false);
                headerDates();
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

              <View style={styles.inputContainer}>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Work Order:</Text>
                  <TextInput
                    placeholder="Enter Work Order..."
                    value={workOrder}
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.input}
                  />
                </View>
                <View style={styles.contactBlock}>
                  <Text style={styles.label}>Referred By:</Text>
                  <Field
                    component={CustomSelect}
                    items={members}
                    name="referred_by"
                    placeholder="Referred By..."
                  />
                </View>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Assigned To:</Text>
                <MemberSelect
                  members={members}
                  selectedMember={selectedMember}
                  setSelectedMember={setSelectedMember}
                  memberSelectFocused={memberSelectFocused}
                  setMemberSelectFocused={setMemberSelectFocused}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Product:</Text>
                <Field
                  component={CustomSelect}
                  items={products}
                  name="product"
                  placeholder="Select Product..."
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Description:</Text>
                <Field
                  component={CustomTextarea}
                  name="desc"
                  placeholder="Enter description..."
                />
              </View>

              <View style={styles.paramsContainer}>
                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Qty:</Text>
                  <Field component={CustomInput} name="qty" placeholder="Qty" />
                </View>

                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Unit:</Text>
                  <Field
                    component={CustomSelect}
                    items={units}
                    name="unit"
                    placeholder="Unit"
                  />
                </View>

                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Price:</Text>
                  <Field
                    component={CustomInput}
                    name="price"
                    placeholder="Price"
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.paramsContainer}>
                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Eta:</Text>
                  <Field
                    component={CustomInput}
                    name="eta"
                    placeholder="Eta"
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Type:</Text>
                  <Field
                    component={CustomSelect}
                    items={types}
                    name="type"
                    placeholder="Type"
                  />
                </View>

                <View style={styles.paramsBlock}>
                  <Text style={styles.label}>Priority:</Text>
                  <Field
                    component={CustomSelect}
                    items={priorities}
                    name="priority"
                    placeholder="Priority"
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={
                  !isValid || selectedMember.length === 0 ? true : false
                }
                style={styles.submitButtonContainer}>
                <View
                  style={[
                    styles.submitButton(formSubmitted, isValid, selectedMember),
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

export default AddWork;

const styles = StyleSheet.create({
  clientLabel: {
    paddingLeft: 25,
    fontWeight: 700,
    fontSize: 14,
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

  label: {
    paddingLeft: 5,
    fontWeight: 700,
    fontSize: 14,
    paddingBottom: 10,
  },

  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  memberBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },

  descContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },

  descBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },

  paramsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
  },

  paramsBlock: {
    width: '35%',
    paddingHorizontal: 5,
  },

  submitButtonContainer: {
    marginVertical: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: (formSubmitted, isValid, selectedMember) => ({
    width: '60%',
    backgroundColor:
      !isValid || formSubmitted || selectedMember.length === 0
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
});
