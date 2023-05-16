import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import client from '../client';
import {useSelector} from 'react-redux';

const closeIcon = require('../assets/close_2.png');
// const submitSuccessIcon = require('../assets/submitSuccess_1.png');

const UpdateStatusModal = ({
  modalWork,
  modalVisible,
  setModalVisible,
  getInitialWorks,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [date, setDate] = useState(new Date());
  const [modalSubmitDisabled, setModalSubmitDisabled] = useState(true);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  // const [submitSuccess, setSubmitSuccess] = useState(false);

  const user = useSelector(state => state.works.user.username);

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const status = [
    {value: '0', label: 'Pending'},
    {value: '1', label: 'Completed'},
    {value: '2', label: 'In-Progress'},
    {value: '3', label: 'Client Approval'},
    {value: '4', label: 'Paid'},
    {value: '9', label: 'Cancelled'},
  ];

  async function submitStatus() {
    let {data: res, status} = await client.post(
      'updateWorkStatus.php',
      {},
      {
        params: {
          id: modalWork.id,
          remarks: remarks,
          user: user,
          eta: date,
          status: selectedStatus,
        },
      },
    );

    if (status === 200) {
      setModalVisible(false);
      setRemarks('');
      setDate(new Date());
      setSelectedStatus('');
      setModalSubmitDisabled(true);
      setModalSubmitted(false);
      setModalVisible(false);
      getInitialWorks();

      //   setSubmitSuccess(true);
      //   setTimeout(() => {
      //     setModalVisible(false);
      //     setSubmitSuccess(false);
      //   }, 1000);
    }
  }

  function checkInput() {
    if (selectedStatus === '') {
      setModalSubmitDisabled(true);
    } else {
      setModalSubmitDisabled(false);
    }
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setRemarks('');
          setDate(new Date());
          setSelectedStatus('');
          setModalSubmitDisabled(true);
        }}>
        {/* {submitSuccess ? (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={submitSuccessIcon} style={styles.submitSuccess} />
            </View>
          </View>
        ) : ( */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Update Work Status</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setRemarks('');
                  setDate(new Date());
                  setSelectedStatus('');
                  setModalSubmitDisabled(true);
                }}>
                <Image source={closeIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalRemarksContainer}>
              <Text style={styles.modalLabel}>Remarks</Text>
              <TextInput
                placeholder="Enter Remarks..."
                value={remarks}
                onChangeText={val => {
                  setRemarks(val);
                }}
                onChange={checkInput}
                style={styles.modalInput}
              />
            </View>
            <View style={styles.modalInputContainer}>
              <View style={styles.modalInputSubContainer}>
                <Text style={styles.modalLabel}>ETA</Text>
                <DatePicker
                  modal
                  open={datePickerOpen}
                  date={date}
                  mode="date"
                  onConfirm={newDate => {
                    setDatePickerOpen(false);
                    setDate(newDate);
                  }}
                  onCancel={() => {
                    setDatePickerOpen(false);
                  }}
                />
                <TextInput
                  placeholder="Select Date..."
                  caretHidden
                  value={
                    date.getDate().toString() +
                    '-' +
                    month[date.getMonth()] +
                    '-' +
                    date.getFullYear().toString()
                  }
                  onPressOut={() => setDatePickerOpen(true)}
                  style={styles.modalInput}
                />
              </View>
              <View style={styles.modalInputSubContainer}>
                <Text style={styles.modalLabel}>Status</Text>
                <DropDownPicker
                  listMode="MODAL"
                  items={status}
                  open={dropdownOpen}
                  setOpen={() => setDropdownOpen(!dropdownOpen)}
                  value={selectedStatus}
                  setValue={val => {
                    setSelectedStatus(val);
                  }}
                  autoScroll
                  placeholder="Select Status..."
                  placeholderStyle={{color: 'gray'}}
                  onChangeValue={checkInput}
                  style={styles.modalInput}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalSubmitted(true);
                submitStatus();
              }}
              disabled={modalSubmitDisabled}
              style={styles.modalSubmit(modalSubmitDisabled, modalSubmitted)}>
              {modalSubmitted ? (
                <View style={styles.modalSubmitted}>
                  <Text style={styles.modalSubmitText}>Submitting</Text>
                  <ActivityIndicator
                    color={'white'}
                    size={16}
                    style={styles.submittedLoader}
                  />
                </View>
              ) : (
                <View style={styles.modalSubmitted}>
                  <Text style={styles.modalSubmitText}>Submit</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* )} */}
      </Modal>
    </View>
  );
};

export default UpdateStatusModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },

  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  modalHeaderText: {
    flex: 1,
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
  },

  modalRemarksContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
  },

  modalLabel: {
    color: 'dodgerblue',
    fontWeight: '500',
  },

  modalInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
  },

  modalInputContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 5,
  },

  modalInputSubContainer: {
    flex: 1,
    marginTop: 10,
  },

  modalSubmit: (modalSubmitDisabled, modalSubmitted) => ({
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor:
      modalSubmitDisabled || modalSubmitted ? 'gray' : 'dodgerblue',
    alignItems: 'center',
  }),

  modalSubmitText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 500,
  },

  modalSubmitted: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  submittedLoader: {
    marginLeft: 8,
  },

  submitSuccess: {
    width: '100%',
    resizeMode: 'contain',
    padding: 0,
    margin: 0,
  },
});
