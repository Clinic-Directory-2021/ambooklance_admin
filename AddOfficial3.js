import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity,View, ActivityIndicator, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getPhoneNumber, getEmail, getFullName, setAddress, getBirthdate, getAge, getAddress, getPassword, getUID, setUID, setImageUrl, getImageUrl, setLatitude, setlongitude, getLatitude, getlongitude } from './Models'
import {auth, firebase} from './firebase/firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Base64 } from 'js-base64';
import DropDownPicker from 'react-native-dropdown-picker';

const AddOfficial3 = ({navigation}) =>{
    const [address, set_address] = useState('')
    const [indicatorFlag, setIndicatorFlag] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Balucuc', value: {address:'Balucuc, Apalit, Pampanga, Philippines', latitude: 14.9610287, longitude:120.8211796}},
      {label: 'Calantipe', value: {address:'Calantipe, Apalit, Pampanga, Philippines', latitude:14.9762235, longitude:120.8412807}},
      {label: 'Cansinala', value: {address:'Cansinala, Apalit, Pampanga, Philippines', latitude:14.9748427, longitude:120.7982029}},
      {label: 'Capalangan', value: {address:'Capalangan, Apalit, Pampanga, Philippines', latitude:14.9286414, longitude:120.7680395}},
      {label: 'Colgante', value: {address:'Colgante, Apalit, Pampanga, Philippines', latitude:14.9396096, longitude:120.7378688}},
      {label: 'Paligui', value: {address:'Paligui, Apalit, Pampanga, Philippines', latitude:14.9764281, longitude:120.7470372}},
      {label: 'Sampaloc', value: {address:'Sampaloc, Apalit, Pampanga, Philippines', latitude:14.9644909, longitude:120.7578916}},
      {label: 'San Juan', value: {address:'San Juan, Apalit, Pampanga, Philippines', latitude:14.9561454, longitude:120.766603}},
      {label: 'San Vicente', value: {address:'San Vicente, Apalit, Pampanga, Philippines', latitude:14.9483048, longitude:120.7493632}},
      {label: 'Sucad', value: {address:'Sucad, Apalit, Pampanga, Philippines', latitude:14.970889, longitude:120.772349}},
      {label: 'Sulipan', value: {address:'Sulipan, Apalit, Pampanga, Philippines', latitude:14.9370552, longitude:120.7551101}},
      {label: 'Tabuyuc', value: {address:'Tabuyuc, Apalit, Pampanga, Philippines', latitude:14.9531183, longitude:120.7788494}},
    ]);

    const encryptPassword = (password) => {
        var encode = Base64.encode(password);
        return encode
    }
    const SetData = async ()=>{
        setlongitude(value['longitude'])
        setLatitude(value['latitude'])
        setAddress(value['address'])
        console.log('address: ' + address + " latitude:" + getLatitude() + " longitude:" + getlongitude())
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
                      user_type:'official',
                      password: encryptPassword(getPassword()),
                      flag:true,
                      current:'available'
                    });

                    
                    alert('Successfully Added Official Account.')
                    setIndicatorFlag(false)
                    navigation.navigate('Admin')
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                    setIndicatorFlag(false)
                  })

        navigation.navigate('Officials')
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize:18,marginStart:12, color:'#C81D35', fontWeight:'bold',marginLeft: 12,marginBottom:10}}>Barangay</Text>  
            {/* <GooglePlacesAutocomplete
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
            /> */}
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            autoScroll={true}
            // onSelectItem={(item) =>{
            //   alert(item['value']['address'] + ", " + item['value']['longitude'] + ", " + item['value']['latitude'])
            // }}
          />
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={SetData}
          >
            <Text style={{color:'white',fontWeight:'bold', fontSize:24}}>Add Official</Text>
          </TouchableOpacity>
          <ActivityIndicator size="large" color="#0B3954" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} animating={indicatorFlag}/>
        </View>
    )
}
export default AddOfficial3

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