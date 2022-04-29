import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ImageBackground,} from "react-native"

const Stack = createNativeStackNavigator();

const History1 = () => {
  return (
<View style={styles.container}>
  
  <ImageBackground source={require("./assets/RedRectangle.png")} 
                    style={styles.background1}>
  <Text style={styles.text}>
      History of Bookings</Text>
  </ImageBackground>

  <View style={styles.lines}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

  <View style={styles.row}>

    <Text style={styles.text1}>
      Scheduled</Text>
  
  <View style={styles.lines1}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>
  

  <View style={styles.lines2}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

    <Text style={styles.text2}>
      Patient Transfer to Another Hospital</Text>

  <View style={styles.lines3}>
    <Image source={require('./assets/HomeIndicator.png')} />
  </View>

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
  row:{
    top:80,
    left: 0,
  },
  text1:{
    top:-50,
    left:10,
    fontSize:20,
    color:'#0b3954',
  },
  text2:{
    left:10,
    top:150,
    fontSize:20,
    color:'#0b3954',
  },
  lines:{
    top:30,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines1:{
    top:-48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines2:{
    top:185,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines3:{
    top:115,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Bar:{
    top:543,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default History1;
