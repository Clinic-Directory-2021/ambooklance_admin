import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import { firebase } from './firebase/firebase-config';
import { collection, query, where, onSnapshot, doc, setDoc, updateDoc } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';

const Tab = createMaterialTopTabNavigator();

function Scheduled() {
  const [acceptModalVisible, setAcceptModalVisible] =useState(false)
  const [denyModalVisible, setDenyModalVisible] =useState(false)
  const [emergencyBookings, setEmergencyBookings] = useState(null)

  const [current_id, setCurrent_id] = useState('') // Variable for current  book id
  const [uid, setUid] = useState('') //Variable for user id
  const [userCoordinate, setUserCoordinate] = useState('')// Variable for user coordinate(destination)

  const [data, setData] = useState(null) //Variable for official collection
  const [driverId, setDriverId] = useState(null) // Variable for driver's ID

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Balucuc', value: 'Balucuc, Apalit, Pampanga, Philippines'},
    {label: 'Calantipe', value: 'Calantipe, Apalit, Pampanga, Philippines'},
    {label: 'Cansinala', value: 'Cansinala, Apalit, Pampanga, Philippines'},
    {label: 'Capalangan', value: 'Capalangan, Apalit, Pampanga, Philippines'},
    {label: 'Colgante', value: 'Colgante, Apalit, Pampanga, Philippines'},
    {label: 'Paligui', value: 'Paligui, Apalit, Pampanga, Philippines'},
    {label: 'Sampaloc', value:'Sampaloc, Apalit, Pampanga, Philippines'},
    {label: 'San Juan', value: 'San Juan, Apalit, Pampanga, Philippines'},
    {label: 'San Vicente', value: 'San Vicente, Apalit, Pampanga, Philippines'},
    {label: 'Sucad', value: 'Sucad, Apalit, Pampanga, Philippines'},
    {label: 'Sulipan', value: 'Sulipan, Apalit, Pampanga, Philippines'},
    {label: 'Tabuyuc', value: 'Tabuyuc, Apalit, Pampanga, Philippines'},
  ]);

  const q = query(collection(firebase, "Bookings"), where("booking_type", "==", "Scheduled"));
  useEffect(async() => {
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const temp = [];
    querySnapshot.forEach((doc) => {
      if(doc.data().status == 'pending' || doc.data().status == "accepted"){
        temp.push(doc.data());
      }
    });
    setEmergencyBookings(temp)
    });
  }, [])
  
  const getOfficials = (address) =>{
    const official = query(collection(firebase, "Users"), where("user_type", "==", "official"), where("address", "==", address));
    const unsubscribe = onSnapshot(official, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        if(doc.data()['current'] == 'available')
          {
            temp.push({
              label: doc.data()['full_name'], 
              driver_id:doc.data()['uid'],
              address: doc.data()['address'],
              image_url: doc.data()['image_url'],
              latitude: doc.data()['latitude'],
              longitude: doc.data()['longitude'],
              current_latitude: doc.data()['latitude'],
              current_longitude: doc.data()['longitude'],
              destination_latitude:userCoordinate['latitude'],
              destination_longitude:userCoordinate['longitude'],
              user_id: uid,
              status:'on the way',
             })
          }
      });
      setData(temp)
    })
}

