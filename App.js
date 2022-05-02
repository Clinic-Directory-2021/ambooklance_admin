import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity,Image,ImageBackground, TouchableHighlight} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bookings from './Emergency'
import Residents from './Resident'
import Officials from './Official'
import History1 from './History'
import Bookings1 from './Scheduled'
import Profile1 from './Profile'
import Set from './Settings'
import Mess from './Messages'
import Home1 from './Home'
import Per from './Person'
import HomePage from './HomePage';
import Login from './Login';
import TopNavTabs from './TopNavTabs';
import PrivateMessage from './PrivateMessage';
import EditOfficial from './EditOfficial';
import AddOfficial1 from './AddOfficial1';
import AddOfficial2 from './AddOfficial2';
import AddOfficial3 from './AddOfficial3';
import EditResident from './EditResident';
import AddResident1 from './AddResident1';
import AddResident2 from './AddResident2';
import AddResident3 from './AddResident3';



const Stack = createNativeStackNavigator();

const App = () => {
  return(
    
    <NavigationContainer>
    <Stack.Navigator  
    screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen name = 'Login'component={Login}/>
      <Stack.Screen name="Admin" 
      component={HomePage}
      options={({navigation}) => ({
      
      headerRight: () => (
      <Image style={{ width: 30, height: 30, top:3, right:4}} source={require("./assets/ProfileImage.png")} />
    ),  
      headerLeft: () => (
      <View style={styles.row}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Settings')}>
      <Image style={{ width: 30, height: 30 }} source={require("./assets/Settings.png")} />
      </TouchableOpacity>

       <TouchableOpacity 
      onPress={() => navigation.navigate('Messages')}>
      <Image style={{ width: 25, height: 25, top:3, left:10 }} source={require("./assets/Vector.png")} />
      </TouchableOpacity>
      </View>  
  )})}
  />

      
      <Stack.Screen name = 'Residents'component={Residents}/>
      <Stack.Screen name = 'Private Message'component={PrivateMessage}/>
      <Stack.Screen name = 'Officials'component={Officials}/>
      <Stack.Screen name = 'History'component={History1}/>
      <Stack.Screen name = 'Profile'component={Profile1}/>
      <Stack.Screen name = 'Settings'component={Set}/>
      <Stack.Screen name = 'Messages'component={Mess}/>
      <Stack.Screen name = 'Home'component={Home1}/>
      <Stack.Screen name = 'Person'component={Per}/>
      <Stack.Screen name = 'Edit Official'component={EditOfficial}/>
      <Stack.Screen name = 'Add Official 1/3'component={AddOfficial1}/>
      <Stack.Screen name = 'Add Official 2/3'component={AddOfficial2}/>
      <Stack.Screen name = 'Add Official 3/3'component={AddOfficial3}/>
      <Stack.Screen name = 'Edit Resident'component={EditResident}/>
      <Stack.Screen name = 'Add Resident 1/3'component={AddResident1}/>
      <Stack.Screen name = 'Add Resident 2/3'component={AddResident2}/>
      <Stack.Screen name = 'Add Resident 3/3'component={AddResident3}/>


      <Stack.Screen name = 'Bookings'component={TopNavTabs}/>
    
    </Stack.Navigator>
    </NavigationContainer>
  );
};

function Admin ({navigation}){
  return(
    <View style={styles.container}>
    <View style={styles.row}>
    </View>
    <View style={styles.profile}>
    </View>
      <Text style={styles.hello}>
      Hello!</Text>
    <View style={styles.row1}>
      <TouchableOpacity 
        style={styles.bookings} 
        onPress={() => navigation.navigate('Bookings')}>
        <Image source={require("./assets/Bookings.png")}/>
        <View style={styles.bookings1}>
        <Image source={require("./assets/Bookings1.png")}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.residential} 
        onPress={() => navigation.navigate('Residents')}>
        <Image source={require("./assets/Residential.png")}/>
      </TouchableOpacity>
    </View>
    <TouchableOpacity 
        style={styles.officials} 
        onPress={() => navigation.navigate('Officials')}>
        <Image source={require("./assets/Officials.png")}/>
      </TouchableOpacity>
    <TouchableOpacity 
        style={styles.history} 
        onPress={() => navigation.navigate('History')}>
        <Image source={require("./assets/History.png")}/>
    </TouchableOpacity>
      
    {/* BOTTOMNAV */}
    </View>

  );
}

      const styles = StyleSheet.create({
        container: {
          top: 308
        },
        row:{
          flexDirection: 'row',
          left:5,
          top:5,
        },
        button: {
          padding: 10,
          marginBottom: 100,
        },
        profile: {
          top:-150,
          left:328,
        },
        hello:{
          fontSize: 30,
          left:45,
          top:-220,
        },
        row1:{
          left:13,
          top:-220,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        residential:{
          right:20,
          top:-40,
        },
        officials:{
          top:-337,
          alignItems: 'center',
          justifyContent: 'center',
        },
        history:{
          top:-328,
          alignItems: 'center',
          justifyContent: 'center',
        },
        background:{
          height:100,
          top:-180,
          alignItems: 'center',
          justifyContent: 'center',
        },
        home:{
          left:-30,
          top:-10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        person:{
          left:30,
          top:-10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        row2:{
          top:10,
          flexDirection: 'row',
        },
        bookings1:{
          top:-118,
          left:-18,
        },
        bookings:{
          left:20,
          top:20,
        },

      });

export default App;
export {Admin};

/**Mike Villarta */