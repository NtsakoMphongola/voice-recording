import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../setup';
import firebase from 'firebase/compat/app';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationid, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationid,
            code,
        );
        firebase.auth().signInWithCredential(credential).then(() => {
            setCode('');
        })
        .catch((error) => {
            // show error message
            alert(error)
        })
        Alert.alert('Login successful. Welcome to journal vioce Record',)
    }

  return (
    <View style={styles.container}> 
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.otptext}>
        Login using OTP 
      </Text>
      <TextInput placeholder='Phone Number With Country Code' onChangeText={setPhoneNumber} keyboardType='phone-pad'
      autoCompleType='tel' style={styles.txtInput} />
      <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
        <Text style={styles.btntext}>Send verification code</Text>
      </TouchableOpacity>
      <TextInput placeholder='Confirm Code' onChangeText={setCode} keyboardType='number-pad'
       style={styles.txtInput } />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.btntext}>Code verification code</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 25,
        width: 500,
        backgroundColor: 'gray',
        textAlign: 'center',
        borderRadius: 15,
        justifyContent: 'center',
    },
    title: {
        marginBottom: 50,
        backgroundColor: 'green',
        color: 'white',
        fontSize: 28,
        textTransform: 'uppercase'
    },
    txtInput: { 
        padding: 20,
        paddingTop: 25,
        marginBottom: 25,
        margin: 0,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    sendCode: {
        padding: 2,
        backgroundColor: '#595421'
    }
})