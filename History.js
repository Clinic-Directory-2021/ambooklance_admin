import { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import { firebase } from './firebase/firebase-config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const History1 = () => {
  const [historyBookings, setHistoryBookings] = useState(null)
  const q = query(collection(firebase, "Bookings"), where("status", "==", "Arrived"));
  useEffect(async() => {
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const temp = [];
    querySnapshot.forEach((doc) => {
        temp.push(doc.data());
    });
    setHistoryBookings(temp)
    });
  }, [])

  return (
    <ScrollView>
  <View style={styles.container}>
      {historyBookings < 1 ?
       <Card style={{padding: 10, margin: 10}}>
        <Text>No data</Text>
       </Card>
     :
     historyBookings.map((data)=>{
       return(
       <Card style={{padding: 10, margin: 10}}>
        <Text>Name: {data['user_full_name']}</Text>
        <Text>Booking Type: {data['booking_type']}</Text>
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
});

export default History1;
