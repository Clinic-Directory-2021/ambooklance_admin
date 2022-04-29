import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View,Image,ImageBackground,TouchableHighlight,TouchableOpacity, Button} from "react-native"


const Stack = createNativeStackNavigator();

const Messages = () => {
  return (

  <View style={styles.container}>
  
  <ImageBackground source={require("./assets/RedRectangle.png")} 
                    style={styles.background1}>
  <Text style={styles.text}>
      Messages</Text>
  </ImageBackground>

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
});

export default Messages;
