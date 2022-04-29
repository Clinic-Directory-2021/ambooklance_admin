import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ImageBackground,} from "react-native"

const Stack = createNativeStackNavigator();

const Officials = () => {
  return (
<View style={styles.container}>
  
  <ImageBackground source={require("./assets/RedRectangle.png")} 
                    style={styles.background1}>
  <Text style={styles.text}>
      Officials Details</Text>
  </ImageBackground>

  <View style={styles.column}>

    <Text style={styles.text1}>
      Shaira Joy Timoteo</Text>
      
  
    <Text style={styles.text2}>
      123 Sulipan Apalit Pampanga</Text>

    <Text style={styles.text3}>
      09534516788</Text>

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
  column:{
    top:30,
    flexDirection: 'column',
    left: 15,
  },
  text1:{
    fontSize:20,
    color:'#0b3954',
  },
  text2:{
    fontSize:15,
    color:'#0b3954',
  },
  text3:{
    fontSize:15,
    color:'#0b3954',
  },
  Bar:{
    top:548,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Officials;
