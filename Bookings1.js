import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ImageBackground,TouchableHighlight,TouchableOpacity, Button} from "react-native"
import History1 from './History'


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
      onPress={()=>{navigation.navigate('Bookings')}}
      style={styles.emergency}>
      Emergency</Text>
   
      <Text
      style={styles.scheduled}>
      Scheduled</Text>

       <Text style={styles.patient}>
      Transfer</Text>

  </View>

  <View style={styles.lines1}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.lines2}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.lines3}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.lines4}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.lines5}>
    <Image source={require('./assets/HomeIndicator.png')} />
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
    top:10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines3:{
    top:80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines4:{
    top:230,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines5:{
    top:260,
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
  emergency:{
    color:'#0b3954',
    fontSize:20,
    left:-130,
    flexDirection: 'row',
  },
  scheduled:{
    fontWeight:"bold",
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
});

export default Bookings;
