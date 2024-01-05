import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormModal({ isVisible, closeModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBookAppointment = () => {
    if (!name ||!email ||!phone ||!selectedDate ||!selectedTime) {
      setErrorMessage('Please fill all the fields');
      return;
    }
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSelectedTime(new Date()); 
    setSelectedDate(new Date());
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(Platform.OS === 'android');
    setSelectedDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    setShowTimePicker(Platform.OS === 'android');
    setSelectedTime(currentTime);
  };

  return (
    <Modal
      animationType='fade'
      transparent
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Book Slot</Text>
          {!isSubmitted ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                keyboardType='email-address'
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                keyboardType='phone-pad'
                onChangeText={text => setPhone(text)}
              />
              {Platform.OS === 'android' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.button}>Select Date</Text>
                  </Pressable>
                  <Pressable onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.button}>Select Time</Text>
                  </Pressable>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={selectedDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                  {showTimePicker && (
                    <DateTimePicker
                      testID="timePicker"
                      value={selectedTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeTime}
                    />
                  )}
                </View>
              )}
              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
              <Pressable android_ripple={{color: '#ccc'}} style={styles.bookNowButton} onPress={handleBookAppointment}>
                <Text style={styles.bookNowText}>Submit</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationText}>Booking Confirmed!</Text>
              <Pressable android_ripple={{color: '#ccc'}} onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    height: '50%',
    width: '100%',
    backgroundColor: '#f7f9fa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 12,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    color: '#272c36',
  },
  button: {
    backgroundColor: '#072657',
    color: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    fontWeight: '700',
  },
  bookNowButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookNowText: {
    backgroundColor: '#072657',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 21,
    margin: 10,
    height: 50,
    width: 120,
    borderRadius: 10,
    padding: 9,
  },
  confirmationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#072657',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 10,
  },
});
