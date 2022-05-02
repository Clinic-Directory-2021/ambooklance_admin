import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity,View, ActivityIndicator, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getPhoneNumber, getEmail, getFullName, setAddress, getBirthdate, getAge, getAddress, getPassword, getUID, setUID, setImageUrl, getImageUrl, setLatitude, setlongitude, getLatitude, getlongitude } from './Models'
import {auth, firebase} from './firebase/firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Base64 } from 'js-base64';

const AddResident3 = ({navigation}) =>{
    const [address, set_address] = useState('')
    const [indicatorFlag, setIndicatorFlag] = useState(false)
    const encryptPassword = (password) => {
        var encode = Base64.encode(password);
        return encode
    }
    // const decryptPassword = (password) => {
    //     var decode = Base64.decode(password);
    //     return decode
    // }
    const SetData = async ()=>{
        setAddress(address)
        await createUserWithEmailAndPassword(auth, getEmail(), getPassword())
                  .then((userCredential) => {
                    // Signed in 
                    setIndicatorFlag(true)
                    const user = userCredential.user;
                    setUID(user.uid)
                    setDoc(doc(firebase, "Users", user.uid),{
                      email:getEmail(),
                      phone_number:getPhoneNumber(),
                      full_name:getFullName(),
                      birthdate:getBirthdate(),
                      age:getAge(),
                      address:getAddress(),
                      uid:getUID(),
                      image_url:getImageUrl().toString(),
                      latitude:getLatitude(),
                      longitude:getlongitude(),
                      user_type:'resident',
                      password: encryptPassword(getPassword()) ,
                    });

                    
                    alert('Successfully Added Resident Account.')
                    setIndicatorFlag(false)
                    navigation.navigate('Admin')
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    setIndicatorFlag(false)
                  })

        navigation.navigate('Residents')
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,}}>Address</Text>  
            <GooglePlacesAutocomplete
            placeholder='Search your address'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                set_address(details['formatted_address']);
                setLatitude(details['geometry'].location.lat);
                setlongitude(details['geometry'].location.lng);
            }}
            query={{
                key: 'AIzaSyDhsiDPQZMeiE9uGA4gRsGuGlpVP5cA_Ro',
                language: 'en',
            }}
            // currentLocation={true}
            />
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Add Resident</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
        </View>
    )
}
export default AddResident3

const styles = StyleSheet.create({
    container: {
        padding:10,
        flex:1,
        marginTop:'20%',
    },
    buttonLogin:{
        borderRadius:50,
        padding: 10,
        alignItems:'center',
        margin: 12,
        width: 327,
        height: 57,
        backgroundColor: '#0B3954',
        alignSelf:'center',
      }
})