const startBooking = async(data) =>{
    const current_date = new Date()
    const booking_id = Date.parse(new Date()).toString()
    const Bookings = doc(firebase, "Bookings", current_id)
    const Resident = doc(firebase, "Users", data['user_id'])
    const Notifications = collection(Resident, "Notifications")
    const Driver = doc(firebase, "Users", data['driver_id'])
    const DriverNotif = collection(Driver, "Notifications")
  data['official_id'] = booking_id
  data['book_id'] = current_id
  await setDoc(doc(firebase, "Officials", booking_id), data)
  .then(async()=>{
    await updateDoc(Bookings, {
      status: 'accepted'
    });
    await updateDoc(Driver, {
      flag:true,
    });
    await updateDoc(Resident, {
      flag:true,
    });
    setDoc(doc(Notifications, booking_id), {
      message:'Your request has been approved. Check your map to track your driver.',
      date: (current_date.getMonth() + 1) + " / " + (current_date.getDay() + 1) + " / " + current_date.getFullYear(),
     });
     setDoc(doc(DriverNotif, booking_id), {
      message:'You have been assign to drive ambulance for Mr/Mrs ' + data['full_name'] +'. Please kindly check your map tab',
      date: (current_date.getMonth() + 1) + " / " + (current_date.getDay() + 1) + " / " + current_date.getFullYear(),
     });
    alert('Booking Accepted. Please notify your ambulance.')
    console.log(data)
    setAcceptModalVisible(!acceptModalVisible)
  });
}

  return (
    <ScrollView>
       {/* Modal */}
       <Modal
          animationType="slide"
          transparent={true}
          visible={acceptModalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text>Select Barangay</Text>
            <Text></Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                autoScroll={true}
                onSelectItem={(item) =>{
                  getOfficials(item['value'])
                }}
              />
              <Text></Text>
              <Text>Select Driver</Text>
              <Text></Text>
              {data == null ? 
              <Text>Choose barangay to render available driver/s</Text>
              :<RadioButtonRN
                data={data}
                selectedBtn={
                  (e) => setDriverId(e)
                }
                style={{width:'100%'}}
              />}
              <View style={styles.modalViewDelete}> 
                <TouchableOpacity style={{alignSelf:'center', marginLeft:'auto'}} onPress={()=>{ startBooking(driverId)}}>
                  <Text style={{alignSelf:'center', color:'#0B3954'}}>Comfirm Booking</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={{width:100, alignSelf:'center', marginRight:'auto'}} onPress={()=>{ 
                  setAcceptModalVisible(!acceptModalVisible)
                  }}>
                  <Text style={{alignSelf:'center', color:'#C81D35'}}>Cancel</Text>
                </TouchableOpacity> 
              </View>
            </View>
          </View>
        </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={denyModalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}> 
          <Text>Deny this Booking?</Text>
          <View style={styles.modalViewDelete}>  
            <TouchableOpacity style={{width:100, alignSelf:'center'}} onPress={()=>{}}>
              <Text style={{alignSelf:'center', color:'#0B3954'}}>Yes</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={{width:100, alignSelf:'center'}} onPress={()=>{setDenyModalVisible(!denyModalVisible)}}>
              <Text style={{alignSelf:'center', color:'#C81D35'}}>No</Text>
            </TouchableOpacity> 
          </View>
        </View>
        </View>
      </Modal>

    <View style={styles.container}>
      {emergencyBookings == null || emergencyBookings.length < 1 ?
       <Card style={{padding: 10, margin: 10}}>
        <Text>No data</Text>
       </Card>
     :
     emergencyBookings.map((data, key)=>{
       if(data['status'] == 'pending')
       {
        return(
          <Card style={{padding: 10, margin: 10, flexDirection:'row'}}>
            <View style={{width:'80%'}}>
             <Text>Name: {data['user_full_name']}</Text>
             <Text>Date: {data['schedule_date']}</Text>
             <Text>Time: {data['schedule_time']}</Text>
             {data['status'] == 'pending'? <Text style={{color:'#ff9966'}}>Status: {data['status']}</Text> :<Text style={{color:'#99cc33'}}>Status: {data['status']}</Text>}
             <Text>Address: {data['address']}</Text>
            </View>
            <View style={{width:'20%'}}>
                 <TouchableOpacity style={{marginTop:'auto', marginStart:'auto', marginEnd:'auto', padding:5}} 
                 onPress={()=>{
                   setAcceptModalVisible(!acceptModalVisible)
                   setCurrent_id(data['book_id'])
                   setUid(data['uid'])
                   setUserCoordinate({latitude: data['user_latitude'],longitude: data['user_longitude']})
                 }}
                 >
                   <Text style={{color:'#339900'}}>Accept</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginBottom:'auto', marginStart:'auto', marginEnd:'auto',  padding:5}} 
                 onPress={()=>{setDenyModalVisible(!denyModalVisible)}}
                 >
                   <Text style={{color:'#C81D35'}}>Deny</Text>
                 </TouchableOpacity>
           </View>
         </Card>)
       }
       return(
       <Card style={{padding: 10, margin: 10, flexDirection:'row'}}>
         <View style={{width:'80%'}}>
          <Text>Name: {data['user_full_name']}</Text>
          <Text>Date: {data['schedule_date']}</Text>
          <Text>Time: {data['schedule_time']}</Text>
          {data['status'] == 'pending'? <Text style={{color:'#ff9966'}}>Status: {data['status']}</Text> :<Text style={{color:'#99cc33'}}>Status: {data['status']}</Text>}
          <Text>Address: {data['address']}</Text>
         </View>
         <View style={{width:'20%'}}>
              <TouchableOpacity style={{marginBottom:'auto', marginStart:'auto', marginEnd:'auto',  padding:5}} 
              // onPress={()=>{setDenyModalVisible(!denyModalVisible)}}
              >
                <Text style={{color:'#C81D35'}}>Cancel</Text>
              </TouchableOpacity>
        </View>
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
    elevation: 5,
  },
  modalViewDelete: {
    width:'70%',
    margin: 20,
    // backgroundColor: "white",
    // borderRadius: 20,
    // padding: 10,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    flexDirection:'row'
  },
}
)

export default Scheduled;