import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import { firebase } from './firebase/firebase-config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Tab = createMaterialTopTabNavigator();

function Scheduled() {
  const [emergencyBookings, setEmergencyBookings] = useState(null)
  const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Scheduled"));
  useEffect(async() => {
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const temp = [];
    querySnapshot.forEach((doc) => {
        temp.push(doc.data());
    });
    setEmergencyBookings(temp)
    });
  }, [])
  
  return (
    <View style={styles.container}>
      {emergencyBookings == null ?
       <Card style={{padding: 10, margin: 10}}>
        <Text>No data</Text>
       </Card>
     :
     emergencyBookings.map((data, key)=>{
       return(
       <Card style={{padding: 10, margin: 10}}>
        <Text>Name: {data['user_full_name']}</Text>
        <Text>Date: {data['schedule_date']}</Text>
        <Text>Time: {data['schedule_time']}</Text>
        <Text>Address: {data['address']}</Text>
      </Card>)
     })
      }
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10
  },
}
)

export default Scheduled;