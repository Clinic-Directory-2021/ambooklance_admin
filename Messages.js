import { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, View, Dimensions, Modal, Text, Image, TouchableOpacity } from "react-native"
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-shadow-cards';
import { database } from "./firebase/firebase-config";
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, set, onValue } from "firebase/database";
import { setUID } from './LoginModels';

const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function message(commentsRef){
  const temp = []
  onChildAdded(commentsRef, (data) => {
    temp.push(data.val())
    // temp.map((data2)=>{
    //   Object.entries(data2).forEach(([key,data3])=>{
    //     temp2.push(data3)
    //   })
    // })
  });
  return temp
}
function lastMessage(commentsRef){
  const temp = []
  var holder = ''
  onChildAdded(commentsRef, (data) => {
    Object.entries(data.val()).forEach(([key,data2])=>{
         holder = {message: data2.message, uid: data2.uid, user_name: data2.user_name,chat_id: data2.chat_id}
      })
      temp.push(holder)
  });
  return temp
}
function privateMessage(user_id,navigation){
  setUID(user_id)
  navigation.navigate('Private Message')
}
const Messages = ({navigation}) => {
  const [messages, setMessages] = useState(null)
  const [lastMessages, setlastMessage] = useState(null)
  const commentsRef = ref(database, 'admin_messages/');
  var count = 0
  useEffect(() => {
      // const temp = []
      // const temp2 = []
      // var holder = ''
      // onChildAdded(commentsRef, (data) => {
      //   temp.push(data.val())
      //   // temp.map((data2)=>{
      //   //   Object.entries(data2).forEach(([key,data3])=>{
      //   //     temp2.push(data3)
      //   //   })
      //   // })
      //   Object.entries(data.val()).forEach(([key,data2])=>{
      //        holder = {message: data2.message, uid: data2.uid, user_name: data2.user_name}
      //     })
      //     temp2.push(holder)
      // });
      // setMessages(temp)
      // setlastMessage(temp2)
      setInterval(function(){
        setMessages(message(commentsRef))
        setlastMessage(lastMessage(commentsRef))
      },3000)
      
  },[])
  return (
  <View style={styles.container}>
    <View style={styles.content}>
      {lastMessages == null ? 
      <Text>Please wait to render messages...</Text>
      :
      messages.map((data, key)=>{
        return(
          <TouchableOpacity onPress={()=>{privateMessage(lastMessages[key]['chat_id'], navigation)}}>
            <Card style={{flexDirection:'row', padding:10, width:'100%', marginBottom:5, alignItems:'center'}}>
              <Image source={require('./assets/logo.png')} style={{width:50, height:50, borderRadius:50, marginRight: 10}} />
              <View style={{alignItems:'center', width:'80%'}}>
                <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>{lastMessages[key]['user_name']}</Text>
                <Text></Text>
                <Text>{lastMessages[key]['message']}</Text>
              </View>
            </Card>
          </TouchableOpacity>)
      })}
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => { alert('hello')}}
      />
    </View>
    
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height:windowHeight,
    padding:10
  },
  background1:{
    height:70,
    top:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'white',
    fontSize: 30, 
  },
  content:{width:'100%', height:'90%'},
});

export default Messages;
