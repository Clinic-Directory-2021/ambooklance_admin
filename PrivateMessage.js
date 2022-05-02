import { useState, useEffect, useRef } from "react";
import {StyleSheet, View, Dimensions, Modal, Text, Image, TouchableOpacity, ScrollView, Dimentions, TextInput } from "react-native"
import { getUID } from "./LoginModels";
import { database } from "./firebase/firebase-config";
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, push, set } from "firebase/database";
import {Card} from 'react-native-shadow-cards';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function message(commentsRef){
    const temp = []
    const temp2 = []
    onChildAdded(commentsRef, (data) => {
      temp.push(data.val())
      console.log(data.val())
    //   temp.map((data2)=>{
    //     Object.entries(data2).forEach(([key,data3])=>{
    //       temp2.push({message: data3['message'], uid: data3['uid'], user_name:data3['user_name']})
    //     })
    //   })
    });
    return temp
  }
  
const PrivateMessage = () =>{
    const scrollViewRef = useRef();
    const commentsRef = ref(database, 'admin_messages/' + getUID());
    const [messages, setMessages] = useState(null)
    const [content, setContent] = useState('')

    const sendMessage = () =>{
        const postListRef = ref(database, 'admin_messages/' + getUID());
        const newPostRef = push(postListRef);
        set(newPostRef, {
            message: content,
            chat_id:getUID(),
            uid:'admin',
            user_name: 'admin'
        });
        setContent('')
      }

    useEffect(() => {
      setInterval(function(){
        setMessages(message(commentsRef))
      },5000)
    }, [])
    console.log(messages)
    console.log(getUID())
    return(
        
        
        <View style={{padding:5, height:windowHeight}}>
            <ScrollView  
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <View style={{height:'80%'}}>
            {messages == null ? 
            <Text>Rendering Messages...</Text>
            :
            messages.map((data)=>{
                if(data['uid'] ==  getUID()){
                    return( 
                        <View style={{ marginBottom:20}}> 
                            <Text>{data['user_name']}</Text>
                            <Card style={{backgroundColor:'gainsboro', width:'50%', padding:5, marginRight:'auto'}}>
                                <Text style={{alignSelf:'center'}}>{data['message']}</Text>
                            </Card>
                            <Text style={{alignSelf:'flex-start', fontStyle:'italic', fontSize:12}}>Date and Time</Text>
                        </View>)
                }
                else{
                    return(
                        <View style={{ marginBottom:20}}> 
                            <Text style={{alignSelf:'flex-end'}}>You</Text>
                            <Card style={{backgroundColor:'aqua', width:'50%', padding:5, marginLeft:'auto'}}>
                                <Text style={{alignSelf:'center'}}>{data['message']}</Text>
                            </Card>
                            <Text style={{alignSelf:'flex-end', fontStyle:'italic',fontSize:12}}>Date and Time</Text>
                        </View>
                        )
                }
                
                
            }) 
            } 
            </View>
            </ScrollView>
            <View style={{height:'20%', flexDirection:'row', width:'100%'}}>
                <TextInput  placeholder="Enter a message" style={{margin:10, borderColor:'black', borderWidth:1, borderRadius:5, height:50, padding:5, width:'80%'}}
                value={content}
                onChangeText={text=>setContent(text)}/>
                <TouchableOpacity style={{width:'10%', margin:15}} onPress={sendMessage}>
                    <Image source={require('./assets/send-message.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PrivateMessage