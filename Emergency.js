import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import { firebase } from './firebase/firebase-config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();

function Emergency() {
  const [emergencyBookings, setEmergencyBookings] = useState(null)
  const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Emergency"));
  useEffect(async() => {
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const temp = [];
    querySnapshot.forEach((doc) => {
        if(doc.data().status == 'pending' || doc.data().status == "on the way"){
          temp.push(doc.data());
        }
    });
    setEmergencyBookings(temp)
    });
  }, [])
  
  return (
    <ScrollView>
    <View style={styles.container}>
      {emergencyBookings == null || emergencyBookings.length < 1?
       <Card style={{padding: 10, margin: 10}}>
        <Text>No data</Text>
       </Card>
     :
     emergencyBookings.map((data)=>{
       return(
       <Card style={{padding: 10, margin: 10}}>
        <Text>Name: {data['user_full_name']}</Text>
        <Text>Accident Type: {data['accident_type']}</Text>
        <Text>Status: {data['status']}</Text>
        <Text>Address: {data['address']}</Text>
      </Card>)
     })
      }
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10
  },
}
)
export default Emergency;