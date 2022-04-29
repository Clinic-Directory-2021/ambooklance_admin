import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ImageBackground,TouchableHighlight,TouchableOpacity, Button} from "react-native"


const Stack = createNativeStackNavigator();

const Bookings = ({navigation}) => {
  return (

  <View style={styles.container}>
  
  <ImageBackground source={require("./assets/RedRectangle.png")} 
                    style={styles.background1}>
  <Text style={styles.text}>
      List of Bookings</Text>
  </ImageBackground>

  <View style={styles.lines}>

    <Image source={require('./assets/HomeIndicator.png')} />

  </View>

  <View style={styles.row3}>

      <Text 
      style={styles.emergency}>
      Emergency</Text>
   
      <Text
      onPress={()=>{navigation.navigate('Bookings1')}}
      style={styles.scheduled}>
      Scheduled</Text>

       <Text style={styles.patient}>
      Transfer</Text>

  </View>

  <View style={styles.lines1}>

    <Image source={require('./assets/HomeIndicator.png')} />

  </View>

  <View style={styles.row4}>

    <Text style={styles.name}>
      Name</Text>
      
    <Text style={styles.contact}>
      Contact</Text>

    <Text style={styles.dateandtime}>
      Date & Time</Text>

  </View>

  <View style={styles.lines2}>

    <Image source={require('./assets/HomeIndicator.png')} />

  </View>

  <View style={styles.lines3}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.row5}>

  <Text style={styles.Juan}>
  Juan Dela {"\n"} Cruz</Text>
  
  <Text style={styles.number}>
  0999999</Text>

  <Text style={styles.date}>
  8:00 {"\n"}
  01-11-22</Text>
  </View>

  <View style={styles.lines4}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.lines5}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.Bar}>
    <Image source={require('./assets/Bar.png')} />
  </View>

  </View>

  );
}

const styles = StyleSheet.create({
  container: {

  },
  row:{
    flexDirection: 'row',
    left:10,
    top:0,
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
  lines:{
    top:30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines1:{
    top:-20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines2:{
    top:-70,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines3:{
    top:-10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines4:{
    top:-75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines5:{
    top:-10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Bar:{
    top:425,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row3:{
    top:30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row4:{
    top:-20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row5:{
    top:-20,
    left:150,
  },
  emergency:{
    color:'#0b3954',
    fontWeight:"bold",
    fontSize:20,
    left:-130,
    flexDirection: 'row',
  },
  scheduled:{
    color:'#0b3954',
    top:-26, 
    fontSize:20,
    left:0,
    flexDirection: 'row',
  },
  patient:{
    color:'#0b3954',
    top:-53,
    fontSize:20,
    left:130,
    flexDirection: 'row',
  },
  name:{
    fontSize:20,
    left:-130,
    flexDirection: 'row',
  },
  contact:{
    top:-26, 
    fontSize:20,
    left:0,
    flexDirection: 'row',
  },
  dateandtime:{
    top:-53,
    fontSize:20,
    left:130,
    flexDirection: 'row',
  },




  Juan:{
    top:-52,
    fontSize:20,
    left:-130,
    flexDirection: 'row',
  },
  number:{
    top:-90,
    fontSize:20,
    left:0,
    flexDirection: 'row',
  },
  date:{
    top:-130,
    fontSize:20,
    left:130,
    flexDirection: 'row',
  },
});

export default Bookings;
