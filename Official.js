import { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ScrollView, TouchableOpacity, Modal} from "react-native"
import {Card} from 'react-native-shadow-cards';
import { firebase } from './firebase/firebase-config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const Officials = () => {
  const [residents, setResidents] = useState(null)
  const [modalVisible, setModalVisible] =useState(false)
  const [userData, setUserData] = useState(null)

  function getUserData(data){
    const temp = []
    temp.push(data)
    setUserData(temp)
    setModalVisible(!modalVisible)
  }
  useEffect(() => {
    const q = query(collection(firebase, "Users"), where("user_type", "==", "official"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
      });
      setResidents(temp)
    });
  }, [])
  return (

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
      {residents == null ? 
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
            <View style={{width:'80%'}}>
              <Text>Full Name: {data['full_name']}</Text>
              <Text>Email: {data['email']}</Text>
              <Text>Address: {data['address']}</Text>
            </View>
            <View>

            </View>
          </Card>
        </TouchableOpacity>
        )
        })
      }
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
padding:10
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

export default Officials;
