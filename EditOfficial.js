import React, { useState } from "react";
import { Text, Image, TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { getAddress, getAge, getBirthdate, getEmail, getFullName, getPhoneNumber, getUID, getUri, getPassword } from './EditOfficialModel'
import { doc, updateDoc } from "firebase/firestore";
import {firebase, auth} from './firebase/firebase-config'
import { getAuth, updateEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Base64 } from 'js-base64';

const EditOfficial = ({navigation}) =>{

//   const [fullName, fullNameHook] = useState(getFullName())
//   const [phoneNumber, phoneNumberHook] = useState(getPhoneNumber())
//   const [birthdate, birthdateHook] = useState(getBirthdate())
//   const [age, ageHook] = useState(getAge())
//   const [address, addressHook] = useState(getAddress())

  const [uid, setEditUid] = useState(getUID())
  const [uri, setEditUri] = useState(getUri())
  const [fullname, setEditFullName] = useState(getFullName())
  const [email, setEditEmail] = useState(getEmail())
  const [age, setEditAge] = useState(getAge())
  const [birthdate, setEditBirthdate] = useState(getBirthdate())
  const [phone_number, setEditPhoneNumber] = useState(getPhoneNumber())
  const [address, setEditAddress] = useState(getAddress())
  const [password, setEditPassword] = useState(getPassword())

    const decryptPassword = (password) => {
        var decode = Base64.decode(password);
        return decode
    }
    const buttonFunct = async () =>{
        const washingtonRef = doc(firebase, "Users", uid);
        // Set the "capital" field of the city 'DC'
        signInWithEmailAndPassword(auth, email, decryptPassword(password).toString())
        .then(async(userCredential) => {
          // Signed in 
            const userID = auth.currentUser;
            await updateDoc(washingtonRef, {
              full_name: fullname,
              email: email,
              age: age,
              birthdate: birthdate,
              phone_number: phone_number,
            }).then(()=>{
                updateEmail(userID, email).then(() => {
                  alert('Successfully Modified Official.')
                  navigation.navigate('Officials')
                }).catch((error) => {
                    alert(error)
                });
            }).catch((error)=>{
                alert(error)
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error)
        });
    }
    return(
      <ScrollView style={styles.container}>
      <SafeAreaView>
      <TouchableOpacity style={{alignItems:'center', marginBottom: 30}} disabled={true}>
          <Image source={{uri:uri}} style={{width:120, height:120, borderRadius:100}}/>
      </TouchableOpacity>
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Full Name</Text>  
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullname}
          onChangeText={text=>setEditFullName(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Email</Text>  
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text=>setEditEmail(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Age</Text>  
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={text=>setEditAge(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Birthdate</Text>  
        <TextInput
          style={styles.input}
          placeholder="Birth Date"
          value={birthdate}
          onChangeText={text=>setEditBirthdate(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Contact number</Text>  
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={phone_number}
          onChangeText={text=>setEditPhoneNumber(text)}
        />
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Address</Text> 
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
          value={address}
          onChangeText={text=>setEditAddress(text)}
        />
        {/* <Text style={{fontSize:12, textAlign:'center', marginBottom:20, color:'#656F77'}}>Note: This address will be used in case of emergency</Text>
        <Text style={{fontSize:18,marginStart:12, color:'#0B3954', fontWeight:'bold',marginLeft: 12,}}>Additional Address</Text>
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
        />
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Address"
        /> */}
        <View style={{margin:20}}>
        <TouchableOpacity
            style={{  backgroundColor:'#0B3954', borderColor:'#0B3954',borderWidth:1, padding:10, borderRadius:5,height: 40, width:127, marginLeft:12}}
            onPress={buttonFunct}
          >
            <Text style={{color:'white', fontWeight:'bold', alignSelf:'center'}}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
    )
}
 export default EditOfficial;
 const styles = StyleSheet.create({
    // main design
    container: {
        margin:20
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    buttonRow: {
      marginTop:100,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    login: {
      borderColor:'#0B3954',
      borderWidth:2,
      backgroundColor:'white',
      padding:5,
      width:145,
      alignItems: 'center',
      borderRadius: 50,
      marginLeft:5,
      marginRight:5,
    },
    signUp: {
     backgroundColor:'#0B3954',
     padding:5,
     width:145,
     alignItems: 'center',
     borderRadius: 50,
     marginLeft:5,
     marginRight:5,
    },
    input: {
      borderRadius:5,
      borderColor:'#ACB8C2',
      height: 40,
      width:'93%',
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonLogin:{
      borderRadius:50,
      padding: 10,
      alignItems:'center',
      margin: 12,
      width: 327,
      height: 57,
      backgroundColor: '#0B3954',
    }
  });