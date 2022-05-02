import { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ScrollView, TouchableOpacity, Modal} from "react-native"
import {Card} from 'react-native-shadow-cards';
import { firebase, auth } from './firebase/firebase-config';
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, onSnapshot,  doc, updateDoc, deleteField } from "firebase/firestore";
import { Base64 } from 'js-base64';;


import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { setAge, setBirthdate, setEmail, setFullName, setPhoneNumber, setAddress, setUID, setUri, setPassword } from './EditResidentModel';

const Stack = createNativeStackNavigator();


const Residents = ({navigation}) => {
  const [residents, setResidents] = useState(null)
  const [modalVisible, setModalVisible] =useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [userData, setUserData] = useState(null)
  const [deleteUID, setDeleteUID] = useState('')
  const [deleteEmail, setDeleteEmail] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteFlag, setDeleteFlag] = useState(true)

  const decryptPassword = (password) => {
    var decode = Base64.decode(password);
    return decode
  }
  function getUserData(data){
    const temp = []
    temp.push(data)
    setUserData(temp)
    setModalVisible(!modalVisible)
  }
  function editResident(data){
    setFullName(data['full_name'])
    setEmail(data['email'])
    setAge(data['age'])
    setBirthdate(data['birthdate'])
    setPhoneNumber(data['phone_number'])
    setAddress(data['address'])
    setUID(data['uid'])
    setUri(data['image_url'])
    setPassword(data['password'])
    navigation.navigate('Edit Resident')
  }
  function deleteResident(uid, email, password){
    
    // alert(email + ' ' + password)
    setDeleteFlag(!deleteFlag)
    signInWithEmailAndPassword(auth, email, decryptPassword(password).toString())
    .then((userCredential) => {
      // Signed in 
        const userID = auth.currentUser;
        deleteUser(userID).then(async() => {
          const user = doc(firebase, 'Users', uid);
          await updateDoc(user, {
            address: deleteField(),
            age: deleteField(),
            birthdate: deleteField(),
            email: deleteField(),
            full_name: deleteField(),
            fullname: deleteField(),
            image_url: deleteField(),
            latitude: deleteField(),
            longitude: deleteField(),
            phone_number: deleteField(),
            uid: deleteField(),
            user_type: deleteField(),
            password: deleteField()
          });
          alert('Successfully Deleted')
          setDeleteModalVisible(!deleteModalVisible)
          setDeleteFlag(!deleteFlag)
        }).catch((error) => {
          alert('auth error: ' + error)
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error)
    });

    
    
  }
  useEffect(() => {
    const q = query(collection(firebase, "Users"), where("user_type", "==", "resident"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
      });
      setResidents(temp)
    });
  }, [])
  return (

    <View>
      <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {userData == null ? 
            <Text>No Data</Text>
            :
            userData.map((data)=>{
              return(<View>
                <Image source={{uri: data['image_url']}} style={{width:200, height:200, marginLeft:'auto', marginRight:'auto', borderRadius:100}}/>
                <Text>Full Name: {data['full_name']}</Text>
                <Text>Email: {data['email']}</Text>
                <Text>Age: {data['age']}</Text>
                <Text>Birth Date: {data['birthdate']}</Text>
                <Text>Phone Number: 0{data['phone_number']}</Text>
                <Text>Address: {data['address']}</Text>
              </View>)
            })}
            
          <TouchableOpacity style={{width:100, alignSelf:'center'}} onPress={()=>{setModalVisible(!modalVisible)}}>
            <Text style={{alignSelf:'center', color:'#C81D35'}}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}> 
          <Text>Are you sure you want to delete this Resident?</Text>
          <View style={styles.modalViewDelete}>  
          <TouchableOpacity editable={deleteFlag} style={{width:100, alignSelf:'center'}} onPress={()=>{ deleteResident(deleteUID, deleteEmail, deletePassword)}}>
            <Text style={{alignSelf:'center', color:'#0B3954'}}>Yes</Text>
          </TouchableOpacity> 
          <TouchableOpacity editable={deleteFlag} style={{width:100, alignSelf:'center'}} onPress={()=>{setDeleteModalVisible(!deleteModalVisible)}}>
            <Text style={{alignSelf:'center', color:'#C81D35'}}>No</Text>
          </TouchableOpacity> 
          </View>
        </View>
        </View>
      </Modal>

      {residents < 1 ? 
      <Card style={{padding: 10, margin: 10}}>
        <Text>No user found</Text>
      </Card>
      :
      residents.map((data)=>{
        return(
        <TouchableOpacity onPress={()=> getUserData(data)}>
          <Card style={{padding: 10, margin: 10, flexDirection:'row'}}>
            <View style={{width:'20%'}}>
              <Image source={{uri: data['image_url']}} style={{width:50, height:50, borderRadius:50, marginTop:'auto', marginBottom:'auto'}}/>
            </View>
            <View style={{width:'60%'}}>
              <Text>Full Name: {data['full_name']}</Text>
              <Text>Email: {data['email']}</Text>
              <Text>Address: {data['address']}</Text>
            </View>
            <View style={{width:'20%', justifyContent:'center', alignContent:'center', padding:5}}>
              <TouchableOpacity onPress={()=>{editResident(data)}}>
                <Text style={{color:'#0B3954'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={()=>{ 
                setDeleteModalVisible(!deleteModalVisible)
                setDeleteUID(data['uid'])
                setDeleteEmail(data['email'])
                setDeletePassword(data['password'])}}
                >
                <Text style={{color:'#C81D35'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>
        )
        })
      }
      </ScrollView>
      <View style={{height:'20%'}}>
        <ActionButton
          buttonColor="#C81D35"
          onPress={() => { navigation.navigate('Add Resident 1/3')}}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding:10,
    height:'80%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width:'80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default Residents;
